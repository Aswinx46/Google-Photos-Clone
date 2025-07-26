import axios from '../../../axios/userAxiosInstance'
export const userSendOtp = async (email: string) => {
    const response = await axios.post('/send-otp', { email })
    return response.data
} 