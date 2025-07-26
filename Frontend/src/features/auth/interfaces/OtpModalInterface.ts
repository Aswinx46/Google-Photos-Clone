export interface OTPModalProps {
    isOpen: boolean
    onClose: () => void
    onVerifyOTP: (otp: string) => Promise<void>
    onResendOTP: () => Promise<void>
    title?: string
    subtitle?: string
    otpLength?: number
}
