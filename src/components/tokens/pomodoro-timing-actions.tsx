// src/components/tokens/pomodoro-timing-actions.tsx
'use client'

import React, { useEffect, useCallback, useRef } from 'react'
import { Flex } from '@mantine/core'
import {
    IconRotate,
    IconPlayerSkipBackFilled,
    IconPlayerSkipForwardFilled,
    IconPlayerPauseFilled,
    IconPlayerPlayFilled,
} from '@tabler/icons-react'
import IconButton from '@/components/tokens/icon-button'
import { useSession } from '@/modules/session/store'
import { primeSounds } from '@/modules/session/sound'
import { useShallow } from 'zustand/react/shallow'

export default function PomodoroTimingActions() {
    const state = useSession((s) => s.state)

    const { start, resume, pause, reset, skip, back } = useSession(
        useShallow((s) => ({
            start: s.start,
            resume: s.resume,
            pause: s.pause,
            reset: s.reset,
            skip: s.skip,
            back: s.back, // remove cast if your Store type includes `back`
        }))
    )

    const onToggle = useCallback(() => {
        if (state === 'running') {
            pause()
            return
        }
        primeSounds()
        if (state === 'idle') start()
        else resume()
    }, [state, pause, start, resume])

    const toggleRef = useRef(onToggle)
    useEffect(() => {
        toggleRef.current = onToggle
    }, [onToggle])

    useEffect(() => {
        const isEditable = (el: EventTarget | null) => {
            const node = el as HTMLElement | null
            if (!node) return false
            const tag = node.tagName
            if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
            if (node.isContentEditable) return true
            return false
        }

        const onKeyDown = (e: KeyboardEvent) => {
            if (
                (e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar') &&
                !e.altKey &&
                !e.ctrlKey &&
                !e.metaKey &&
                !e.shiftKey &&
                !isEditable(e.target)
            ) {
                e.preventDefault()
                toggleRef.current() // use latest toggle without rebinding
            }
        }

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, []) // <-- bind once

    return (
        <Flex className='gap-2'>
            <IconButton icon={IconRotate} label='Reset' onClick={reset} />
            <IconButton icon={IconPlayerSkipBackFilled} label='Back' onClick={back} />
            <IconButton
                icon={state === 'running' ? IconPlayerPauseFilled : IconPlayerPlayFilled}
                label={state === 'running' ? 'Pause' : 'Play'}
                onClick={onToggle}
                aria-keyshortcuts='Space'
            />
            <IconButton icon={IconPlayerSkipForwardFilled} label='Next' onClick={skip} />
        </Flex>
    )
}
