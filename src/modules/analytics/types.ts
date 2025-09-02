export type RangeType = 'day' | 'week' | 'month' | 'year'

export type ChartRow = {
    label: string
    totalSessions: number
    totalMin: number
}

export type ChartSummary = {
    title: string
    totalSessions: number
    totalMin: number
    data: ChartRow[]
}
