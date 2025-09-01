import React from 'react'
import { Button, ButtonProps, ElementProps } from '@mantine/core'

type ResetDefaultButtonProps = {} & Omit<ButtonProps & ElementProps<'button', keyof ButtonProps>, 'children'>

const ResetDefaultButton = (props: ResetDefaultButtonProps) => {
    return (
        <Button type='button' c='gray' variant='transparent' aria-label='reset default' {...props}>
            Reset Default
        </Button>
    )
}

export default ResetDefaultButton
