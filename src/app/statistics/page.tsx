import BackNavigation from '@/components/tokens/back-navigation'
import Dashboard from '@/components/tokens/dashboard'
import ScreenContainer from '@/components/tokens/screen-container'
import ScreenContentWrapper from '@/components/tokens/screen-content-wrapper'
import ScreenDarkBackground from '@/components/tokens/screen-dark-background'
import ScreenGrayContentWrapper from '@/components/tokens/screen-gray-content-wrapper'

export default function StatisticsPage() {
    return (
        <ScreenContainer>
            <ScreenDarkBackground />
            <BackNavigation href='/' />

            <ScreenContentWrapper className='relative flex flex-col'>
                <ScreenGrayContentWrapper className='h-full'>
                    <Dashboard />
                </ScreenGrayContentWrapper>
            </ScreenContentWrapper>
        </ScreenContainer>
    )
}
