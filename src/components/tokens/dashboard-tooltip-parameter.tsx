import { Badge, BadgeProps, Text } from '@mantine/core'

import React from 'react'

type DashboardTooltipParameter = {
    color: BadgeProps['c']
    name: string
    value: string | number
    endValue?: string
} & React.ComponentProps<'div'>

const DashboardTooltipParameter = ({ color, name, value, endValue, ...rest }: DashboardTooltipParameter) => {
    return (
        <div className='flex gap-2 items-center w-full bg-black/30 rounded-lg p-2 mt-2' {...rest}>
            <Badge w='15' h='15' color={color} circle />
            <div className='flex justify-between w-full text-sm'>
                <div> {name}:</div>
                <div>
                    {value} {endValue ?? ''}
                </div>
            </div>
        </div>
    )
}

export default DashboardTooltipParameter
