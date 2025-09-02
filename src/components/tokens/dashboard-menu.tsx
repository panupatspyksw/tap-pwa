import IconButton from './icon-button'
import { IconDots } from '@tabler/icons-react'
import { Menu } from '@mantine/core'
import { IconTrash, IconList, IconTableExport } from '@tabler/icons-react'
import MenuItem from './menu-item'

import React from 'react'
import { sessionLogRepository } from '@/modules/repositories/session-log-repository'

function download(filename: string, content: string, type = 'text/plain') {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
}

function exportData() {
    const logs = sessionLogRepository.list()
    if (!logs.length) {
        alert('No session data to export')
        return
    }
    const json = JSON.stringify(logs, null, 2)
    download('session-log.json', json, 'application/json')
}

function resetStatistics() {
    const ok = window.confirm('Reset statistics? This will permanently delete all session logs.')
    if (!ok) return
    sessionLogRepository.clear()
    window.location.reload()
}

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
                    <MenuItem href='#' icon={IconTableExport} label='Export Data' onClick={exportData} />
                    <MenuItem href='/manage' icon={IconList} label='Manage Session' />
                    <MenuItem c='red' href='#' icon={IconTrash} label='Reset Statistics' onClick={resetStatistics} />
                </Menu.Dropdown>
            </nav>
        </Menu>
    )
}

export default DashboardMenu
