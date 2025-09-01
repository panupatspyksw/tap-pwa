// src/components/tokens/form/notification-setting-form.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import { useForm, isInRange } from '@mantine/form'
import { Group, Switch } from '@mantine/core'
import DurationInput from '@/components/tokens/duration-input'
import CancelButton from '@/components/tokens/cancel-button'
import ResetDefaultButton from '@/components/tokens/reset-default-button'
import SaveButton from '../save-button'
import { useSettings } from '@/modules/settings/store'
import type { NotiConfig } from '@/modules/settings/types'

// src/components/tokens/form/notification-setting-form.tsx

type NotiFormValues = {
    enabled: boolean
    volumePercent: number // UI 0..100; store 0..1
}

type TransformFn = (values: NotiFormValues) => NotiConfig

const NotificationSettingForm = () => {
    const settings = useSettings((s) => s.settings)
    const setNotification = useSettings((s) => s.setNotification)
    const resetStore = useSettings((s) => s.reset)
    const [submitting, setSubmitting] = useState(false)

    // Build initial values from store (memoized)
    const initialFromSettings: NotiFormValues = useMemo(() => {
        const { enabled, volume } = settings.notification
        return {
            enabled,
            volumePercent: Math.round(volume * 100),
        }
    }, [settings.notification])

    const form = useForm<NotiFormValues, TransformFn>({
        mode: 'controlled',
        initialValues: initialFromSettings,
        validate: {
            volumePercent: isInRange({ min: 0, max: 100 }, 'Volume must be 0–100'),
        },
        transformValues: (values) => ({
            enabled: values.enabled,
            volume: Math.max(0, Math.min(1, values.volumePercent / 100)),
        }),
    })

    // 🔁 Same sync pattern as the focus-session form:
    // whenever store values change (including after persist hydration or reset),
    // re-seed both the current values and the "clean" baseline
    useEffect(() => {
        form.setValues(initialFromSettings)
        form.setInitialValues(initialFromSettings)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialFromSettings])

    const volumeMarks = useMemo(() => [0, 20, 40, 60, 80, 100].map((v) => ({ value: v, label: String(v) })), [])

    return (
        <div className='bg-[#181D27] mt-4 p-5'>
            <form
                onSubmit={form.onSubmit(async (payload) => {
                    setSubmitting(true)
                    try {
                        // payload is NotiConfig (enabled, volume 0..1)
                        setNotification(payload)
                        form.setInitialValues(form.values)
                    } finally {
                        setSubmitting(false)
                    }
                })}
            >
                <div className='flex flex-col gap-4'>
                    <label>Settings Notification</label>

                    <div className='flex flex-col gap-3'>
                        <Switch label='Allow Notifications' {...form.getInputProps('enabled', { type: 'checkbox' })} />

                        <DurationInput
                            label='Volume'
                            restrictToMarks
                            marks={volumeMarks}
                            min={0}
                            max={100}
                            {...form.getInputProps('volumePercent')}
                        />
                    </div>

                    <Group justify='flex-end' mt='md'>
                        <ResetDefaultButton onClick={() => resetStore()} disabled={submitting} />
                        <CancelButton disabled={submitting} />
                        <SaveButton type='submit' disabled={submitting} />
                    </Group>
                </div>
            </form>
        </div>
    )
}

export default NotificationSettingForm
