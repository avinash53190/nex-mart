import { useCallback, useMemo, useState } from 'react'

export function useAsyncState(initialStatus = 'idle') {
  const [status, setStatus] = useState(initialStatus)
  const [error, setError] = useState(null)

  const start = useCallback(() => {
    setStatus('loading')
    setError(null)
  }, [])

  const succeed = useCallback(() => {
    setStatus('success')
    setError(null)
  }, [])

  const fail = useCallback((message) => {
    setStatus('error')
    setError(message)
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setError(null)
  }, [])

  return useMemo(() => ({
    status,
    error,
    isIdle: status === 'idle',
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
    start,
    succeed,
    fail,
    reset,
    setStatus,
    setError,
  }), [status, error, start, succeed, fail, reset])
}
