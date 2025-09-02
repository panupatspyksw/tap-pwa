'use client'

import React, { useEffect, useState } from 'react'
import { Text } from '@mantine/core'
import SessionLogCard from './session-log-card'
import { sessionLogRepository } from '@/modules/repositories/session-log-repository'
import type { SessionLog } from '@/modules/session/types'

export default function ManageSessionLog() {
    const [logs, setLogs] = useState<SessionLog[]>([])

    useEffect(() => {
        const all = sessionLogRepository.list()
        all.sort((a, b) => b.startAt - a.startAt) // newest first
        setLogs(all)
    }, [])

    const handleDelete = (id: string) => {
        sessionLogRepository.remove(id)
        setLogs((prev) => prev.filter((r) => r.id !== id))
    }

    return (
        <div className='flex flex-col h-full'>
            <Text size='lg' c='white' className='font-semibold!'>
                All Sessions ({logs.length})
            </Text>

            <div className='mt-4 relative flex flex-col gap-4 overflow-auto h-full hide-scrollbar p-5 bg-[#0A0D12] rounded-lg'>
                {logs.length === 0 ? (
                    <Text c='gray.5' ta='center'>
                        No session logs yet.
                    </Text>
                ) : (
                    logs.map((log) => <SessionLogCard key={log.id} data={log} onDelete={() => handleDelete(log.id)} />)
                )}
            </div>

            <div className='h-4' />
        </div>
    )
}
