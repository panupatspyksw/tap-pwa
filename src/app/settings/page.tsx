import BackNavigation from '@/components/tokens/back-navigation'
import FocusSessionSettingForm from '@/components/tokens/form/focus-session-setting-form'
import NotificationSettingForm from '@/components/tokens/form/notification-setting-form'
import ScreenContainer from '@/components/tokens/screen-container'

export default function SettingPAge() {
    return (
        <ScreenContainer>
            <div className='bg-[#0A0D12] w-full h-full absolute top-0 left-0' />
            <BackNavigation href='/' />

            <div className='sticky top-0 h-full overflow-auto hide-scrollbar'>
                {/* setting container */}
                <FocusSessionSettingForm />
                <NotificationSettingForm />
            </div>
        </ScreenContainer>
    )
}
