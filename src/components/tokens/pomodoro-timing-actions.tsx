'use client'

import React from 'react'
import { Flex } from '@mantine/core'
import {
    IconPlayerSkipBackFilled,
    IconPlayerSkipForwardFilled,
    IconPlayerStopFilled,
    IconRotate,
} from '@tabler/icons-react'
import IconButton from '@/components/tokens/icon-button'

const PomodoroTimingActions = () => {
    return (
        <Flex className='gap-2'>
            <IconButton icon={IconRotate} label='reset' />
            <IconButton icon={IconPlayerSkipBackFilled} label='back' />
            <IconButton icon={IconPlayerStopFilled} label='stop/play' />
            <IconButton icon={IconPlayerSkipForwardFilled} label='back' />
        </Flex>
    )
}

export default PomodoroTimingActions
