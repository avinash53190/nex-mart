import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../../../shared/utils/helpers'
import EmptyState from '../../../shared/components/EmptyState'
import ConfirmationDialog from '../../../shared/components/ConfirmationDialog'
import { useFeedbackActions } from '../../../shared/hooks/useFeedbackActions'
import { useState } from 'react'

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const feedback = useFeedbackActions()
  const [confirmClear, setConfirmClear] = useState(false)

  if (items.length === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-24 animate-fade-in">
      <EmptyState
        icon="🛒"
        title="Your cart is empty"
        description="Looks like you haven't added anything to your cart yet."
        actionLabel="Start Shopping"
        onAction={() => navigate('/shop')}
      />
    </div>
  )

  const tax = subtotal * 0.08
  const shipping = subtotal > 100 ? 0 : 9.99
  const total = subtotal + tax + shipping

  const handleClearCart = () => {
    clearCart()
    setConfirmClear(false)
    feedback.cartCleared()
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Shopping Cart</h1>
        <button onClick={() => setConfirmClear(true)} className="text-sm text-red-500 hover:text-red-600 font-medium">Clear all</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="card p-5 flex gap-4 animate-slide-up">
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link to={`/product/${item.id}`} className="font-semibold text-slate-800 dark:text-slate-100 hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
                      {item.name}
                    </Link>
                    <p className="text-xs text-brand-600 mt-0.5">{item.vendor}</p>
                  </div>
                  <button
                    onClick={() => {
                      removeFromCart(item.id)
                      feedback.cartRemoved(item)
                    }}
                    className="text-slate-300 hover:text-red-500 transition-colors shrink-0"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-sm transition-colors">−</button>
                    <span className="px-3 py-1.5 text-sm font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-sm transition-colors">+</button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900 dark:text-white">{formatPrice(item.price * item.quantity)}</p>
                    {item.quantity > 1 && <p className="text-xs text-slate-400">{formatPrice(item.price)} each</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-6 h-fit sticky top-24">
          <h2 className="font-bold text-lg mb-5 text-slate-900 dark:text-white">Order Summary</h2>
          <div className="space-y-3 mb-5">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal ({items.length} items)</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Shipping</span>
              <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                {shipping === 0 ? 'FREE' : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Tax (8%)</span>
              <span className="font-medium">{formatPrice(tax)}</span>
            </div>
            {shipping === 0 && (
              <p className="text-xs text-green-600 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">🎉 You qualify for free shipping!</p>
            )}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between">
              <span className="font-bold text-slate-900 dark:text-white">Total</span>
              <span className="font-bold text-lg text-slate-900 dark:text-white">{formatPrice(total)}</span>
            </div>
          </div>
          <Link to="/checkout" className="btn-primary w-full text-center block py-3">
            Proceed to Checkout →
          </Link>
          <Link to="/shop" className="btn-secondary w-full text-center block mt-3 py-2.5">
            Continue Shopping
          </Link>
        </div>
      </div>

      <ConfirmationDialog
        open={confirmClear}
        title="Clear your cart?"
        description="This will remove every item from your cart."
        confirmLabel="Clear Cart"
        onConfirm={handleClearCart}
        onCancel={() => setConfirmClear(false)}
      />
    </div>
  )
}
