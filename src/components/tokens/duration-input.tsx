'use client'

import { forwardRef } from 'react'
import { Input, Slider, type SliderProps } from '@mantine/core'
import { useId } from '@mantine/hooks'

type DurationInputBaseProps = Omit<
    SliderProps,
    // we control these to match form contracts
    'value' | 'defaultValue' | 'onChange' | 'label'
>

export interface DurationInputProps extends DurationInputBaseProps {
    // ✅ form-friendly props (spread from form.getInputProps)
    value?: number
    defaultValue?: number
    onChange?: (value: number) => void
    onBlur?: React.FocusEventHandler<HTMLDivElement> // Slider root can blur
    name?: string

    // ✅ label/description/error like any input
    label?: React.ReactNode
    description?: React.ReactNode
    error?: React.ReactNode
    withAsterisk?: boolean

    id?: string
}

export const DurationInput = forwardRef<HTMLDivElement, DurationInputProps>(
    (
        {
            value,
            defaultValue,
            onChange,
            onBlur,
            name,

            label = null,
            description,
            error,
            withAsterisk,
            id: idProp,

            // common slider bits
            min = 0,
            max = 100,
            step = 1,
            marks = [
                { value: 5, label: '' },
                { value: 10, label: '10' },
                { value: 15, label: '' },
                { value: 20, label: '20' },
                { value: 25, label: '' },
                { value: 30, label: '30' },
                { value: 35, label: '' },
                { value: 40, label: '40' },
                { value: 45, label: '' },
                { value: 50, label: '50' },
                { value: 55, label: '' },
                { value: 60, label: '60' },
                { value: 65, label: '' },
                { value: 70, label: '70' },
                { value: 75, label: '' },
                { value: 80, label: '80' },
                { value: 85, label: '' },
                { value: 90, label: '90' },
                { value: 95, label: '' },
                { value: 100, label: '100' },
            ],
            restrictToMarks = true,

            ...rest
        },
        ref
    ) => {
        const autoId = useId()
        const id = idProp ?? autoId

        return (
            <div className='px-5 pt-4 pb-9 bg-black/50 mt-3 rounded-lg'>
                <Input.Wrapper
                    id={id} // gives you Mantine-styled label
                    label={label}
                    description={description}
                    error={error}
                    withAsterisk={withAsterisk}
                >
                    <Slider
                        mt='sm'
                        ref={ref}
                        name={name}
                        value={typeof value === 'number' ? value : undefined}
                        defaultValue={defaultValue}
                        onChange={(v) => onChange?.(v)}
                        onBlur={onBlur}
                        min={min}
                        max={max}
                        step={step}
                        marks={marks}
                        restrictToMarks={restrictToMarks}
                        // label={label} // hides thumb tooltip label (optional)
                        {...rest}
                    />
                </Input.Wrapper>
            </div>
        )
    }
)

DurationInput.displayName = 'DurationInput'

export default DurationInput
