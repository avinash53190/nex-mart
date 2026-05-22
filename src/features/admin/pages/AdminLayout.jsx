import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/add-product', label: 'Add Product', icon: '➕' },
]

export default function AdminLayout() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
      isActive
        ? 'bg-brand-600 text-white shadow-brand'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex gap-8">
        <aside className="w-60 shrink-0">
          <div className="card p-4 sticky top-24">
            <div className="flex items-center gap-2 px-4 py-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div>
                <p className="font-bold text-sm">Admin Panel</p>
                <p className="text-xs text-slate-400">NexMart</p>
              </div>
            </div>
            <nav className="space-y-1">
              {navItems.map(item => (
                <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
                  <span>{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
