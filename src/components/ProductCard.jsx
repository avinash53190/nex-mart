import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { formatPrice, getDiscount } from '../utils/helpers'

const StarRating = ({ rating, reviews }) => (
  <div className="flex items-center gap-1.5">
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`w-3 h-3 ${i <= Math.round(rating) ? 'star-filled' : 'star-empty'}`}
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <span className="text-[10px] font-bold text-slate-500 tracking-tighter uppercase font-display">{reviews?.toLocaleString()} Reviews</span>
  </div>
)

export default function ProductCard({ product }) {
  const { addToCart, setIsDrawerOpen } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const [isHovered, setIsHovered] = useState(false)

  const discount = product.originalPrice ? getDiscount(product.originalPrice, product.price) : 0
  const wished = isWishlisted(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
    setIsDrawerOpen(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-navy-900 rounded-3xl overflow-hidden border border-navy-800/50 hover:border-brand-500/30 transition-all duration-700 hover:shadow-card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-navy-950">
        <Link to={`/product/${product.id}`} className="block h-full">
          <img
            src={product.image}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out-expo ${isHovered && product.secondaryImage ? 'opacity-0 scale-110 blur-sm' : 'opacity-100 scale-100'}`}
          />
          {product.secondaryImage && (
            <img
              src={product.secondaryImage}
              alt={`${product.name} secondary`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out-expo ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
            />
          )}
          <div className={`absolute inset-0 bg-navy-950/20 group-hover:bg-navy-950/40 transition-colors duration-500`} />
        </Link>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
          {discount > 0 && (
            <span className="px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] bg-red-600 text-white rounded-lg shadow-lg">
              {discount}% OFF
            </span>
          )}
          {product.featured && (
            <span className="px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] bg-brand-500 text-navy-950 rounded-lg shadow-gold">
              Featured
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            toggle(product)
          }}
          className={`absolute top-4 right-4 p-3 rounded-2xl transition-all duration-500 transform ${wished
            ? 'bg-red-500 text-white shadow-lg'
            : 'bg-navy-950/50 backdrop-blur-md border border-white/5 text-white/50 hover:text-red-400 hover:border-red-400/30'
            }`}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Quick Add To Cart */}
        <div className={`absolute bottom-0 inset-x-0 p-5 transition-all duration-700 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
          <button
            onClick={handleAddToCart}
            className="w-full btn-primary !py-4 active:scale-95 flex items-center justify-center gap-3 group/btn"
            disabled={product.stock === 0}
          >
            <svg className="w-5 h-5 transition-transform group-hover/btn:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="uppercase text-xs font-black tracking-widest">
              {product.stock === 0 ? 'Out of Stock' : 'Add to Collection'}
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 bg-navy-900">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-black text-brand-500 uppercase tracking-widest font-display">
            {product.vendor}
          </span>
          <StarRating rating={product.rating} reviews={product.reviews} />
        </div>

        <Link to={`/product/${product.id}`} className="mb-4">
          <h3 className="font-bold text-white line-clamp-2 hover:text-brand-500 transition-colors text-lg tracking-tight leading-none font-display">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-4 flex items-end justify-between border-t border-navy-800">
          <div className="flex flex-col">
            <span className="text-xl font-black text-white leading-none font-display italic">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-500 line-through mt-1">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-brand-500 shadow-gold' : 'bg-red-500 shadow-red-500/50'}`} />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              {product.stock > 0 ? 'Available' : 'Limited'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
