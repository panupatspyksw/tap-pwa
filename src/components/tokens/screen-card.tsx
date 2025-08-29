import React from 'react'

import { Card, CardProps } from '@mantine/core'
import { cn } from '@/lib/utils'

const ScreenCard = ({ className, style, ...props }: CardProps) => {
    return (
        <Card
            className={cn('overflow-auto h-full w-full border border-gray-500/90 flex flex-col', className)}
            style={{
                overflowY: 'auto', // 👈 makes inner content scroll
                ...style,
            }}
            // bd='30px solid red'
            shadow='xl'
            bdrs='lg'
            bg='gray.2'
            {...props}
        />
    )
}

export default ScreenCard
