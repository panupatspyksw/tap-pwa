'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Text, Card } from '@mantine/core'
import { BarChart } from '@mantine/charts'
import TimeRangeTab from '@/components/tokens/time-range-tab'
import DashboardMenu from '@/components/tokens/dashboard-menu'
import IconButton from '@/components/tokens/icon-button'
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react'
import { getSummary, shiftAnchor } from '@/modules/analytics/service'
import type { RangeType, ChartSummary } from '@/modules/analytics/types'
import { isSameDay, isSameWeek, isSameMonth, isSameYear } from 'date-fns'
import { formatTotalMinutes } from '@/lib/utils'
import DashboardTooltipParameter from './dashboard-tooltip-parameter'

const EMPTY: ChartSummary = { title: '', totalSessions: 0, totalMin: 0, data: [] }

// weekStartsOn must match your analytics (we used Monday)
const isAtCurrent = (type: RangeType, anchor: Date) => {
    const now = new Date()
    switch (type) {
        case 'day':
            return isSameDay(anchor, now)
        case 'week':
            return isSameWeek(anchor, now, { weekStartsOn: 1 })
        case 'month':
            return isSameMonth(anchor, now)
        case 'year':
            return isSameYear(anchor, now)
    }
}

export default function Dashboard() {
    const [tab, setTab] = useState<RangeType>('day')
    const [anchor, setAnchor] = useState<Date | null>(null)
    useEffect(() => {
        setAnchor(new Date())
    }, [])

    const summary = useMemo(() => (anchor ? getSummary(tab, anchor) : EMPTY), [tab, anchor])
    const chartData = useMemo(
        () => summary.data.map((r) => ({ label: r.label, Focus: r.totalMin, Session: r.totalSessions })),
        [summary]
    )

    const disablePrev = !anchor // (always enabled once mounted; keep if you want bounds)
    const disableNext = !anchor || isAtCurrent(tab, anchor) // ⬅️ disable when on current period

    return (
        <div className='flex flex-col h-full'>
            <div className='flex justify-between gap-4'>
                <div className='flex justify-between gap-6 w-full'>
                    <TimeRangeTab tab={tab} setTab={(v) => setTab(v as RangeType)} />
                    <DashboardMenu />
                </div>
            </div>

            <div className='flex gap-4 py-5 items-center justify-between'>
                <Text c='white' size='lg' className='font-semibold!'>
                    {summary.title
                        ? `${summary.title} — ${formatTotalMinutes(summary.totalMin, {
                              showDays: true,
                              short: true,
                          })} (${summary.totalSessions} session${summary.totalSessions === 1 ? '' : 's'})`
                        : ' '}
                </Text>
                <div className='flex gap-2'>
                    <IconButton
                        size='md'
                        variant='white'
                        icon={IconChevronLeft}
                        label='previous'
                        onClick={() => anchor && setAnchor((a) => shiftAnchor(tab, a!, -1))}
                        disabled={disablePrev}
                    />
                    <IconButton
                        size='md'
                        variant='white'
                        icon={IconChevronRight}
                        label='next'
                        onClick={() => anchor && setAnchor((a) => shiftAnchor(tab, a!, +1))}
                        disabled={disableNext}
                    />
                </div>
            </div>

            <div className='mt-4 relative flex flex-col h-full'>
                <div className='h-full p-5'>
                    <BarChart
                        mt='lg'
                        h='100%'
                        data={chartData}
                        dataKey='label'
                        series={[
                            { name: 'Focus', color: 'teal.6' },
                            { name: 'Session', color: 'teal.9' },
                        ]}
                        tooltipProps={{
                            content: ({ label, payload }) => {
                                return (
                                    <Card withBorder bg='dark' shadow='lg' w={300}>
                                        <Text className='font-semibold!' size='lg'>
                                            {label}
                                        </Text>
                                        <DashboardTooltipParameter
                                            color='teal.6'
                                            name={payload[0]?.name ?? 'Focus'}
                                            value={formatTotalMinutes(payload[0]?.value) ?? formatTotalMinutes(0)}
                                        />
                                        <DashboardTooltipParameter
                                            color='teal.9'
                                            name={payload[1]?.name ?? 'Session'}
                                            value={payload[1]?.value ?? ''}
                                            endValue='session'
                                        />
                                    </Card>
                                )
                            },
                        }}
                        tickLine='xy'
                        yAxisLabel='Minutes'

                        // withYAxis={false}
                    />
                </div>
            </div>
        </div>
    )
}
