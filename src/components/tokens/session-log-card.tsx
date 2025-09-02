import { cn } from '@/lib/utils'
import { SessionLog } from '@/modules/session/types'
import React from 'react'
import { isSameDay, format } from 'date-fns'
import IconButton from './icon-button'
import { IconTrash } from '@tabler/icons-react'

type SessionLogCardProps = {
    data?: SessionLog
    onDelete: () => void
} & React.ComponentProps<'div'>

const SessionLogCard = ({
    data = {
        id: 'mf0vy5cb-c0eohs',
        type: 'session-break',
        startAt: 1756716590476,
        endAt: 1756717006475,
        duration: 416,
    },
    className,
    onDelete,
    ...rest
}: SessionLogCardProps) => {
    const type = data.type === 'focus' ? 'Focus' : 'Break'
    const startTimestamp = new Date(data.startAt)
    const endTimestamp = new Date(data.endAt)
    const _isSameDay = isSameDay(startTimestamp, endTimestamp)
    return (
        <div className={cn('flex items-start gap-3 p-4 bg-[#414651] rounded-lg', className)} {...rest}>
            {/* timing */}
            <div className='flex items-center h-full w-50'>
                <div>
                    <span className='text-md text-white/60 mb-1'>{type}</span>
                    <p className='font-semibold text-white text-3xl'>
                        {Math.floor(data.duration / 60)} <span className='text-base font-light'>min</span>{' '}
                        {data.duration % 60 > 0 && (
                            <>
                                {data.duration % 60} <span className='text-base font-light'>sec</span>
                            </>
                        )}
                    </p>
                </div>
            </div>
            {/* timestamp start - end */}
            <div className='h-fit flex rounded-lg px-4 py-1.5 bg-black/20'>
                <div className='flex flex-col gap-1.5'>
                    <p>{format(startTimestamp, 'd MMM yyyy')}</p>
                    {!_isSameDay && <span className='w-2 h-2 bg-white rounded-full'></span>}
                    <p>
                        {format(startTimestamp, 'hh:mm:ss')} {_isSameDay && ' - ' + format(endTimestamp, 'hh:mm:ss')}
                    </p>
                </div>
                {!_isSameDay && (
                    <div className='flex flex-col gap-1.5'>
                        <p>{format(endTimestamp, 'd MMM yyyy')}</p>
                        <p>{format(endTimestamp, 'hh:mm:ss')}</p>
                    </div>
                )}
            </div>
            {/* action */}
            <IconButton onClick={onDelete} color='red.9' ms='auto' icon={IconTrash} label='delete' />
        </div>
    )
}

export default SessionLogCard
