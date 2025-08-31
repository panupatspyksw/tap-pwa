// src/modules/settings/selectors.ts
import { useSettings } from './store'

export const useSessionConfig = () => useSettings((s) => s.settings.session)
export const useCycleConfig = () => useSettings((s) => s.settings.cycle)
export const useTaskConfig = () => useSettings((s) => s.settings.task)
export const useNotiConfig = () => useSettings((s) => s.settings.notification)
