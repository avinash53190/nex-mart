import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const NotificationContext = createContext(null)

const DEFAULT_DURATION = 4000

const iconByType = {
  success: '✓',
  error: '!',
  warning: '⚠',
  info: 'i',
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const dismiss = useCallback((id) => {
    setNotifications((current) => current.filter((notification) => notification.id !== id))
  }, [])

  const push = useCallback((type, message, options = {}) => {
    const id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2, 11)
    const notification = {
      id,
      type,
      message,
      title: options.title || '',
      actionLabel: options.actionLabel || '',
      onAction: options.onAction,
      icon: options.icon || iconByType[type] || 'i',
    }

    setNotifications((current) => [notification, ...current].slice(0, 4))

    const timeout = options.duration ?? DEFAULT_DURATION
    if (timeout > 0) {
      window.setTimeout(() => dismiss(id), timeout)
    }

    return id
  }, [dismiss])

  const value = useMemo(() => ({
    notifications,
    dismiss,
    notify: {
      success: (message, options) => push('success', message, options),
      error: (message, options) => push('error', message, options),
      warning: (message, options) => push('warning', message, options),
      info: (message, options) => push('info', message, options),
    },
  }), [notifications, dismiss, push])

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationContext)
