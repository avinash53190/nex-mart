import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../../../features/wishlist/context/WishlistContext'
import { useOrders } from '../../../features/orders/context/OrderContext'
import { useCart } from '../../../features/cart/context/CartContext'
import { formatPrice, formatDate } from '../../../shared/utils/helpers'
import { useFeedbackActions } from '../../../shared/hooks/useFeedbackActions'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const { items: wishlist, toggle } = useWishlist()
  const { getUserOrders } = useOrders()
  const { addToCart } = useCart()
  const feedback = useFeedbackActions()
  const [tab, setTab] = useState('profile')
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user.name, email: user.email })
  const [saved, setSaved] = useState(false)

  const orders = getUserOrders(user.id)

  const saveProfile = () => {
    updateProfile(form)
    setEditing(false)
    setSaved(true)
    feedback.notifySuccess('Profile updated')
    setTimeout(() => setSaved(false), 2000)
  }

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'wishlist', label: `Wishlist (${wishlist.length})` },
    { id: 'orders', label: `Orders (${orders.length})` },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-bold text-2xl">
          {user.name[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{user.name}</h1>
          <p className="text-slate-500">{user.email} · <span className="badge bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300">{user.role}</span></p>
        </div>
      </div>

      <div className="flex gap-1 mb-6 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.id ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <div className="card p-6 max-w-lg animate-fade-in">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-lg">Profile Information</h2>
            {saved && <span className="text-green-600 text-sm font-medium">✓ Saved!</span>}
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">Full Name</label>
              <input
                value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                disabled={!editing} className="input disabled:opacity-70 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">Email</label>
              <input
                value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                disabled={!editing} className="input disabled:opacity-70 disabled:cursor-not-allowed" type="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">Member Since</label>
              <input value={formatDate(user.createdAt)} disabled className="input opacity-60 cursor-not-allowed" />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            {editing ? (
              <>
                <button onClick={saveProfile} className="btn-primary">Save Changes</button>
                <button onClick={() => setEditing(false)} className="btn-secondary">Cancel</button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} className="btn-primary">Edit Profile</button>
            )}
          </div>
        </div>
      )}

      {tab === 'wishlist' && (
        <div className="animate-fade-in">
          {wishlist.length === 0 ? (
            <div className="text-center py-16 card">
              <div className="text-5xl mb-4">💝</div>
              <h3 className="font-semibold text-lg mb-2">Your wishlist is empty</h3>
              <p className="text-slate-400 mb-4">Save items you love for later</p>
              <Link to="/shop" className="btn-primary inline-block">Browse Products</Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {wishlist.map(item => (
                <div key={item.id} className="card p-4 flex gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-slate-100" />
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`} className="font-semibold text-sm hover:text-brand-600 line-clamp-2 leading-snug">
                      {item.name}
                    </Link>
                    <p className="text-brand-600 font-bold mt-1">{formatPrice(item.price)}</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => {
                          addToCart(item)
                          feedback.cartAdded(item)
                        }}
                        className="btn-primary text-xs py-1.5 px-3"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => {
                          toggle(item)
                          feedback.wishlistRemoved(item)
                        }}
                        className="btn-secondary text-xs py-1.5 px-3"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'orders' && (
        <div className="animate-fade-in">
          {orders.length === 0 ? (
            <div className="text-center py-16 card">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="font-semibold text-lg mb-2">No orders yet</h3>
              <Link to="/shop" className="btn-primary inline-block mt-2">Start Shopping</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-sm text-slate-900 dark:text-white">Order #{order.id.toUpperCase()}</p>
                      <p className="text-xs text-slate-400">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <span className="badge bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">✓ Confirmed</span>
                      <p className="font-bold text-brand-600 mt-1">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {order.items.map(i => (
                      <img key={i.id} src={i.image} alt={i.name} className="w-12 h-12 rounded-lg object-cover shrink-0 bg-slate-100" title={i.name} />
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{order.items.length} item(s) · {order.items.reduce((s, i) => s + i.quantity, 0)} units</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
