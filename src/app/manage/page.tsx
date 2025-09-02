import BackNavigation from '@/components/tokens/back-navigation'
import ManageSessionLog from '@/components/tokens/manage-session-log'
import ScreenContainer from '@/components/tokens/screen-container'
import ScreenContentWrapper from '@/components/tokens/screen-content-wrapper'
import ScreenDarkBackground from '@/components/tokens/screen-dark-background'
import ScreenGrayContentWrapper from '@/components/tokens/screen-gray-content-wrapper'

export default function StatisticsPage() {
    return (
        <ScreenContainer>
            <ScreenDarkBackground />
            <BackNavigation href='/statistics' />

            <ScreenContentWrapper className='relative! flex! flex-col! overflow-hidden'>
                <ScreenGrayContentWrapper className='h-full'>
                    <ManageSessionLog />
                </ScreenGrayContentWrapper>
            </ScreenContentWrapper>
        </ScreenContainer>
    )
}
