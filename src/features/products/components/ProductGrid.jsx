import { memo } from 'react'
import ProductCard from './ProductCard'
import ProductCardSkeleton from '../../../shared/components/ProductCardSkeleton'
import EmptyState from '../../../shared/components/EmptyState'

function ProductGrid({ products, loading, onReset }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon="🔎"
        title="No Masterpieces Found"
        description="We couldn't locate any items matching your refined search. Perhaps adjust your requirements?"
        actionLabel="Reset Collection"
        onAction={onReset}
        className="py-20"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default memo(ProductGrid)
