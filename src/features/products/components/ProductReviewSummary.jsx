import { memo } from 'react'
import RatingStars from './RatingStars'

function ProductReviewSummary({ average, count }) {
  return (
    <div className="w-full md:w-1/3 p-8 rounded-[2rem] bg-navy-900 border border-navy-800 text-center">
      <span className="text-6xl font-black text-white font-display italic">{average.toFixed(1)}</span>
      <div className="flex justify-center my-4">
        <RatingStars rating={average} className="w-5 h-5" />
      </div>
      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
        {count > 0 ? `${count} Collector Review${count === 1 ? '' : 's'}` : 'No Reviews Yet'}
      </p>
    </div>
  )
}

export default memo(ProductReviewSummary)
