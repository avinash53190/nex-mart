import { memo } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'

function RelatedProducts({ products }) {
  if (products.length === 0) return null

  return (
    <div className="pt-24 border-t border-navy-900">
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-brand-500 font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Complementary Selection</span>
          <h2 className="text-4xl font-bold text-white font-display italic">You May Also Appreciate.</h2>
        </div>
        <Link to="/shop" className="text-slate-500 font-black uppercase tracking-widest text-[10px] hover:text-brand-500 transition-colors border-b border-navy-800 pb-1">
          View Full Selection
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default memo(RelatedProducts)
