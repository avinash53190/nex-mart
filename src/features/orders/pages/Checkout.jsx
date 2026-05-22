import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../../../features/cart/context/CartContext'
import { useOrders } from '../context/OrderContext'
import { useAuth } from '../../../features/auth/context/AuthContext'
import { formatPrice } from '../../../shared/utils/helpers'
import { COUPONS } from '../../../shared/services/constants'
import LoadingButton from '../../../shared/components/LoadingButton'
import EmptyState from '../../../shared/components/EmptyState'
import InlineStatusIndicator from '../../../shared/components/InlineStatusIndicator'
import { useAsyncState } from '../../../shared/hooks/useAsyncState'
import { useFeedbackActions } from '../../../shared/hooks/useFeedbackActions'

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const { placeOrder } = useOrders()
  const { user } = useAuth()
  const navigate = useNavigate()
  const feedback = useFeedbackActions()

  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '',
    address: '', city: '', zip: '', country: 'US',
    cardNumber: '', expiry: '', cvv: '', cardName: '',
  })
  const [coupon, setCoupon] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')
  const asyncState = useAsyncState()
  const [success, setSuccess] = useState(false)

  if (items.length === 0 && !success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24">
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          description="Looks like there are no items ready for checkout yet."
          actionLabel="Go Shopping"
          onAction={() => navigate('/shop')}
          className="bg-transparent border-navy-800"
        />
      </div>
    )
  }

  const tax = subtotal * 0.08
  const shipping = subtotal > 100 ? 0 : 9.99
  const discount = appliedCoupon ? subtotal * appliedCoupon.rate : 0
  const total = subtotal + tax + shipping - discount

  const applyCoupon = () => {
    const rate = COUPONS[coupon.toUpperCase()]
    if (rate) {
      setAppliedCoupon({ code: coupon.toUpperCase(), rate })
      setCouponError('')
      feedback.notifySuccess(`Coupon ${coupon.toUpperCase()} applied`)
    } else {
      setCouponError('Invalid coupon code')
      setAppliedCoupon(null)
      feedback.notifyWarning('Invalid coupon code')
    }
  }

  const handlePay = async () => {
    const required = ['name', 'email', 'address', 'city', 'zip', 'cardNumber', 'expiry', 'cvv', 'cardName']
    if (required.some((f) => !form[f])) {
      const message = 'Please fill all required fields'
      asyncState.fail(message)
      feedback.notifyError(message)
      return
    }
    asyncState.start()
    await new Promise(r => setTimeout(r, 2000))
    const order = placeOrder(items, total, form, discount)
    clearCart()
    asyncState.succeed()
    setSuccess(true)
    feedback.checkoutSuccess(order)
  }

  if (success) return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center animate-bounce-in">
      <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Order Confirmed! 🎉</h2>
      <p className="text-slate-500 mb-2">Thank you for your purchase, {user?.name?.split(' ')[0]}!</p>
      <p className="text-slate-400 text-sm mb-8">A confirmation has been sent to {form.email}</p>
      <div className="card p-5 mb-8 text-left">
        <p className="text-sm text-slate-500 mb-1">Order Total</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatPrice(total)}</p>
      </div>
      <div className="flex gap-3 justify-center">
        <Link to="/orders" className="btn-primary px-8">View Orders</Link>
        <Link to="/shop" className="btn-secondary px-8">Continue Shopping</Link>
      </div>
    </div>
  )

  const field = (name, label, placeholder, type = 'text') => (
    <div>
      <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">{label} <span className="text-red-400">*</span></label>
      <input
        type={type} placeholder={placeholder} value={form[name]}
        onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
        className="input"
      />
    </div>
  )

  return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Checkout</h1>
        <InlineStatusIndicator type="error" message={asyncState.error} className="mb-6" />

        <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="font-bold text-lg mb-5 flex items-center gap-2"><span>📦</span> Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              {field('name', 'Full Name', 'John Doe')}
              {field('email', 'Email', 'john@example.com', 'email')}
              <div className="col-span-2">{field('address', 'Street Address', '123 Main St')}</div>
              {field('city', 'City', 'New York')}
              {field('zip', 'ZIP Code', '10001')}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-bold text-lg mb-5 flex items-center gap-2"><span>💳</span> Payment Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">{field('cardNumber', 'Card Number', '4242 4242 4242 4242')}</div>
              {field('cardName', 'Cardholder Name', 'John Doe')}
              {field('expiry', 'Expiry Date', 'MM/YY')}
              <div className="col-span-1">{field('cvv', 'CVV', '123')}</div>
            </div>
            <p className="text-xs text-slate-400 mt-4 flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              This is a demo — no real payment will be processed
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <h2 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Order Summary</h2>
            <div className="space-y-3 mb-4 max-h-52 overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold shrink-0">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mb-4">
              <p className="text-sm font-medium mb-2">Coupon Code</p>
              <div className="flex gap-2">
                <input
                  value={coupon} onChange={e => setCoupon(e.target.value)}
                  placeholder="e.g. NEXMART10"
                  className="input text-sm py-2"
                />
                <button onClick={applyCoupon} className="btn-secondary text-sm py-2 px-3 shrink-0">Apply</button>
              </div>
              <InlineStatusIndicator type="error" message={couponError} className="mt-1" />
              {appliedCoupon && <InlineStatusIndicator type="success" message={`✓ ${appliedCoupon.code} applied — ${appliedCoupon.rate * 100}% off!`} className="mt-1" />}
              <p className="text-xs text-slate-400 mt-1">Try: NEXMART10, SAVE20, WELCOME15</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>−{formatPrice(discount)}</span></div>}
              <div className="flex justify-between"><span className="text-slate-500">Shipping</span><span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Tax</span><span>{formatPrice(tax)}</span></div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

           <LoadingButton onClick={handlePay} loading={asyncState.isLoading} className="btn-primary w-full py-4 text-base relative">
             Pay {formatPrice(total)}
           </LoadingButton>
        </div>
      </div>
    </div>
  )
}
