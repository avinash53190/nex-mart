import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/helpers'

const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
)

const TrashIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
)

export default function CartDrawer() {
    const {
        items,
        isDrawerOpen,
        setIsDrawerOpen,
        removeFromCart,
        updateQuantity,
        subtotal,
        tax,
        shipping,
        total
    } = useCart()

    return (
        <AnimatePresence>
            {isDrawerOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsDrawerOpen(false)}
                        className="fixed inset-0 z-[60] bg-navy-950/60 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-navy-950 shadow-2xl border-l border-navy-800 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-navy-900 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white">Your Selection</h2>
                                <p className="text-xs text-brand-500 font-bold uppercase tracking-widest mt-1">Luxury Collection</p>
                            </div>
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="p-2 rounded-xl hover:bg-navy-900 text-slate-400 hover:text-white transition-colors"
                            >
                                <XIcon />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 bg-navy-900 rounded-full flex items-center justify-center text-navy-800">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10">
                                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Your cart is empty</h3>
                                        <p className="text-sm text-slate-500 mt-1">Discover our exclusive products and start shopping.</p>
                                    </div>
                                    <button
                                        onClick={() => setIsDrawerOpen(false)}
                                        className="btn-primary !px-8"
                                    >
                                        Go to Shop
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="w-24 h-32 rounded-xl overflow-hidden bg-navy-900 border border-navy-800 shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex justify-between">
                                                <h4 className="font-bold text-white text-sm line-clamp-1">{item.name}</h4>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-slate-600 hover:text-red-500 transition-colors"
                                                >
                                                    <TrashIcon />
                                                </button>
                                            </div>
                                            <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center bg-navy-900 rounded-lg border border-navy-800">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="px-2 py-1 text-slate-400 hover:text-white"
                                                    >−</button>
                                                    <span className="px-2 py-1 text-xs font-bold text-white min-w-[2rem] text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-2 py-1 text-slate-400 hover:text-white"
                                                    >+</button>
                                                </div>
                                                <span className="font-bold text-brand-500">{formatPrice(item.price)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer / Summary */}
                        {items.length > 0 && (
                            <div className="p-6 bg-navy-900/50 border-t border-navy-900 space-y-4">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-slate-400">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400">
                                        <span>Tax (8%)</span>
                                        <span>{formatPrice(tax)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-black text-white pt-2 border-t border-navy-800 mt-2">
                                        <span>Total</span>
                                        <span className="text-brand-500">{formatPrice(total)}</span>
                                    </div>
                                </div>

                                <Link
                                    to="/checkout"
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="btn-primary w-full text-center block !py-4 shadow-gold hover:shadow-gold-hover animate-pulse-slow"
                                >
                                    Proceed to Checkout
                                </Link>
                                <button
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="w-full text-center text-xs font-bold text-slate-500 hover:text-white transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
