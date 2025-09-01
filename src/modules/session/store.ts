// src/modules/session/store.ts
import { create, type StoreApi } from 'zustand'
import type { SessionState, SessionType, CycleSession } from './types'
import { useSettings } from '@/modules/settings/store'
import { playBreakSound, playFocusSound } from '@/modules/session/sound'
import { sessionLogRepository } from '../repositories/session-log-repository'

type Store = {
    state: SessionState
    cycle: CycleSession
    start: () => void
    pause: () => void
    resume: () => void
    skip: () => void
    back: () => void
    reset: () => void
    applySettingsNow: () => void
}

// ---- durations from settings ----
const sec = {
    focus: () => useSettings.getState().settings.session.focusMin * 60,
    sessionBrk: () => useSettings.getState().settings.session.breakMin * 60,
    cycleBrk: () => useSettings.getState().settings.cycle.breakMin * 60,
}
const sessionLength = () => useSettings.getState().settings.cycle.sessionLength

const plannedFor = (phase: SessionType): number => {
    switch (phase) {
        case 'focus':
            return sec.focus()
        case 'session-break':
            return sec.sessionBrk()
        case 'cycle-break':
            return sec.cycleBrk()
    }
}

// ---- ticking timer (one interval only) ----
let timer: ReturnType<typeof setInterval> | null = null

type SetState = StoreApi<Store>['setState']
type GetState = StoreApi<Store>['getState']

const startTick = (set: SetState, get: GetState) => {
    stopTick()
    timer = setInterval(() => {
        if (get().state !== 'running') return
        const next = Math.max(0, get().cycle.remainingSec - 1)
        set((s) => ({ cycle: { ...s.cycle, remainingSec: next } }))
        if (next === 0) completePhase(set, get, /*fromSkip*/ false)
    }, 1000)
}
const stopTick = () => {
    if (timer) clearInterval(timer)
    timer = null
}

// ---- phase completion / transition ----
function completePhase(set: SetState, get: GetState, fromSkip: boolean): void {
    const { state, cycle } = get()
    const now = Date.now()

    if (!fromSkip) {
        const rec = sessionLogRepository.create(cycle.currentPhase, cycle.phaseStartedAt, now)
        sessionLogRepository.append(rec)
    }

    const len = sessionLength()
    let nextPhase: SessionType
    let nextIndex = cycle.currentIndex

    if (cycle.currentPhase === 'focus') {
        nextPhase = cycle.currentIndex >= len ? 'cycle-break' : 'session-break'
    } else if (cycle.currentPhase === 'session-break') {
        nextPhase = 'focus'
        nextIndex = Math.min(len, cycle.currentIndex + 1)
    } else {
        nextPhase = 'focus'
        nextIndex = 1
    }

    if (nextPhase === 'focus') playFocusSound?.()
    else playBreakSound?.()

    const planned = plannedFor(nextPhase)
    set({
        state, // keep running/paused
        cycle: {
            currentIndex: nextIndex,
            currentPhase: nextPhase,
            phaseStartedAt: now,
            phasePlannedSec: planned,
            remainingSec: planned,
        },
    })
}

// ---- public store ----
export const useSession = create<Store>((set, get) => {
    const initCycle = (): CycleSession => {
        const now = Date.now()
        const planned = plannedFor('focus')
        return {
            currentIndex: 1,
            currentPhase: 'focus',
            phaseStartedAt: now,
            phasePlannedSec: planned,
            remainingSec: planned,
        }
    }

    return {
        state: 'idle',
        cycle: initCycle(),

        start: () => {
            const now = Date.now()
            const planned = plannedFor('focus')
            set({
                state: 'running',
                cycle: {
                    currentIndex: 1,
                    currentPhase: 'focus',
                    phaseStartedAt: now,
                    phasePlannedSec: planned,
                    remainingSec: planned,
                },
            })
            startTick(set, get)
        },

        pause: () => {
            if (get().state !== 'running') return
            stopTick()
            set({ state: 'paused' })
        },

        resume: () => {
            if (get().state !== 'paused') return
            set({ state: 'running' })
            startTick(set, get)
        },

        skip: () => {
            completePhase(set, get, /*fromSkip*/ true)
        },

        back: () => {
            const keepEngine = get().state
            const s = get().cycle
            const len = sessionLength()
            const elapsed = s.phasePlannedSec - s.remainingSec
            const now = Date.now()

            const setPhase = (phase: SessionType, index: number) => {
                const planned = plannedFor(phase)
                set({
                    state: keepEngine,
                    cycle: {
                        currentIndex: index,
                        currentPhase: phase,
                        phaseStartedAt: now,
                        phasePlannedSec: planned,
                        remainingSec: planned,
                    },
                })
            }

            // restart current session if > 3s in
            if (elapsed > 3) {
                setPhase(s.currentPhase, s.currentIndex)
                return
            }

            // go idle if at very first focus early
            if (s.currentPhase === 'focus' && s.currentIndex === 1) {
                stopTick()
                const planned = plannedFor('focus')
                set({
                    state: 'idle',
                    cycle: {
                        currentIndex: 1,
                        currentPhase: 'focus',
                        phaseStartedAt: now,
                        phasePlannedSec: planned,
                        remainingSec: planned,
                    },
                })
                return
            }

            // otherwise go to previous session
            if (s.currentPhase === 'focus') {
                const prevIndex = s.currentIndex > 1 ? s.currentIndex - 1 : len
                setPhase('session-break', prevIndex)
            } else if (s.currentPhase === 'session-break') {
                setPhase('focus', Math.max(1, s.currentIndex))
            } else {
                setPhase('focus', len)
            }
        },

        reset: () => {
            stopTick()
            set({ state: 'idle', cycle: initCycle() })
        },

        applySettingsNow: () => {
            if (get().state === 'running') return
            set({ cycle: initCycle() })
        },
    }
})
