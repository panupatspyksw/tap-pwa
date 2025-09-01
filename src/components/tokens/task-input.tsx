// src/components/tokens/task-input.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { TextInput } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import { useSettings } from '@/modules/settings/store'
import IconButton from '@/components/tokens/icon-button'
import { useSession } from '@/modules/session/store'
import { Text } from '@mantine/core'

export default function TaskInput() {
    const phase = useSession((s) => s.cycle.currentPhase)
    const task = useSettings((s) => s.settings.task)
    const setTask = useSettings((s) => s.setTask)

    const [value, setValue] = useState(task)

    // keep local input in sync if settings change elsewhere
    useEffect(() => setValue(task), [task])

    const commit = () => setTask(value.trim())

    if (phase !== 'focus') {
        return (
            <Text size='xl' className='font-semibold! text-white/70!'>
                Break
            </Text>
        )
    }

    return (
        <TextInput
            className='group'
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            onBlur={commit}
            onKeyDown={(e) => {
                // Enter commits; stop propagation so global shortcuts don't catch it
                if (e.key === 'Enter') {
                    e.preventDefault()
                    e.stopPropagation()
                    commit()
                }
                // Spacebar: you already ignore inputs in the global handler,
                // but stopping propagation here makes it extra safe.
                if (e.key === ' ') e.stopPropagation()
            }}
            placeholder='Task'
            variant='filled'
            aria-label='Task name'
            autoComplete='off'
            spellCheck={false}
            maw={200}
            miw={200}
            size='sm'
            rightSection={
                value ? (
                    <IconButton
                        className='group-hover:block! hidden!'
                        label='clear task'
                        icon={IconX}
                        size='sm'
                        variant='subtle'
                        onMouseDown={(e) => e.preventDefault()} // keep input focus
                        onClick={() => {
                            setValue('')
                            setTask('')
                        }}
                    />
                ) : null
            }
        />
    )
}
