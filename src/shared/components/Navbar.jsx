import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../features/auth/context/AuthContext'
import { useCart } from '../../features/cart/context/CartContext'
import { useFeedbackActions } from '../hooks/useFeedbackActions'

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth()
  const { itemCount, setIsDrawerOpen } = useCart()
  const navigate = useNavigate()
  const feedback = useFeedbackActions()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    ...(isAdmin ? [{ name: 'Dashboard', path: '/admin' }] : []),
  ]

  return (
    <header className="sticky top-0 z-50 glass border-b border-navy-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-gold transition-transform duration-500 group-hover:rotate-12">
            <span className="text-navy-950 font-black text-xl italic">N</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-white leading-none">NexMart</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-500 font-bold">Premium Store</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `relative py-2 text-sm font-bold tracking-wide transition-colors duration-300 ${isActive ? 'text-brand-500' : 'text-slate-400 hover:text-white'}`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full shadow-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="group relative p-3 rounded-xl bg-navy-900 border border-navy-800 text-slate-400 hover:text-brand-400 hover:border-brand-500/30 transition-all duration-300"
          >
            <CartIcon />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-500 text-navy-950 text-[10px] font-black rounded-lg flex items-center justify-center shadow-gold">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </button>

          {user && (
            <Link to="/wishlist" className="p-3 rounded-xl bg-navy-900 border border-navy-800 text-slate-400 hover:text-brand-400 hover:border-brand-500/30 transition-all duration-300">
              <HeartIcon />
            </Link>
          )}

          <div className="w-[1px] h-8 bg-navy-800 mx-1 hidden sm:block" />

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="hidden sm:flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-xl bg-navy-900/50 border border-navy-800 hover:border-brand-500/30 transition-all duration-300">
                <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-navy-950 text-xs font-black shadow-gold">
                  {user.name[0].toUpperCase()}
                </div>
                <span className="text-sm font-bold text-slate-200">{user.name.split(' ')[0]}</span>
              </Link>
              <button onClick={() => { logout(); feedback.authLogoutSuccess(); navigate('/') }} className="btn-secondary !py-2 !px-4 text-xs font-black uppercase tracking-wider">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Login</Link>
              <Link to="/register" className="btn-primary !py-2.5 !px-5 text-xs font-black uppercase tracking-wider">Join Now</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
