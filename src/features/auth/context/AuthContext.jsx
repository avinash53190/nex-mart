import { createContext, useContext, useEffect, useState } from 'react'
import {
  clearAuthSession,
  fetchCurrentUser,
  loadAuthSession,
  loginUser,
  registerUser,
  updateStoredUser,
} from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const session = loadAuthSession()
  const [user, setUser] = useState(session.user)
  const [status, setStatus] = useState(session.token ? 'loading' : 'success')
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    const hydrate = async () => {
      if (!session.token) {
        setStatus('success')
        return
      }

      try {
        const currentUser = await fetchCurrentUser()
        if (!active) return
        setUser(currentUser)
        updateStoredUser(currentUser)
        setError(null)
        setStatus('success')
      } catch (err) {
        if (!active) return
        clearAuthSession()
        setUser(null)
        setError(null)
        setStatus('success')
      }
    }

    hydrate()

    return () => {
      active = false
    }
  }, [session.token])

  const login = async (email, password) => {
    setStatus('loading')
    setError(null)
    const result = await loginUser(email, password)

    if (!result.success) {
      setStatus('success')
      setError(result.error)
      return result
    }

    setUser(result.user)
    setStatus('success')
    return result
  }

  const register = async (name, email, password) => {
    setStatus('loading')
    setError(null)
    const result = await registerUser(name, email, password)

    if (!result.success) {
      setStatus('success')
      setError(result.error)
      return result
    }

    setUser(result.user)
    setStatus('success')
    return result
  }

  const logout = () => {
    clearAuthSession()
    setUser(null)
    setError(null)
    setStatus('success')
  }

  const updateProfile = (updates) => {
    if (!user) return
    const updated = { ...user, ...updates }
    setUser(updated)
    updateStoredUser(updated)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        isAdmin: user?.role === 'admin',
        status,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
