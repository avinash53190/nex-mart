import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../../../features/cart/context/CartContext'
import { useWishlist } from '../../../features/wishlist/context/WishlistContext'
import { useAuth } from '../../../features/auth/context/AuthContext'
import { formatPrice, getDiscount, generateId } from '../../../shared/utils/helpers'
import { useAsyncState } from '../../../shared/hooks/useAsyncState'
import ErrorState from '../../../shared/components/ErrorState'
import EmptyState from '../../../shared/components/EmptyState'
import LoadingButton from '../../../shared/components/LoadingButton'
import ProductDetailSkeleton from '../components/ProductDetailSkeleton'
import ProductImageGallery from '../components/ProductImageGallery'
import ProductQuantityControl from '../components/ProductQuantityControl'
import ProductReviews from '../components/ProductReviews'
import RelatedProducts from '../components/RelatedProducts'
import { clampQuantity, getRelatedProducts, getReviewStats } from '../services/productDetailService'
import { useFeedbackActions } from '../../../shared/hooks/useFeedbackActions'

const tabs = [
  { id: 'description', label: 'The Details' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'shipping', label: 'Logistics' },
]

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, addReview, getProduct, status, error } = useProducts()
  const { addToCart, setIsDrawerOpen } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const { user } = useAuth()
  const feedback = useFeedbackActions()
  const cartAsync = useAsyncState('idle')

  const product = getProduct(id)

  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(5)

  useEffect(() => {
    setQty(clampQuantity(1, product?.stock))
  }, [product?.stock, id])

  const relatedProducts = useMemo(
    () => (product ? getRelatedProducts(products, product) : []),
    [products, product]
  )
  const reviewStats = useMemo(() => (product ? getReviewStats(product) : { average: 0, count: 0, reviews: [] }), [product])
  const discount = product?.originalPrice ? getDiscount(product.originalPrice, product.price) : 0
  const wished = product ? isWishlisted(product.id) : false

  const handleAddCart = useCallback(async () => {
    if (!product || product.stock === 0) return
    cartAsync.start()
    addToCart(product, qty)
    setIsDrawerOpen(true)
    feedback.cartAdded(product, qty)
    await new Promise((resolve) => window.setTimeout(resolve, 250))
    cartAsync.succeed()
  }, [addToCart, cartAsync, feedback, product, qty, setIsDrawerOpen])

  const submitReview = useCallback(() => {
    if (!product || !reviewText.trim()) return

    addReview(product.id, {
      id: generateId(),
      userId: user?.id || 'guest',
      userName: user?.name || 'Anonymous',
      rating: reviewRating,
      text: reviewText,
      date: new Date().toISOString(),
    })
    setReviewText('')
    setReviewRating(5)
    feedback.reviewSubmitted(product)
  }, [addReview, feedback, product, reviewRating, reviewText, user])

  if (status === 'loading' && !product) {
    return <ProductDetailSkeleton />
  }

  if (status === 'error' && !product) {
    return (
      <ErrorState
        title="Could not load this product"
        message={error || 'Please try again or return to the shop.'}
        retryLabel="Retry"
        onRetry={() => window.location.reload()}
      />
    )
  }

  if (!product) {
    return (
      <EmptyState
        icon="😕"
        title="Product not found"
        description="The product you requested is unavailable or was removed."
        actionLabel="Back to Shop"
        onAction={() => navigate('/shop')}
      />
    )
  }

  return (
    <div className="bg-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          <Link to="/" className="hover:text-brand-500 transition-colors">House</Link>
          <span className="opacity-30">/</span>
          <Link to="/shop" className="hover:text-brand-500 transition-colors">Boutique</Link>
          <span className="opacity-30">/</span>
          <span className="text-brand-500">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 mb-32">
          <div className="space-y-6">
            <ProductImageGallery product={product} />

            {discount > 0 && (
              <div className="px-4 py-2 inline-flex bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg">
                {discount}% Exclusive Reduction
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="mb-8">
              <span className="text-brand-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
                {product.vendor} Essence
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display leading-[1.1]">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      viewBox="0 0 20 20"
                      className={`w-5 h-5 ${star <= Math.round(product.rating) ? 'star-filled' : 'star-empty'}`}
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest border-l border-navy-800 pl-4">
                  {product.rating} / 5.0 Distinction
                </span>
              </div>
            </div>

            <div className="mb-10 p-8 rounded-3xl bg-navy-900/50 border border-navy-800">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-5xl font-black text-white font-display italic tracking-tight">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-slate-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-slate-400 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            <div className="space-y-8">
              <ProductQuantityControl value={qty} stock={product.stock} onChange={setQty} />

              <div className="flex gap-4">
                <LoadingButton
                  onClick={handleAddCart}
                  loading={cartAsync.status === 'loading'}
                  disabled={product.stock === 0}
                  className="btn-primary flex-1 !py-5 uppercase text-xs font-black tracking-[0.2em] shadow-gold-hover active:scale-95"
                >
                  Acquire Piece
                </LoadingButton>
                <button
                  onClick={() => {
                    const wasWishlisted = wished
                    toggle(product)
                    if (wasWishlisted) feedback.wishlistRemoved(product)
                    else feedback.wishlistAdded(product)
                  }}
                  className={`p-5 rounded-2xl border transition-all duration-500 ${wished ? 'bg-red-500 border-red-500 text-white shadow-lg' : 'bg-navy-900 border-navy-800 text-slate-500 hover:text-red-400 hover:border-red-400/30'}`}
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-navy-900 grid grid-cols-2 gap-8">
              <div>
                <span className="block text-[10px] font-black text-brand-500 uppercase tracking-widest mb-2">Provenance</span>
                <p className="text-xs text-slate-400 font-medium">Handcrafted in {product.tags?.includes('tech') ? 'California' : 'Milan'}, 2026 Edition</p>
              </div>
              <div>
                <span className="block text-[10px] font-black text-brand-500 uppercase tracking-widest mb-2">Composition</span>
                <p className="text-xs text-slate-400 font-medium">Premium Materials • Ethically Sourced</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-32">
          <div className="flex justify-center border-b border-navy-900 mb-12">
            <div className="flex gap-12">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative py-6 text-sm font-black uppercase tracking-[0.2em] transition-colors ${activeTab === tab.id ? 'text-brand-500' : 'text-slate-500 hover:text-white'}`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-brand-500 shadow-gold"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {activeTab === 'description' && (
                  <div className="space-y-8">
                    <div className="prose prose-invert max-w-none">
                      <p className="text-lg text-slate-300 leading-relaxed font-display italic">
                        "Experience the zenith of design with the {product.name}. A testament to our commitment to everlasting beauty and uncompromising quality."
                      </p>
                      <div className="grid md:grid-cols-2 gap-12 mt-12">
                        <div className="space-y-4 font-medium text-slate-400">
                          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Exquisite Details</h4>
                          <p>Every curve and every stitch is a result of hundreds of hours of refinement, ensuring that this piece doesn't just meet expectations—it redefines them.</p>
                        </div>
                        <div className="space-y-4 font-medium text-slate-400">
                          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Technical Mastery</h4>
                          <p>Utilizing proprietary construction methods and rare materials, we've created a product that is as durable as it is beautiful.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <ProductReviews
                    averageRating={reviewStats.average}
                    reviewCount={reviewStats.count}
                    reviews={reviewStats.reviews}
                    isAuthenticated={Boolean(user)}
                    rating={reviewRating}
                    setRating={setReviewRating}
                    reviewText={reviewText}
                    setReviewText={setReviewText}
                    onSubmit={submitReview}
                    submitting={false}
                  />
                )}

                {activeTab === 'shipping' && (
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="p-10 rounded-[2rem] bg-navy-900 border border-navy-800 space-y-4">
                      <div className="text-3xl mb-4 text-brand-500 italic">Global Logistics</div>
                      <p className="text-slate-400 font-medium">We offer white-glove delivery to over 150 countries. Every piece is insured for its full value and handled by our specialist logistics partners.</p>
                      <ul className="space-y-2 text-xs text-slate-500 font-bold uppercase tracking-widest pt-4">
                        <li>• International: 3-5 Working Days</li>
                        <li>• Domestic: Next Day Priority</li>
                        <li>• Concierge Handling Included</li>
                      </ul>
                    </div>
                    <div className="p-10 rounded-[2rem] bg-navy-900 border border-navy-800 space-y-4">
                      <div className="text-3xl mb-4 text-brand-500 italic">Signature Returns</div>
                      <p className="text-slate-400 font-medium">Your satisfaction is absolute. We offer 30-day complimentary collection for any item, provided it remains in pristine condition.</p>
                      <ul className="space-y-2 text-xs text-slate-500 font-bold uppercase tracking-widest pt-4">
                        <li>• Complimentary Pickup Service</li>
                        <li>• Quality Authentication Refund</li>
                        <li>• Multi-Currency Reimbursement</li>
                      </ul>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  )
}
