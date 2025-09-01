import React from 'react'
import { Button, ButtonProps, ElementProps } from '@mantine/core'

type SaveButtonProps = {} & Omit<ButtonProps & ElementProps<'button', keyof ButtonProps>, 'children'>

const SaveButton = (props: SaveButtonProps) => {
    return (
        <Button
            type='submit'
            variant='gradient'
            gradient={{ from: 'rgba(4, 35, 107, 1)', to: 'indigo', deg: 45 }}
            aria-label='save'
            {...props}
        >
            Save
        </Button>
    )
}

export default SaveButton
