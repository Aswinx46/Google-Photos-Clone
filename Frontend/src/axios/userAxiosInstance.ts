import axios, { AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios'
import { store } from '../reduxstrore/store'
import { addToken } from '@/reduxstrore/slices/tokenSlice'
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = store.getState().token.token
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }
)

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean
}

export interface APIErrorResponse {
    error: string;
    message?: string;
    [key: string]: unknown;
}


instance.interceptors.response.use(
    response => response,
    async (error: AxiosError<APIErrorResponse>) => {
        const originalRequest = error.config as CustomAxiosRequestConfig
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const refreshResponse = await instance.post<{ newAccessToken: string }>('/refreshToken')
                // console.log('this is the refreshResponse', refreshResponse)
                const newAccessToken = refreshResponse.data.newAccessToken
                store.dispatch(addToken(newAccessToken))
                originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${newAccessToken}`
                }
                return instance(originalRequest)
            } catch (refreshError) {
                window.location.href = '/login'
                return Promise.reject({
                    status: error.response.status,
                    message: "Session Expired Please Login Again",
                    original: refreshError
                })
            }
        }
        return Promise.reject({
            status: error.response?.status,
            message: error.response?.data.error,
            data: error.response?.data || null,
            original: error
        })
    }
)
export default instance