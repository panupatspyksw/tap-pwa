'use client'

import React from 'react'
import IconButton from './icon-button'
import { IconMenu2, IconChartBarPopular, IconSettings, IconInfoCircle, IconHelp } from '@tabler/icons-react'
import { Menu } from '@mantine/core'
import MenuItem from './menu-item'
import MenuDivider from './menu-divider'
import Link from 'next/link'

const Header = () => {
    return (
        <Menu shadow='md' width={200} position='bottom-end'>
            <nav className='p-8 flex justify-end absolute top-0 right-0 z-10'>
                <ul className='flex gap-3'>
                    <li>
                        <Link href='/statistics'>
                            <IconButton label='chart' icon={IconChartBarPopular} color='gray.9' />
                        </Link>
                    </li>
                    <li>
                        <Menu.Target>
                            <IconButton label='menu' icon={IconMenu2} color='gray.9' />
                        </Menu.Target>
                    </li>
                </ul>
                <Menu.Dropdown bg='#0C0E12' bd='solid 1px #22262F'>
                    <MenuItem href='/settings' icon={IconSettings} label='Settings' />
                    <MenuItem href='/statistics' icon={IconChartBarPopular} label='Statistics' />
                    <MenuDivider />
                    <MenuItem href='/about' icon={IconInfoCircle} label='About us' />
                    <MenuItem href='/how-to-use' icon={IconHelp} label='How to use' />
                    {/* <MenuDivider /> */}
                    {/* <MenuItem href='#' icon={IconPhoto} label='Quit' onClick={handleQuit} /> */}
                </Menu.Dropdown>
            </nav>
        </Menu>
    )
}

export default Header
