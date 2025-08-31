// src/modules/session/types.ts

/** High-level timer state (engine status) */
export type SessionState = 'idle' | 'running' | 'paused'

/** Current phase within the cycle */
export type SessionType = 'focus' | 'session-break' | 'cycle-break'

/**
 * Persistent history record for a finished segment
 * (append-only; good for reports/analytics)
 */
export type SessionLog = {
    id: string // unique id for the segment
    type: SessionType // 'focus' | 'session-break' | 'cycle-break'
    startAt: number // epoch ms
    endAt: number // epoch ms
    duration: number // seconds (endAt - startAt) / 1000
}

/**
 * Ephemeral runtime state driving the Cycle Timing UI
 * (NOT persisted; changes every second)
 */
export type CycleSession = {
    currentIndex: number // 1..sessionLength (which focus in the current cycle)
    currentPhase: SessionType // focus | session-break | cycle-break
    phaseStartedAt: number // epoch ms when the current phase began
    phasePlannedSec: number // planned length of this phase in seconds (snapshot from settings at start)
    remainingSec: number // ticks down each second
}
