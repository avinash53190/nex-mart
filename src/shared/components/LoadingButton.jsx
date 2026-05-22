import LoadingSpinner from './LoadingSpinner'

export default function LoadingButton({ loading, children, className = '', spinnerClassName = 'w-4 h-4', ...props }) {
  return (
    <button {...props} type={props.type || 'button'} disabled={loading || props.disabled} className={className}>
      {loading ? (
        <span className="inline-flex items-center justify-center gap-2">
          <LoadingSpinner className={spinnerClassName} />
          <span>{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  )
}
