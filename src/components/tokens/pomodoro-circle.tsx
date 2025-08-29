import React from 'react'

type Status = 'not-started' | 'in-progress' | 'done'

interface PomodoroCircleProps {
    status?: Status
}

const STATUS_COLORS: Record<Status, string> = {
    'not-started': '#6B7280', // gray
    'in-progress': '#FBBF24', // yellow
    done: '#22C55E', // green
}

export const PomodoroCircle: React.FC<PomodoroCircleProps> = ({ status = 'not-started' }) => {
    return (
        <div
            style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: STATUS_COLORS[status],
            }}
        />
    )
}
