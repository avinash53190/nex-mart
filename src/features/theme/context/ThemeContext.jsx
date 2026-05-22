import { createContext, useContext, useState, useEffect } from 'react'
import { storage } from '../../../shared/services/storage'
import { STORAGE_KEYS } from '../../../shared/services/constants'

const ThemeContext = createContext(null)

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => storage.get(STORAGE_KEYS.THEME, false))

  useEffect(() => {
    storage.set(STORAGE_KEYS.THEME, dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const toggle = () => setDark(d => !d)

  return <ThemeContext.Provider value={{ dark, toggle }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
