import React from 'react'
import { Button, ButtonProps, ElementProps } from '@mantine/core'

type CancelButtonProps = {} & Omit<ButtonProps & ElementProps<'button', keyof ButtonProps>, 'children'>

const CancelButton = (props: CancelButtonProps) => {
    return (
        <Button type='button' variant='white' c='gray.8' aria-label='cancel' {...props}>
            Cancel
        </Button>
    )
}

export default CancelButton
