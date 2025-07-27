import axios from '../../../axios/userAxiosInstance'

export const createImage = async (formData: FormData): Promise<void> => {
    const response = await axios.post('/images', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}