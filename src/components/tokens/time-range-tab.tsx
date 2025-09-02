import React from 'react'
import { Tabs } from '@mantine/core'

type TimeRangeTabProps = {
    setTab: React.Dispatch<React.SetStateAction<string>>
    tab: string
}

const TimeRangeTab = ({ tab, setTab }: TimeRangeTabProps) => {
    return (
        <Tabs value={tab} onChange={(value) => setTab(value!)} variant='pills' w='100%'>
            <div className='flex justify-between gap-6 w-full'>
                <Tabs.List>
                    <Tabs.Tab value='day'>Day</Tabs.Tab>
                    <Tabs.Tab value='week'>Week</Tabs.Tab>
                    <Tabs.Tab value='month'>Month</Tabs.Tab>
                    <Tabs.Tab value='year'>Year</Tabs.Tab>
                </Tabs.List>
            </div>
        </Tabs>
    )
}

export default TimeRangeTab
