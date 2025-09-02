'use client'

import { Card, Group, Image, Text, Badge } from '@mantine/core'
import Link from 'next/link'

const AboutUsCard = () => {
    return (
        <Card
            w='fit'
            shadow='xl'
            radius='md'
            withBorder
            p='lg'
            className='bg-[linear-gradient(90deg,rgba(255,255,255,0.16)_0%,rgba(174,174,174,0.12)_100%)]! text-white w-fit!'
        >
            <div className='flex flex-row gap-6 h-full w-full '>
                {/* Logo */}
                <div className='w-fit h-fit shadow-2xl'>
                    <Image
                        src='/medias/logo.svg'
                        className='max-w-[175px]'
                        alt='TAP Logo'
                        width={64}
                        height={64}
                        radius='md'
                        fit='contain'
                    />
                </div>

                {/* Content */}
                <div className='bg-[#0A0D12] p-8 rounded-lg flex flex-col'>
                    <Group justify='space-between' mb='xs'>
                        <Text c='white' size='lg' className='font-semibold!'>
                            TAP – Tomodoro Application for a Person
                        </Text>
                        <Badge size='md' variant='white' radius='xl'>
                            v1.0.0
                        </Badge>
                    </Group>

                    <Text size='md' className='text-white/70!'>
                        Work. Break. Repeat. Watch your progress.
                    </Text>

                    <Text size='sm' mt='auto' className='text-white/90!' fs='italic'>
                        created by{' '}
                        <Link href='https://xystematic.com' target='_blank'>
                            <Text span inherit fw={500} c='gray.2'>
                                Xystematic
                            </Text>
                        </Link>
                    </Text>
                </div>
            </div>
        </Card>
    )
}

export default AboutUsCard
