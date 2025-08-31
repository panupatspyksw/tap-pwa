import ScreenContainer from '@/components/tokens/screen-container'
import Image from 'next/image'
import { Text, Flex, TextInput, Button } from '@mantine/core'
import TimingCounter from '@/components/tokens/timing-counter'
import PomodoroStack from '@/components/tokens/pomodoro-stack'
import PomodoroTimingActions from '@/components/tokens/pomodoro-timing-actions'
import Header from '@/components/tokens/header'

export default function Home() {
    return (
        <ScreenContainer bg='dark.9'>
            <Image
                src='/medias/cloud-background edited v1.0.png'
                width={1500}
                height={1000}
                alt='screen background'
                className='object-cover h-full w-full absolute top-0 left-0'
            />
            {/* heading */}
            <Header />
            {/* sides container */}
            <div className='w-full h-full flex flex-col xl:flex-row relative '>
                {/* left side container */}
                <div className='h-full w-full p-6 overflow-hidden flex flex-col gap-4 justify-between text-white/80'>
                    {/* brand credit */}
                    <Text size='xs'>made by xystematic</Text>
                    {/* quote */}
                    <Flex direction='column' gap='md'>
                        <Text size='md'>quote for the day - 26 Aug 2025</Text>
                        <h1 className='italic text-5xl xl:text-6xl leading-14 xl:leading-17 font-semibold'>
                            Do not regret what you have done.
                        </h1>
                    </Flex>
                </div>
                {/* right side container */}
                <div className=' h-full w-full p-6 flex flex-col justify-center items-center bg-white/20 backdrop-blur-xs rounded-2xl'>
                    {/* wrapper container to position center */}
                    <div className='flex flex-col items-center gap-7'>
                        {/* Task Label Field */}
                        <TextInput placeholder='Task' variant='filled' w='150px' />
                        {/* Timing */}
                        <TimingCounter />
                        {/* Pomodoro Stacking */}
                        <PomodoroStack />
                        {/* Action sections */}
                        <PomodoroTimingActions />
                    </div>
                </div>
            </div>
        </ScreenContainer>
    )
}
