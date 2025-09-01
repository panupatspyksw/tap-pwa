'use client'

import React from 'react'
import IconButton from './icon-button'
import { IconArrowBackUp } from '@tabler/icons-react'
import { Menu } from '@mantine/core'

import Link from 'next/link'

type BackNavigationProps = {
    href: string
}

const BackNavigation = ({ href }: BackNavigationProps) => {
    return (
        <Menu shadow='md' width={200} position='bottom-end'>
            <nav className='flex justify-start sticky top-0 left-0 z-10'>
                <ul className='flex gap-3'>
                    <li>
                        <Link href={href}>
                            <IconButton label='chart' icon={IconArrowBackUp} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </Menu>
    )
}

export default BackNavigation
