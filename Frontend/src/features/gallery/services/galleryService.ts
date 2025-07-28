import axios from '../../../axios/userAxiosInstance'

export const createImage = async (formData: FormData): Promise<void> => {
    const response = await axios.post('/images', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}

export const findImages = async ({ pageParam = 1 }) => {
    const limit = import.meta.env.VITE_PAGE_LIMIT
    const response = await axios.get('/images', { params: { page: pageParam, limit } })
    return response.data
}

export const updateImage = async (imageId: string, name: string, tags: string[]) => {
    const response = await axios.patch(`/images/${imageId}`, { name, tags })
    return response.data
}

export const deleteImage = async (imageId: string) => {
    const response = await axios.delete(`/images/${imageId}`)
    return response.data
}