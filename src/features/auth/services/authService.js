import { apiClient } from '../../../shared/services/apiClient'
import { storage } from '../../../shared/services/storage'
import { STORAGE_KEYS } from '../../../shared/services/constants'

const normalizeUser = (user = {}) => ({
  ...user,
  id: user.id || user._id,
  _id: user._id || user.id,
})

const normalizeAuthResponse = (payload) => ({
  user: normalizeUser(payload?.user || payload?.data?.user || payload?.data),
  token: payload?.token || payload?.data?.token || '',
})

export const loadAuthSession = () => {
  const token = storage.get(STORAGE_KEYS.AUTH_TOKEN)

  return {
    token,
    user: token ? storage.get(STORAGE_KEYS.AUTH_USER) : null,
  }
}

export const saveAuthSession = ({ user, token }) => {
  storage.set(STORAGE_KEYS.AUTH_USER, user)
  storage.set(STORAGE_KEYS.AUTH_TOKEN, token)
}

export const clearAuthSession = () => {
  storage.remove(STORAGE_KEYS.AUTH_USER)
  storage.remove(STORAGE_KEYS.AUTH_TOKEN)
  storage.remove(STORAGE_KEYS.USER)
}

export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', { email: email.trim().toLowerCase(), password })
    const auth = normalizeAuthResponse(response.data)
    saveAuthSession(auth)
    return { success: true, ...auth }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const registerUser = async (name, email, password) => {
  try {
    const response = await apiClient.post('/auth/register', { name, email: email.trim().toLowerCase(), password })
    const auth = normalizeAuthResponse(response.data)
    saveAuthSession(auth)
    return { success: true, ...auth }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const fetchCurrentUser = async () => {
  const response = await apiClient.get('/auth/me')
  const payload = response.data?.data || response.data
  const user = normalizeUser(payload.user || payload)
  return user
}

export const updateStoredUser = (user) => {
  storage.set(STORAGE_KEYS.AUTH_USER, user)
}
