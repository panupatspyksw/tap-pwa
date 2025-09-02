'use client'

import { cn } from '@/lib/utils'
import { useSettings } from '@/modules/settings/store'
import { Card, Timeline, Text, Group, Badge } from '@mantine/core'
import { IconPlayerPlay, IconFocus2, IconCoffee, IconRepeat, IconHourglassHigh } from '@tabler/icons-react'

type HowToUseContainerProps = {
    /** 0..4 which item is “current” */
    active?: number
    className?: string
}

export default function HowToUseContainer({
    // active = 0,
    className,
}: HowToUseContainerProps) {
    const settings = useSettings((s) => s.settings)

    return (
        <Card withBorder radius='md' p='xl' className={cn(`text-white bg-black/40!`, className)}>
            <Group justify='space-between' mb='md'>
                <Text fw={700}>How to use TAP</Text>
                <Badge variant='light' component='span'>
                    Pomodoro Flow
                </Badge>
            </Group>

            <Timeline bulletSize={26} lineWidth={2} color='orange'>
                <Timeline.Item bullet={<IconPlayerPlay size={14} />} title='Start timer'>
                    <Text c='dimmed' size='sm'>
                        Press{' '}
                        <Text component='span' fw={600} inherit>
                            Start
                        </Text>{' '}
                        to begin your first focus session.
                    </Text>

                    {/* Contains Badge → make Text a div OR make Badge a span (do both for safety) */}
                    <Text component='div' size='xs' mt={4}>
                        Focus length:{' '}
                        <Badge size='xs' variant='outline' component='span'>
                            {settings.session.focusMin} min
                        </Badge>
                    </Text>
                </Timeline.Item>

                <Timeline.Item bullet={<IconFocus2 size={14} />} title='Focus on the task'>
                    <Text c='dimmed' size='sm'>
                        Work without distractions until the timer ends. Mark progress in TAP if needed.
                    </Text>
                </Timeline.Item>

                <Timeline.Item bullet={<IconCoffee size={14} />} title='Take a short break'>
                    <Text c='dimmed' size='sm'>
                        When focus ends, TAP switches to a short break automatically.
                    </Text>

                    <Text component='div' size='xs' mt={4}>
                        Short break:{' '}
                        <Badge size='xs' variant='outline' component='span'>
                            {settings.session.breakMin} min
                        </Badge>
                    </Text>
                </Timeline.Item>

                <Timeline.Item bullet={<IconRepeat size={14} />} title='Repeat until full cycle'>
                    <Text c='dimmed' size='sm'>
                        Do{' '}
                        <Text component='span' fw={600} inherit>
                            {settings.cycle.sessionLength}
                        </Text>{' '}
                        focus sessions separated by short breaks.
                    </Text>

                    <Text size='xs' mt={4}>
                        1 cycle = {settings.cycle.sessionLength} × {settings.session.focusMin}-min focus + short breaks
                    </Text>
                </Timeline.Item>

                <Timeline.Item bullet={<IconHourglassHigh size={14} />} title='Enjoy a long break'>
                    <Text c='dimmed' size='sm'>
                        After completing a full cycle, TAP starts a long break to recharge.
                    </Text>

                    <Text component='div' size='xs' mt={4}>
                        Long break:{' '}
                        <Badge size='xs' variant='outline' component='span'>
                            {settings.cycle.breakMin} min
                        </Badge>
                    </Text>
                </Timeline.Item>
            </Timeline>
        </Card>
    )
}
