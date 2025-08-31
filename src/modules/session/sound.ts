// src/modules/session/sound.ts
import { useSettings } from '@/modules/settings/store'

/**
 * Call this once on a user gesture (e.g., Start/Resume click)
 * to improve autoplay reliability across browsers.
 */
let primed = false
export function primeSounds() {
    if (typeof window === 'undefined' || primed) return
    try {
        // try a muted play/pause to "unlock" audio
        const a = new Audio('/sounds/focus.mp3')
        a.volume = 0
        a.play()
            ?.then(() => {
                a.pause()
                a.currentTime = 0
                primed = true
            })
            .catch(() => {
                /* ignore */
            })
    } catch {
        /* ignore on SSR */
    }
}

export function playBreakSound() {
    play('/sounds/break.wav')
}

export function playFocusSound() {
    play('/sounds/focus.wav')
}

function play(src: string) {
    if (typeof window === 'undefined') return
    const { enabled, volume } = useSettings.getState().settings.notification
    if (!enabled) return
    try {
        const audio = new Audio(src)
        audio.volume = clamp01(volume) // NotiConfig.volume (0..1)
        void audio.play()
    } catch {
        // Autoplay may be blocked until a user gesture; after calling primeSounds()
        // on Start/Resume, subsequent plays usually succeed.
    }
}

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))
