'use client'

import React from 'react'
import IconButton from './icon-button'
import { IconMenu2, IconChartBarPopular } from '@tabler/icons-react'
import { Menu } from '@mantine/core'
import { IconSettings, IconPhoto, IconMessageCircle } from '@tabler/icons-react'
import MenuItem from './menu-item'
import MenuDivider from './menu-divider'

const Header = () => {
    return (
        <Menu shadow='md' width={200} position='bottom-end'>
            <nav className='p-8 flex justify-end absolute top-0 right-0 z-10'>
                <ul className='flex gap-3'>
                    <li>
                        <IconButton label='chart' icon={IconChartBarPopular} color='gray.9' />
                    </li>
                    <li>
                        <Menu.Target>
                            <IconButton label='menu' icon={IconMenu2} color='gray.9' />
                        </Menu.Target>
                    </li>
                </ul>
                <Menu.Dropdown bg='#0C0E12' bd='solid 1px #22262F'>
                    {/* <Menu.Label>Application</Menu.Label> */}
                    <MenuItem href='/settings' icon={IconSettings} label='Settings' />
                    <MenuItem href='/' icon={IconMessageCircle} label='Statistics' />
                    <MenuDivider />
                    <MenuItem href='/' icon={IconPhoto} label='About us' />
                    <MenuItem href='/' icon={IconPhoto} label='How to use' />
                    <MenuDivider />
                    <MenuItem href='/' icon={IconPhoto} label='Quit' />
                </Menu.Dropdown>
            </nav>
        </Menu>
        // <nav className='p-8 flex justify-end absolute top-0 right-0 z-10'>
        //     <ul className='flex gap-3'>
        //         <li>
        //             <IconButton label='chart' icon={IconChartBarPopular} color='gray.9' />
        //         </li>
        //         <li>
        //             <IconButton label='menu' icon={IconMenu2} color='gray.9' />
        //         </li>
        //     </ul>
        // </nav>
    )
}

export default Header
