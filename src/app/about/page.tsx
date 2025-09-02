import AboutUsCard from '@/components/tokens/about-us-card'
import BackNavigation from '@/components/tokens/back-navigation'
import ScreenContainer from '@/components/tokens/screen-container'
import ScreenContentWrapper from '@/components/tokens/screen-content-wrapper'
import ScreenDarkBackground from '@/components/tokens/screen-dark-background'
import ScreenGrayContentWrapper from '@/components/tokens/screen-gray-content-wrapper'

export default function AboutPage() {
    return (
        <ScreenContainer>
            <ScreenDarkBackground />
            <BackNavigation href='/' />
            <ScreenContentWrapper className='relative! flex! flex-col! overflow-hidden'>
                <ScreenGrayContentWrapper className='h-full w-full flex items-center justify-center'>
                    <AboutUsCard />
                </ScreenGrayContentWrapper>
            </ScreenContentWrapper>
        </ScreenContainer>
    )
}
