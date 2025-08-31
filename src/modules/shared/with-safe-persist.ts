// modules/shared/createSafePersist.ts
//
// Tiny wrapper around Zustand's `persist` middleware so it won't crash during SSR.
// - On the server: `storage` is undefined (no localStorage/sessionStorage)
// - In the browser: it uses JSON storage backed by localStorage (default) or sessionStorage
//
// Usage:
//   import { create } from 'zustand'
//   import { withSafePersist } from '@/modules/shared/createSafePersist'
//
//   interface SettingsState { focusMin: number; setFocus: (n: number) => void }
//   export const useSettings = create<SettingsState>()(
//     withSafePersist(
//       (set) => ({ focusMin: 25, setFocus: (n) => set({ focusMin: n }) }),
//       { name: 'tap.settings' } // optional: { name: 'tap.settings', storage: 'session', version: 1 }
//     )
//   )

import { persist, createJSONStorage, type PersistOptions } from 'zustand/middleware'
import { type StateCreator } from 'zustand'

/**
 * Options for `withSafePersist`
 * - `name`     : storage key (required)
 * - `storage`  : 'local' | 'session' (default 'local')
 * - any other PersistOptions<T> (e.g., version, migrate, partialize, skipHydration)
 */
export type SafePersistOptions<T> = Omit<PersistOptions<T>, 'name' | 'storage'> & {
    name: string
    storage?: 'local' | 'session'
}

/**
 * Wrap a Zustand state creator with a persist layer that is safe for SSR.
 * It only attaches a real storage backend in the browser.
 */
export function withSafePersist<T>(fn: StateCreator<T>, options: SafePersistOptions<T>) {
    const { name, storage = 'local', ...rest } = options

    const storageFactory =
        typeof window !== 'undefined'
            ? () => (storage === 'local' ? localStorage : sessionStorage)
            : // On the server: return undefined so persist won't try to access Web Storage
              undefined

    // Note: casting to PersistOptions<T> is fine; we only override `name` and `storage`
    return persist<T>(fn, {
        name,
        storage: storageFactory !== undefined ? createJSONStorage(storageFactory) : undefined,
        ...rest,
    } as PersistOptions<T>)
}
