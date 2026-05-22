import { memo } from 'react'
import ProductReviewForm from './ProductReviewForm'
import ProductReviewList from './ProductReviewList'
import ProductReviewSummary from './ProductReviewSummary'

function ProductReviews({
  averageRating,
  reviewCount,
  reviews,
  isAuthenticated,
  rating,
  setRating,
  reviewText,
  setReviewText,
  onSubmit,
  submitting,
}) {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <ProductReviewSummary average={averageRating} count={reviewCount} />
        <div className="flex-1 space-y-8">
          <ProductReviewForm
            isAuthenticated={isAuthenticated}
            rating={rating}
            setRating={setRating}
            reviewText={reviewText}
            setReviewText={setReviewText}
            onSubmit={onSubmit}
            submitting={submitting}
          />
        </div>
      </div>

      <ProductReviewList reviews={reviews} />
    </div>
  )
}

export default memo(ProductReviews)
