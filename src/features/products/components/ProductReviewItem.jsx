import { memo } from 'react'
import RatingStars from './RatingStars'

function ProductReviewItem({ review }) {
  return (
    <div className="p-8 rounded-3xl bg-navy-900/50 border border-navy-800 hover:border-brand-500/20 transition-all duration-500">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-navy-950 font-black text-xs">
          {review.userName?.[0] || 'A'}
        </div>
        <div className="flex-1">
          <h4 className="text-white font-bold text-sm tracking-tight">{review.userName}</h4>
          <RatingStars rating={review.rating} className="w-4 h-4" />
        </div>
        <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Verified Collector</span>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed font-medium">{review.text}</p>
    </div>
  )
}

export default memo(ProductReviewItem)
