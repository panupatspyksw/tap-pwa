import BackNavigation from '@/components/tokens/back-navigation'
import HowToUseContainer from '@/components/tokens/how-to-use-container'
import ScreenContainer from '@/components/tokens/screen-container'
import ScreenContentWrapper from '@/components/tokens/screen-content-wrapper'
import ScreenDarkBackground from '@/components/tokens/screen-dark-background'
import ScreenGrayContentWrapper from '@/components/tokens/screen-gray-content-wrapper'

export default function HowToUsePage() {
    return (
        <ScreenContainer>
            <ScreenDarkBackground />
            <BackNavigation href='/' />
            <ScreenContentWrapper className='relative! flex! flex-col! overflow-hidden'>
                <ScreenGrayContentWrapper className='h-full'>
                    <HowToUseContainer />
                </ScreenGrayContentWrapper>
            </ScreenContentWrapper>
        </ScreenContainer>
    )
}
