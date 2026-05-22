import axios from 'axios'
import { API_BASE_URL } from './constants'
import { storage } from './storage'
import { STORAGE_KEYS } from './constants'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const normalizeApiError = (error, fallbackMessage = 'Something went wrong') => {
  if (!error) return new Error(fallbackMessage)

  const message =
    error.response?.data?.message ||
    error.message ||
    fallbackMessage

  return new Error(message)
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeApiError(error, 'Request failed'))
)

apiClient.interceptors.request.use((config) => {
  const token = storage.get(STORAGE_KEYS.AUTH_TOKEN)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
