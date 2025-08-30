import React from 'react'
import { Menu, MenuDividerProps } from '@mantine/core'

const MenuDivider = (props: MenuDividerProps) => {
    return <Menu.Divider bd='1px solid #22262F' {...props} />
}

export default MenuDivider
