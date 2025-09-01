// src/modules/settings/types.ts
export type SessionConfig = {
    focusMin: number
    breakMin: number
    autoStartFocus: boolean
    autoStartBreak: boolean
}

export type CycleConfig = {
    sessionLength: number
    breakMin: number
}

export type TaskConfig = string

export type NotiConfig = {
    enabled: boolean
    volume: number
}

export type Settings = {
    session: SessionConfig
    cycle: CycleConfig
    task: TaskConfig
    notification: NotiConfig
}
