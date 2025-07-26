import axios from '../../../axios/userAxiosInstance'
import type { SignupFormValues } from '../interfaces/signupFormInterfaces'
export const userSendOtp = async (email: string) => {
    const response = await axios.post('/send-otp', { email })
    return response.data
}

export const userSignup = async (user: Omit<SignupFormValues, 'confirmPassword'>, enteredOtp: string) => {
    const response = await axios.post('/signup', { user, enteredOtp })
    return response.data
}

export const userLogin = async (email: string, password: string) => {
    const response = await axios.post('/login', { email, password })
    return response.data
}