import LoadingButton from './LoadingButton'

export default function ErrorState({ title = 'Something went wrong', message, onRetry, retryLabel = 'Try Again', className = '' }) {
  return (
    <div className={`rounded-[2rem] border border-red-500/20 bg-red-500/10 p-8 text-center ${className}`}>
      <div className="w-16 h-16 rounded-full bg-red-500/15 text-red-400 flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-sm text-slate-300 mt-2">{message}</p>
      {onRetry && (
        <LoadingButton
          onClick={onRetry}
          className="btn-primary mt-6"
          loading={false}
        >
          {retryLabel}
        </LoadingButton>
      )}
    </div>
  )
}
