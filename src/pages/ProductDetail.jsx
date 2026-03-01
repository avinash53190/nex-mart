import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { formatPrice, getDiscount, generateId } from '../utils/helpers'
import ProductCard from '../components/ProductCard'

const StarRating = ({ rating, size = 'md' }) => {
  const s = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} viewBox="0 0 20 20" className={`${s} ${i <= Math.round(rating) ? 'star-filled' : 'star-empty'}`} fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const { products, addReview, getProduct } = useProducts()
  const { addToCart, setIsDrawerOpen } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const { user } = useAuth()
  const product = getProduct(id)

  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [isZoomed, setIsZoomed] = useState(false)

  if (!product) return (
    <div className="text-center py-32 bg-navy-950 min-h-screen">
      <div className="text-6xl mb-6">😕</div>
      <h2 className="text-2xl font-bold text-white mb-4">Product not found</h2>
      <Link to="/shop" className="btn-primary inline-block">Back to Shop</Link>
    </div>
  )

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const discount = product.originalPrice ? getDiscount(product.originalPrice, product.price) : 0
  const wished = isWishlisted(product.id)

  const handleAddCart = () => {
    addToCart(product, qty)
    setIsDrawerOpen(true)
  }

  const submitReview = () => {
    if (!reviewText.trim()) return
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
  }

  const tabs = [
    { id: 'description', label: 'The Details' },
    { id: 'reviews', label: `Reviews (${product.reviews || 0})` },
    { id: 'shipping', label: 'Logistics' },
  ]

  return (
    <div className="bg-navy-950 min-h-screen">
      {/* Breadcrumb & Navigation */}
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
          {/* Left: Image Gallery with Hover Zoom */}
          <div className="space-y-6">
            <div
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-navy-900 border border-navy-800 group cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <motion.img
                src={product.image}
                alt={product.name}
                animate={{ scale: isZoomed ? 1.2 : 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-6 left-6 px-4 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg">
                  {discount}% Exclusive Reduction
                </div>
              )}
            </div>
            {/* Thumbnails (Simulated) */}
            <div className="grid grid-cols-4 gap-4">
              {[product.image, product.secondaryImage || product.image, product.image, product.image].map((img, i) => (
                <div key={i} className={`aspect-square rounded-2xl overflow-hidden bg-navy-900 border ${i === 0 ? 'border-brand-500' : 'border-navy-800'} cursor-pointer hover:border-brand-500/50 transition-colors`}>
                  <img src={img} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="text-brand-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
                {product.vendor} Essence
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display leading-[1.1]">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <StarRating rating={product.rating} size="lg" />
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest border-l border-navy-800 pl-4">
                  {product.rating} / 5.0 Distinction
                </span>
              </div>
            </div>

            <div className="mb-10 p-8 rounded-3xl bg-navy-900/50 border border-navy-800">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-5xl font-black text-white font-display italic tracking-tight italic">
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
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-navy-900 rounded-2xl border border-navy-800 p-1">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  >−</button>
                  <span className="w-12 text-center font-black text-white">{qty}</span>
                  <button
                    onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                    className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  >+</button>
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${product.stock > 0 ? 'bg-brand-500 shadow-gold' : 'bg-red-500'}`} />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {product.stock > 0 ? `In Stock • ${product.stock} Pieces Remaining` : 'Currently Private'}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddCart}
                  disabled={product.stock === 0}
                  className="btn-primary flex-1 !py-5 uppercase text-xs font-black tracking-[0.2em] shadow-gold-hover active:scale-95"
                >
                  Acquire Piece
                </button>
                <button
                  onClick={() => toggle(product)}
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

        {/* Tabbed Interface */}
        <div className="mb-32">
          <div className="flex justify-center border-b border-navy-900 mb-12">
            <div className="flex gap-12">
              {tabs.map(tab => (
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
                  <div className="space-y-12">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                      <div className="w-full md:w-1/3 p-8 rounded-[2rem] bg-navy-900 border border-navy-800 text-center">
                        <span className="text-6xl font-black text-white font-display italic italic">{product.rating}</span>
                        <div className="flex justify-center my-4">
                          <StarRating rating={product.rating} size="lg" />
                        </div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Global Master Rating</p>
                      </div>

                      <div className="flex-1 space-y-8">
                        {user ? (
                          <div className="space-y-4">
                            <h3 className="text-white font-bold uppercase tracking-widest text-xs">Post a Review</h3>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map(r => (
                                <button key={r} onClick={() => setReviewRating(r)} className={r <= reviewRating ? 'text-brand-500 text-xl' : 'text-navy-800 text-xl'}>★</button>
                              ))}
                            </div>
                            <textarea
                              value={reviewText}
                              onChange={e => setReviewText(e.target.value)}
                              placeholder="Your testimonial..."
                              className="input h-32"
                            />
                            <button onClick={submitReview} disabled={!reviewText.trim()} className="btn-secondary text-xs uppercase tracking-widest font-black">Submit Reflection</button>
                          </div>
                        ) : (
                          <div className="p-8 rounded-3xl bg-navy-900/30 border border-navy-800 border-dashed text-center">
                            <p className="text-slate-500 text-sm">Please sign in to share your experience with the world.</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-6 pt-12 border-t border-navy-900">
                      {(product.reviewList || []).map(r => (
                        <div key={r.id} className="p-8 rounded-3xl bg-navy-900/50 border border-navy-800 hover:border-brand-500/20 transition-all duration-500">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-navy-950 font-black text-xs">
                              {r.userName[0]}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-bold text-sm tracking-tight">{r.userName}</h4>
                              <StarRating rating={r.rating} />
                            </div>
                            <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Verified Collector</span>
                          </div>
                          <p className="text-slate-400 text-sm leading-relaxed font-medium">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
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

        {/* Related Products */}
        {related.length > 0 && (
          <div className="pt-24 border-t border-navy-900">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-brand-500 font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Complementary Selection</span>
                <h2 className="text-4xl font-bold text-white font-display italic">You May Also Appreciate.</h2>
              </div>
              <Link to="/shop" className="text-slate-500 font-black uppercase tracking-widest text-[10px] hover:text-brand-500 transition-colors border-b border-navy-800 pb-1">View Full Selection</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
