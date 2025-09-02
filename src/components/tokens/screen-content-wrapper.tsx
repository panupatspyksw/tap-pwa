import { cn } from '@/lib/utils'
import React from 'react'

const ScreenContentWrapper = ({ children, className }: { children: React.ReactNode; className: string }) => {
    return <div className={cn('sticky top-0 h-full overflow-auto hide-scrollbar', className)}>{children}</div>
}

export default ScreenContentWrapper
