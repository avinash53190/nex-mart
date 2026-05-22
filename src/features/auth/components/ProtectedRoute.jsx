import { Navigate } from 'react-router-dom'
import LoadingSpinner from '../../../shared/components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children }) {
  const { user, status } = useAuth()
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner className="w-8 h-8 text-brand-500" />
      </div>
    )
  }
  return user ? children : <Navigate to="/login" replace />
}

export function AdminRoute({ children }) {
  const { user, isAdmin, status } = useAuth()
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner className="w-8 h-8 text-brand-500" />
      </div>
    )
  }
  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />
  return children
}
