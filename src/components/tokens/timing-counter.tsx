import React from 'react'
import { Title } from '@mantine/core'

const TimingCounter = () => {
    return (
        <Title
            c='white'
            style={{
                textShadow: `
                                0 20px 24px rgba(10, 13, 18, 0.08),
                                0 8px 8px rgba(10, 13, 18, 0.03),
                                0 3px 3px rgba(10, 13, 18, 0.04)
                                `,
            }}
            className='text-9xl! text-shadow-2xl!'
        >
            10:45
        </Title>
    )
}

export default TimingCounter
