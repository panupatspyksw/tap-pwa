'use client'

import React from 'react'
import { Icon } from '@tabler/icons-react'
import { ActionIcon, ActionIconProps, ButtonProps, ElementProps } from '@mantine/core'

type IconButtonProps = {
    icon: Icon
    label: string
} & Omit<ActionIconProps & ButtonProps & ElementProps<'button', keyof ButtonProps>, 'children'>

const IconButton = (props: IconButtonProps) => {
    return (
        <ActionIcon color='gray.7' variant='filled' aria-label={props.label} size='xl' {...props}>
            <props.icon style={{ width: '50%', height: '50%' }} stroke={1.5} />
        </ActionIcon>
    )
}

export default IconButton
