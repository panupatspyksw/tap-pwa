import { create } from 'zustand'
import { withSafePersist } from '@/modules/shared/with-safe-persist'
import type { Settings } from './types'

const DEFAULTS: Settings = {
    session: { focusMin: 25, breakMin: 5 },
    cycle: { sessionLength: 4, breakMin: 15 },
    task: '',
    notification: { enabled: true, volume: 0.8 }, // 0..1
}

interface SettingsStore {
    settings: Settings
    setSettings: (patch: Partial<Settings>) => void
    setSession: (patch: Partial<Settings['session']>) => void
    setCycle: (patch: Partial<Settings['cycle']>) => void
    setTask: (task: Settings['task']) => void
    setNotification: (patch: Partial<Settings['notification']>) => void
    reset: () => void
}

export const useSettings = create<SettingsStore>()(
    withSafePersist(
        (set, get) => ({
            settings: DEFAULTS,

            setSettings: (patch) => set({ settings: { ...get().settings, ...patch } }),

            setSession: (patch) => {
                const s = get().settings
                set({ settings: { ...s, session: { ...s.session, ...patch } } })
            },

            setCycle: (patch) => {
                const s = get().settings
                set({ settings: { ...s, cycle: { ...s.cycle, ...patch } } })
            },

            setTask: (task) => {
                const s = get().settings
                set({ settings: { ...s, task } })
            },

            setNotification: (patch) => {
                const s = get().settings
                set({ settings: { ...s, notification: { ...s.notification, ...patch } } })
            },

            reset: () => set({ settings: DEFAULTS }),
        }),
        { name: 'tap.settings' } // bump key if you changed structure
    )
)
