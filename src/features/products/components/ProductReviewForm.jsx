import { memo } from 'react'
import LoadingButton from '../../../shared/components/LoadingButton'

function ProductReviewForm({
  isAuthenticated,
  rating,
  setRating,
  reviewText,
  setReviewText,
  onSubmit,
  submitting,
}) {
  if (!isAuthenticated) {
    return (
      <div className="p-8 rounded-3xl bg-navy-900/30 border border-navy-800 border-dashed text-center">
        <p className="text-slate-500 text-sm">Please sign in to share your experience with the world.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-white font-bold uppercase tracking-widest text-xs">Post a Review</h3>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            className={value <= rating ? 'text-brand-500 text-xl' : 'text-navy-800 text-xl'}
            aria-label={`Rate ${value} stars`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Your testimonial..."
        className="input h-32"
      />
      <LoadingButton
        type="button"
        onClick={onSubmit}
        loading={submitting}
        disabled={!reviewText.trim()}
        className="btn-secondary text-xs uppercase tracking-widest font-black"
      >
        Submit Reflection
      </LoadingButton>
    </div>
  )
}

export default memo(ProductReviewForm)
