import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function wait(ms: number) {
    return new Promise((r) => setTimeout(r, ms))
}

export function formatDate(dateString: string): string {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

export const proxied = (u: string) => `/api/image?src=${encodeURIComponent(u)}`

// utils/formatDuration.ts
export function formatTotalMinutes(totalMin: number, opts?: { showDays?: boolean; short?: boolean }) {
    const showDays = opts?.showDays ?? true
    const short = opts?.short ?? true

    const DAY_MIN = 24 * 60
    let rem = Math.max(0, Math.round(totalMin))

    const d = showDays ? Math.floor(rem / DAY_MIN) : 0
    if (showDays) rem -= d * DAY_MIN

    const h = Math.floor(rem / 60)
    const m = rem % 60

    const parts: string[] = []
    if (d) parts.push(short ? `${d}d` : `${d} day${d === 1 ? '' : 's'}`)
    if (h) parts.push(short ? `${h}h` : `${h} hour${h === 1 ? '' : 's'}`)
    // always show minutes, even if 0, to avoid empty string
    parts.push(short ? `${m}m` : `${m} minute${m === 1 ? '' : 's'}`)

    return parts.join(' ')
}
