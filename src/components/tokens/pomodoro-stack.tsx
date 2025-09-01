'use client'

import { Card } from '@mantine/core'
import { useShallow } from 'zustand/react/shallow'
import { useSession } from '@/modules/session/store'
import { useSettings } from '@/modules/settings/store'
import { PomodoroCircle } from './pomodoro-circle' // expects: status: 'done'|'in-progress'|'not-started'

type Status = 'done' | 'in-progress' | 'not-started'

export default function PomodoroStack() {
    const { index, phase, state } = useSession(
        useShallow((s) => ({
            index: s.cycle.currentIndex,
            phase: s.cycle.currentPhase, // 'focus' | 'session-break' | 'cycle-break'
            state: s.state, // 'idle' | 'running' | 'paused'
        }))
    )
    const sessionLength = useSettings((s) => s.settings.cycle.sessionLength)

    // When idle: everything gray (not-started)
    const finished =
        state === 'idle'
            ? 0
            : phase === 'focus'
            ? Math.max(0, index - 1)
            : phase === 'session-break'
            ? index
            : /* cycle-break */ sessionLength

    const statuses: Status[] = Array.from({ length: sessionLength }, (_, i) => {
        const n = i + 1
        if (state === 'idle') return 'not-started' // all gray when idle
        if (n <= finished) return 'done'
        const isCurrent = (phase === 'focus' && n === index) || (phase === 'session-break' && n === index)
        return isCurrent ? 'in-progress' : 'not-started'
    })

    // 2 rows layout
    const cols = sessionLength < 8 ? sessionLength : Math.ceil(sessionLength / 2)

    return (
        <Card bg='gray.9' maw={548} p='xl' className='w-fit!' radius='lg'>
            <div
                className='grid gap-4 justify-center'
                style={{
                    gridTemplateColumns: `repeat(${cols}, 24px)`,
                    gridAutoRows: '24px',
                }}
            >
                {statuses.map((status, i) => (
                    <PomodoroCircle status={status} key={i} />
                ))}
            </div>
        </Card>
    )
}
