// src/modules/session/store.ts
import { create } from 'zustand'
import type { SessionState, SessionType, CycleSession } from './types'
import { useSettings } from '@/modules/settings/store'
import { playBreakSound, playFocusSound } from '@/modules/session/sound' // optional tiny helpers

type Store = {
    state: SessionState
    cycle: CycleSession

    // controls
    start: () => void
    pause: () => void
    resume: () => void
    skip: () => void
    reset: () => void

    /** Re-apply settings when not running (e.g., after saving settings) */
    applySettingsNow: () => void
}

// ---- durations from settings (single source of truth) ----
const sec = {
    focus: () => useSettings.getState().settings.session.focusMin * 60,
    sessionBrk: () => useSettings.getState().settings.session.breakMin * 60,
    cycleBrk: () => useSettings.getState().settings.cycle.breakMin * 60,
}
const sessionLength = () => useSettings.getState().settings.cycle.sessionLength

const plannedFor = (phase: SessionType): number =>
    phase === 'focus' ? sec.focus() : phase === 'session-break' ? sec.sessionBrk() : sec.cycleBrk()

// ---- ticking timer (one interval only) ----
let timer: ReturnType<typeof setInterval> | null = null
const startTick = (set: any, get: any) => {
    stopTick()
    timer = setInterval(() => {
        if (get().state !== 'running') return
        const next = Math.max(0, get().cycle.remainingSec - 1)
        set((s: Store) => ({ cycle: { ...s.cycle, remainingSec: next } }))
        if (next === 0) completePhase(set, get, /*fromSkip*/ false)
    }, 1000)
}
const stopTick = () => {
    if (timer) clearInterval(timer)
    timer = null
}

// ---- phase completion / transition ----
function completePhase(set: any, get: any, fromSkip: boolean) {
    const { state, cycle } = get() as Store
    const now = Date.now()

    // (Optional) if you log history, build and append a SessionLog here
    // const rec: SessionLog = { id: nanoid(), type: cycle.currentPhase, startAt: cycle.phaseStartedAt, endAt: now, duration: Math.max(0, Math.round((now - cycle.phaseStartedAt)/1000)) }
    // sessionLogRepo.append(rec)

    // decide next phase
    const len = sessionLength()
    let nextPhase: SessionType
    let nextIndex = cycle.currentIndex

    if (cycle.currentPhase === 'focus') {
        nextPhase = cycle.currentIndex >= len ? 'cycle-break' : 'session-break'
    } else if (cycle.currentPhase === 'session-break') {
        nextPhase = 'focus'
        nextIndex = Math.min(len, cycle.currentIndex + 1)
    } else {
        // cycle-break
        nextPhase = 'focus'
        nextIndex = 1
    }

    // sounds (optional)
    if (nextPhase === 'focus') playFocusSound?.()
    else playBreakSound?.()

    const planned = plannedFor(nextPhase)
    const newCycle: CycleSession = {
        currentIndex: nextIndex,
        currentPhase: nextPhase,
        phaseStartedAt: now,
        phasePlannedSec: planned,
        remainingSec: planned,
    }

    // keep engine state as-is (paused stays paused, running keeps running)
    set({ cycle: newCycle, state })
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
            // advance immediately; keep current engine state (paused stays paused)
            completePhase(set, get, /*fromSkip*/ true)
        },

        reset: () => {
            stopTick()
            set({ state: 'idle', cycle: initCycle() })
        },

        applySettingsNow: () => {
            // when not running, rebuild a fresh focus phase with new settings
            if (get().state === 'running') return
            set({ cycle: initCycle() })
        },
    }
})
