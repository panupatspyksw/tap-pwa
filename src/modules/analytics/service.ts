import type { ChartRow, ChartSummary, RangeType } from '@/modules/analytics/types'
import type { SessionLog } from '@/modules/session/types'
import { sessionLogRepository } from '@/modules/repositories/session-log-repository'
import {
    startOfDay,
    endOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear,
    addDays,
    addWeeks,
    addMonths,
    addYears,
    isWithinInterval,
    differenceInCalendarDays,
    isSameYear,
    isSameMonth,
    format,
    getHours,
    getDate,
    getMonth,
} from 'date-fns'

const pad2 = (n: number) => String(n).padStart(2, '0')
const focusOnly = (logs: SessionLog[]) => logs.filter((l) => l.type === 'focus')

/* ---------------- DAY ---------------- */
export function getDaySummary(anchor = new Date(), logs?: SessionLog[]): ChartSummary {
    const start = startOfDay(anchor)
    const end = endOfDay(anchor)

    const secs = Array.from({ length: 24 }, () => 0)
    const sess = Array.from({ length: 24 }, () => 0)

    for (const rec of focusOnly(logs ?? sessionLogRepository.list())) {
        const t = new Date(rec.endAt)
        if (!isWithinInterval(t, { start, end })) continue
        const h = getHours(t)
        secs[h] += rec.duration
        sess[h] += 1
    }

    const data: ChartRow[] = secs.map((s, h) => ({
        label: `${pad2(h)}-${pad2((h + 1) % 24)}`,
        totalSessions: sess[h],
        totalMin: Math.round(s / 60),
    }))

    return {
        title: format(anchor, 'd MMMM yyyy'),
        totalSessions: sess.reduce((a, b) => a + b, 0),
        totalMin: Math.round(secs.reduce((a, b) => a + b, 0) / 60),
        data,
    }
}

/* ---------------- WEEK (Mon–Sun) ---------------- */
export function getWeekSummary(anchor = new Date(), logs?: SessionLog[]): ChartSummary {
    const start = startOfWeek(anchor, { weekStartsOn: 1 })
    const end = endOfWeek(anchor, { weekStartsOn: 1 })

    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i))
    const secs = Array.from({ length: 7 }, () => 0)
    const sess = Array.from({ length: 7 }, () => 0)

    for (const rec of focusOnly(logs ?? sessionLogRepository.list())) {
        const t = new Date(rec.endAt)
        if (!isWithinInterval(t, { start, end })) continue
        const idx = differenceInCalendarDays(startOfDay(t), start)
        if (idx >= 0 && idx < 7) {
            secs[idx] += rec.duration
            sess[idx] += 1
        }
    }

    const data: ChartRow[] = days.map((d, i) => ({
        label: format(d, 'd MMMM yyyy'), // "24 February 2025"
        totalSessions: sess[i],
        totalMin: Math.round(secs[i] / 60),
    }))

    // Title examples:
    // same month+year: "3–9 Mar 2025"
    // same year diff month: "24 Feb – 2 Mar 2025"
    // diff year: "30 Dec 2024 – 5 Jan 2025"
    const title = isSameYear(start, end)
        ? isSameMonth(start, end)
            ? `${format(start, 'd')}–${format(end, 'd MMM yyyy')}`
            : `${format(start, 'd MMM')} – ${format(end, 'd MMM yyyy')}`
        : `${format(start, 'd MMM yyyy')} – ${format(end, 'd MMM yyyy')}`

    return {
        title,
        totalSessions: sess.reduce((a, b) => a + b, 0),
        totalMin: Math.round(secs.reduce((a, b) => a + b, 0) / 60),
        data,
    }
}

/* ---------------- MONTH ---------------- */
export function getMonthSummary(anchor = new Date(), logs?: SessionLog[]): ChartSummary {
    const start = startOfMonth(anchor)
    const end = endOfMonth(anchor)

    const daysInMonth = getDate(end)
    const secs = Array.from({ length: daysInMonth }, () => 0)
    const sess = Array.from({ length: daysInMonth }, () => 0)

    for (const rec of focusOnly(logs ?? sessionLogRepository.list())) {
        const t = new Date(rec.endAt)
        if (!isWithinInterval(t, { start, end })) continue
        const idx = getDate(t) - 1
        secs[idx] += rec.duration
        sess[idx] += 1
    }

    const data: ChartRow[] = Array.from({ length: daysInMonth }, (_, i) => ({
        label: format(new Date(start.getFullYear(), start.getMonth(), i + 1), 'd MMM'),
        totalSessions: sess[i],
        totalMin: Math.round(secs[i] / 60),
    }))

    return {
        title: format(anchor, 'MMMM yyyy'),
        totalSessions: sess.reduce((a, b) => a + b, 0),
        totalMin: Math.round(secs.reduce((a, b) => a + b, 0) / 60),
        data,
    }
}

/* ---------------- YEAR ---------------- */
export function getYearSummary(anchor = new Date(), logs?: SessionLog[]): ChartSummary {
    const start = startOfYear(anchor)
    const end = endOfYear(anchor)

    const secs = Array.from({ length: 12 }, () => 0)
    const sess = Array.from({ length: 12 }, () => 0)

    for (const rec of focusOnly(logs ?? sessionLogRepository.list())) {
        const t = new Date(rec.endAt)
        if (!isWithinInterval(t, { start, end })) continue
        const idx = getMonth(t) // 0..11
        secs[idx] += rec.duration
        sess[idx] += 1
    }

    const data: ChartRow[] = Array.from({ length: 12 }, (_, m) => ({
        label: format(new Date(start.getFullYear(), m, 1), 'MMMM yyyy'),
        totalSessions: sess[m],
        totalMin: Math.round(secs[m] / 60),
    }))

    return {
        title: format(anchor, 'yyyy'),
        totalSessions: sess.reduce((a, b) => a + b, 0),
        totalMin: Math.round(secs.reduce((a, b) => a + b, 0) / 60),
        data,
    }
}

/* ---------------- dispatcher + navigation ---------------- */
export function getSummary(type: RangeType, anchor = new Date(), logs?: SessionLog[]): ChartSummary {
    switch (type) {
        case 'day':
            return getDaySummary(anchor, logs)
        case 'week':
            return getWeekSummary(anchor, logs)
        case 'month':
            return getMonthSummary(anchor, logs)
        case 'year':
            return getYearSummary(anchor, logs)
    }
}

export function shiftAnchor(type: RangeType, anchor: Date, dir: 1 | -1): Date {
    switch (type) {
        case 'day':
            return addDays(anchor, dir)
        case 'week':
            return addWeeks(anchor, dir)
        case 'month':
            return addMonths(anchor, dir)
        case 'year':
            return addYears(anchor, dir)
    }
}
