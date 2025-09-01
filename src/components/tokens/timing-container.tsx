'use client'

import { cn } from '@/lib/utils'
import { useSession } from '@/modules/session/store'
import * as React from 'react'

type TimingContainerProps = React.ComponentPropsWithoutRef<'div'>

export default function TimingContainer({ className, ...rest }: TimingContainerProps) {
    const phase = useSession((s) => s.cycle.currentPhase)

    return (
        <div
            className={cn(
                'h-full w-full p-6 flex flex-col justify-center items-center bg-white/20 backdrop-blur-xs rounded-2xl transition-all border border-white/40',
                { 'bg-teal-800/70': phase !== 'focus' },
                className
            )}
            {...rest}
        />
    )
}
