import React from 'react'

import { Container, ContainerProps, Flex } from '@mantine/core'
import { cn } from '@/lib/utils'
import ScreenCard from '@/components/tokens/screen-card'

const ScreenContainer = ({ className, children, ...props }: ContainerProps) => {
    return (
        <Container
            fluid
            size='xl'
            bg='gray.1'
            h='100vh'
            mih='100vh'
            className={cn('overflow-auto flex flex-col items-center justify-center relative', className)}
            p='xl'
            {...props}
        >
            <ScreenCard className='overflow-auto'>{children}</ScreenCard>
        </Container>
    )
}

export default ScreenContainer
