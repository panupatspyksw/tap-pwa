// focus-session-setting-form.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import { useForm, isInRange } from '@mantine/form'
import { Group, Select, Switch } from '@mantine/core'
import DurationInput from '@/components/tokens/duration-input'
import CancelButton from '@/components/tokens/cancel-button'
import ResetDefaultButton from '@/components/tokens/reset-default-button'
import SaveButton from '../save-button'
import type { SessionConfig, CycleConfig } from '@/modules/settings/types'
import { useSettings } from '@/modules/settings/store'

type FocusSessionFormValues = {
    focusMin: number
    shortBreakMin: number
    autoStartFocus: boolean
    autoStartBreak: boolean
    longBreakMin: number
    longBreakEvery: string
}

type SubmitPayload = { session: SessionConfig; cycle: CycleConfig }
type TransformFn = (values: FocusSessionFormValues) => SubmitPayload

export default function FocusSessionSettingForm() {
    const settings = useSettings((s) => s.settings)
    const setSession = useSettings((s) => s.setSession)
    const setCycle = useSettings((s) => s.setCycle)
    const resetStore = useSettings((s) => s.reset)

    const [submitting, setSubmitting] = useState(false)

    // build initial form values from store
    const initialFromSettings: FocusSessionFormValues = useMemo(() => {
        const { session, cycle } = settings
        return {
            focusMin: session.focusMin,
            shortBreakMin: session.breakMin,
            autoStartFocus: session.autoStartFocus,
            autoStartBreak: session.autoStartBreak,
            longBreakMin: cycle.breakMin,
            longBreakEvery: String(cycle.sessionLength),
        }
    }, [settings])

    // ✅ controlled form (default) — remove mode:'uncontrolled'
    const form = useForm<FocusSessionFormValues, TransformFn>({
        initialValues: initialFromSettings,
        validate: {
            focusMin: isInRange({ min: 5, max: 100 }, 'Focus must be in range'),
            shortBreakMin: isInRange({ min: 1, max: 100 }, 'Short break must be in range'),
            longBreakMin: isInRange({ min: 5, max: 100 }, 'Long break must be in range'),
            longBreakEvery: (v) => {
                const n = Number(v)
                return Number.isInteger(n) && n >= 1 && n <= 12 ? null : 'Choose 1–12 sessions'
            },
        },
        transformValues: (values) => ({
            session: {
                focusMin: values.focusMin,
                breakMin: values.shortBreakMin,
                autoStartFocus: values.autoStartFocus,
                autoStartBreak: values.autoStartBreak,
            },
            cycle: {
                sessionLength: Number(values.longBreakEvery),
                breakMin: values.longBreakMin,
            },
        }),
    })

    // ✅ Cancel = restore current initialValues
    const onCancel = () => form.reset()

    // ✅ when settings change (persist rehydrate, reset), reseed both values & initialValues
    useEffect(() => {
        form.setValues(initialFromSettings)
        form.setInitialValues(initialFromSettings)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialFromSettings])

    const longBreakEveryOptions = useMemo(
        () =>
            Array.from({ length: 12 }, (_, i) => i + 1).map((num) => ({
                value: String(num),
                label: `${num} Session${num === 1 ? '' : 's'}`,
            })),
        []
    )

    return (
        <div className='bg-[#181D27] mt-4 p-5'>
            <form
                onSubmit={form.onSubmit(async ({ session, cycle }) => {
                    setSubmitting(true)
                    try {
                        setSession(session)
                        setCycle(cycle)
                        // mark as clean for future Cancel
                        form.setInitialValues(form.values)
                    } finally {
                        setSubmitting(false)
                    }
                })}
            >
                <label>Settings Focus Session</label>

                <DurationInput label='Flow Duration' {...form.getInputProps('focusMin')} />
                <DurationInput label='Short Break Duration' {...form.getInputProps('shortBreakMin')} />
                <DurationInput label='Long Break Duration' {...form.getInputProps('longBreakMin')} />

                <Select
                    className='mt-3'
                    label='Long Break After (Session)'
                    placeholder='Session'
                    data={longBreakEveryOptions}
                    value={form.values.longBreakEvery}
                    onChange={(v) => form.setFieldValue('longBreakEvery', v ?? '1')}
                    error={form.errors.longBreakEvery}
                    comboboxProps={{ withinPortal: true }}
                />

                <div className='mt-5 flex gap-4'>
                    <Switch
                        label='Start Focus Automatically'
                        {...form.getInputProps('autoStartFocus', { type: 'checkbox' })}
                    />
                    <Switch
                        label='Start Break Automatically'
                        {...form.getInputProps('autoStartBreak', { type: 'checkbox' })}
                    />
                </div>

                <Group justify='flex-end' mt='md'>
                    <ResetDefaultButton
                        onClick={() => {
                            // reset store to DEFAULTS → effect above reseeds the form
                            resetStore()
                        }}
                    />
                    <CancelButton onClick={onCancel} />
                    <SaveButton type='submit' loading={submitting} />
                </Group>
            </form>
        </div>
    )
}
