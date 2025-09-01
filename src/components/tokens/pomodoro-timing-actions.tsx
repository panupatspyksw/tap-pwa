// src/components/tokens/pomodoro-timing-actions.tsx
'use client'

import React, { useEffect } from 'react'
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

    const onToggle = () => {
        if (state === 'running') {
            pause()
        } else {
            primeSounds()
            state === 'idle' ? start() : resume()
        }
    }

    // --- Spacebar hotkey: toggle play/pause unless user is typing ---
    useEffect(() => {
        const isEditable = (el: EventTarget | null) => {
            const node = el as HTMLElement | null
            if (!node) return false
            const tag = node.tagName
            if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
            if ((node as HTMLElement).isContentEditable) return true
            return false
        }

        const onKeyDown = (e: KeyboardEvent) => {
            // Only plain space (no modifiers), and not while typing
            if (
                (e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar') &&
                !e.altKey &&
                !e.ctrlKey &&
                !e.metaKey &&
                !e.shiftKey &&
                !isEditable(e.target)
            ) {
                e.preventDefault() // prevent page scroll
                onToggle()
            }
        }

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [onToggle]) // re-bind if toggle behavior changes

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
