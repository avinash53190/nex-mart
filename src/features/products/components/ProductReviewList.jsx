import { memo } from 'react'
import ProductReviewItem from './ProductReviewItem'
import EmptyState from '../../../shared/components/EmptyState'

function ProductReviewList({ reviews }) {
  if (reviews.length === 0) {
    return (
      <EmptyState
        icon="💬"
        title="No reviews yet"
        description="Be the first to share your experience with this piece."
        className="bg-navy-900/30 border-dashed border-navy-800"
      />
    )
  }

  return (
    <div className="space-y-6 pt-12 border-t border-navy-900">
      {reviews.map((review) => (
        <ProductReviewItem key={review.id} review={review} />
      ))}
    </div>
  )
}

export default memo(ProductReviewList)
