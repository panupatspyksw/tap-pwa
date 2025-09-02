import { cn } from '@/lib/utils'
import React from 'react'

// Use React.HTMLAttributes<HTMLDivElement> for all <div> props
type Props = React.HTMLAttributes<HTMLDivElement> & {
    className?: string
    children?: React.ReactNode
}

const ScreenGrayContentWrapper = ({ className, children, ...rest }: Props) => {
    return (
        <div className={cn('bg-[#181D27] mt-4 p-5 rounded-lg', className)} {...rest}>
            {children}
        </div>
    )
}

export default ScreenGrayContentWrapper
