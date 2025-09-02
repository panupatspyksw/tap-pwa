import type { SessionLog, SessionType } from '@/modules/session/types'

const KEY = 'tap.sessionLog.v1'

const safeParse = (raw: string | null): SessionLog[] => {
    try {
        return raw ? (JSON.parse(raw) as SessionLog[]) : []
    } catch {
        return []
    }
}
const makeId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

export const sessionLogRepository = {
    list(): SessionLog[] {
        if (typeof window === 'undefined') return []
        return safeParse(localStorage.getItem(KEY))
    },
    /** Replace the entire log set with a new list */
    replace(next: SessionLog[]) {
        if (typeof window === 'undefined') return
        localStorage.setItem(KEY, JSON.stringify(next))
    },
    append(rec: SessionLog) {
        if (typeof window === 'undefined') return
        const all = sessionLogRepository.list()
        all.push(rec)
        localStorage.setItem(KEY, JSON.stringify(all))
    },
    /** Remove a single record by id (no-op if not found) */
    remove(id: string) {
        if (typeof window === 'undefined') return
        const all = sessionLogRepository.list()
        const next = all.filter((r) => r.id !== id)
        localStorage.setItem(KEY, JSON.stringify(next))
    },
    clear() {
        if (typeof window === 'undefined') return
        localStorage.removeItem(KEY)
    },
    /** Convenience helper */
    create(type: SessionType, startAt: number, endAt: number): SessionLog {
        const duration = Math.max(0, Math.round((endAt - startAt) / 1000))
        return { id: makeId(), type, startAt, endAt, duration }
    },
}
