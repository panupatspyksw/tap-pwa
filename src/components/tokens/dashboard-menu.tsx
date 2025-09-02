import IconButton from './icon-button'
import { IconDots } from '@tabler/icons-react'
import { Menu } from '@mantine/core'
import { IconTrash, IconList, IconTableExport } from '@tabler/icons-react'
import MenuItem from './menu-item'

import React from 'react'

const DashboardMenu = () => {
    return (
        <Menu shadow='md' width={200} position='bottom-end'>
            <nav className='flex justify-end '>
                <ul className='flex gap-3'>
                    <li>
                        <Menu.Target>
                            <IconButton label='menu' size='lg' icon={IconDots} color='gray.7' />
                        </Menu.Target>
                    </li>
                </ul>
                <Menu.Dropdown bg='#0C0E12' bd='solid 1px #22262F'>
                    {/* <Menu.Label>Application</Menu.Label> */}
                    <MenuItem href='#' icon={IconTableExport} label='Export Data' />
                    <MenuItem href='/manage' icon={IconList} label='Manage Session' />
                    <MenuItem c='red' href='#' icon={IconTrash} label='Reset Statistics' />
                </Menu.Dropdown>
            </nav>
        </Menu>
    )
}

export default DashboardMenu
