import { AnimatePresence, motion } from 'framer-motion'
import { useNotifications } from '../feedback/NotificationContext'

const styles = {
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100',
  error: 'border-red-500/30 bg-red-500/10 text-red-100',
  warning: 'border-amber-500/30 bg-amber-500/10 text-amber-100',
  info: 'border-sky-500/30 bg-sky-500/10 text-sky-100',
}

export default function ToastViewport() {
  const notifications = useNotifications()

  if (!notifications) return null

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 w-[min(92vw,24rem)]">
      <AnimatePresence>
        {notifications.notifications.map((toast) => (
          <motion.div
            key={toast.id}
            role={toast.type === 'error' ? 'alert' : 'status'}
            aria-live="polite"
            initial={{ opacity: 0, x: 24, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 24, scale: 0.96 }}
            className={`rounded-2xl border p-4 shadow-2xl backdrop-blur-xl ${styles[toast.type]}`}
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center font-black">
                {toast.icon}
              </div>
              <div className="flex-1 min-w-0">
                {toast.title && <p className="text-sm font-bold">{toast.title}</p>}
                <p className="text-sm leading-relaxed">{toast.message}</p>
                {toast.onAction && toast.actionLabel && (
                  <button
                    type="button"
                    onClick={toast.onAction}
                    className="mt-3 text-xs font-black uppercase tracking-widest underline underline-offset-4"
                  >
                    {toast.actionLabel}
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => notifications.dismiss(toast.id)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
