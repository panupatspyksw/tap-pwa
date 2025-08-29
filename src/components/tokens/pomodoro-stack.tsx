import React from 'react'
import { Card } from '@mantine/core'
import { PomodoroCircle } from './pomodoro-circle'

const PomodoroStack = () => {
    const items = [
        'done',
        'done',
        'done',
        'done',
        'done',
        'done',
        'in-progress',
        'not-started',
        'not-started',
        'not-started',
        'not-started',
        'not-started',
    ] as const
    const cols = items.length < 8 ? items.length : Math.ceil(items.length / 2) // 2 rows → 7 cols

    return (
        <Card bg='gray.9' maw={548} p='xl' className='w-fit!' radius='lg'>
            <div
                className={`grid gap-4 justify-center`}
                style={{
                    gridTemplateColumns: `repeat(${cols}, 24px)`,
                    gridAutoRows: '24px',
                }}
            >
                {items.map((status, i) => (
                    <PomodoroCircle status={status} key={i} />
                ))}
            </div>
        </Card>
    )
}
export default PomodoroStack
