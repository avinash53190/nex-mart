export default function InlineStatusIndicator({ type = 'info', message, className = '' }) {
  if (!message) return null

  const styles = {
    success: 'bg-emerald-500/10 text-emerald-200 border-emerald-500/20',
    error: 'bg-red-500/10 text-red-200 border-red-500/20',
    warning: 'bg-amber-500/10 text-amber-200 border-amber-500/20',
    info: 'bg-sky-500/10 text-sky-200 border-sky-500/20',
  }

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      className={`rounded-2xl border px-4 py-3 text-sm ${styles[type]} ${className}`}
    >
      {message}
    </div>
  )
}
