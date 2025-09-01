'use client'

import React from 'react'
import { Title } from '@mantine/core'
import { useSession } from '@/modules/session/store'
// import { shallow } from 'zustand/shallow'

const fmt = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0')
    const s = String(sec % 60).padStart(2, '0')
    return `${m}:${s}`
}

const TimingCounter = () => {
    const remainingSec = useSession((s) => s.cycle.remainingSec)

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
            {fmt(remainingSec)}
        </Title>
    )
}

export default TimingCounter
