'use client'

import React from 'react'
import { Icon } from '@tabler/icons-react'
import { Menu, MenuItemProps } from '@mantine/core'
import Link from 'next/link'

type MenuItemPropsC = {
    icon: Icon
    label: string
    href: string
} & MenuItemProps

const MenuItem = ({ label, ...props }: MenuItemPropsC) => (
    <Menu.Item
        component={Link}
        color='white'
        styles={{ itemSection: { color: '#61656C' } }}
        leftSection={<props.icon size={14} />}
        {...props}
    >
        {label}
    </Menu.Item>
)

export default MenuItem
