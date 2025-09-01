import { create } from 'zustand'
// import { withSafePersist } from '@/modules/shared/with-safe-persist'
import type { Settings } from './types'
import { persist, createJSONStorage } from 'zustand/middleware'

const DEFAULTS: Settings = {
    session: { focusMin: 1, breakMin: 5 },
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
    persist(
        (set, get) => ({
            settings: DEFAULTS,

            setSettings: (patch) => set({ settings: { ...get().settings, ...patch } }),
            setSession: (patch) =>
                set((s) => ({ settings: { ...s.settings, session: { ...s.settings.session, ...patch } } })),
            setCycle: (patch) =>
                set((s) => ({ settings: { ...s.settings, cycle: { ...s.settings.cycle, ...patch } } })),
            setNotification: (patch) =>
                set((s) => ({ settings: { ...s.settings, notification: { ...s.settings.notification, ...patch } } })),
            setTask: (task) => set((s) => ({ settings: { ...s.settings, task } })),
            reset: () => set({ settings: DEFAULTS }),
        }),
        {
            // ⬇️ bump this when you change defaults/shape so old localStorage doesn’t conflict
            name: 'tap.settings.v3',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ settings: state.settings }),
        }
    )
)
