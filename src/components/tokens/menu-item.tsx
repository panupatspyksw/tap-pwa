'use client'

import React from 'react'
import { Icon } from '@tabler/icons-react'
import { Menu, MenuItemProps } from '@mantine/core'

type MenuItemPropsC = {
    icon: Icon
    label: string
} & MenuItemProps

const MenuItem = ({ label, ...props }: MenuItemPropsC) => (
    <Menu.Item
        color='white'
        styles={{ itemSection: { color: '#61656C' } }}
        leftSection={<props.icon size={14} />}
        {...props}
    >
        {label}
    </Menu.Item>
)

export default MenuItem
