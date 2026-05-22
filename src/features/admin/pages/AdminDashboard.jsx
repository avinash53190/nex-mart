import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../../products/context/ProductContext'
import { useOrders } from '../../orders/context/OrderContext'
import StatCard from '../components/StatCard'
import { formatPrice, formatDate } from '../../../shared/utils/helpers'

export default function AdminDashboard() {
  const { products, deleteProduct } = useProducts()
  const { orders } = useOrders()
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState(null)

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  )

  const confirmDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      setDeleting(id)
      setTimeout(() => { deleteProduct(id); setDeleting(null) }, 400)
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-0.5">Welcome back, Admin</p>
        </div>
        <Link to="/admin/add-product" className="btn-primary">+ Add Product</Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="📦" label="Total Products" value={products.length} sub={`${products.filter(p => p.stock > 0).length} in stock`} color="bg-blue-50 dark:bg-blue-900/20" />
        <StatCard icon="🛒" label="Total Orders" value={orders.length} sub="All time" color="bg-green-50 dark:bg-green-900/20" />
        <StatCard icon="💰" label="Revenue" value={formatPrice(totalRevenue)} sub="All time" color="bg-brand-50 dark:bg-brand-900/20" />
        <StatCard icon="🏪" label="Vendors" value="9" sub="Active" color="bg-purple-50 dark:bg-purple-900/20" />
      </div>

      {orders.length > 0 && (
        <div className="card p-6 mb-6">
          <h2 className="font-bold text-lg mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="text-left pb-3 text-slate-400 font-medium">Order ID</th>
                  <th className="text-left pb-3 text-slate-400 font-medium">Date</th>
                  <th className="text-left pb-3 text-slate-400 font-medium">Items</th>
                  <th className="text-right pb-3 text-slate-400 font-medium">Total</th>
                  <th className="text-right pb-3 text-slate-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {orders.slice(0, 5).map(order => (
                  <tr key={order.id}>
                    <td className="py-3 font-mono text-xs text-slate-600 dark:text-slate-300">#{order.id.toUpperCase()}</td>
                    <td className="py-3 text-slate-500">{formatDate(order.createdAt)}</td>
                    <td className="py-3 text-slate-500">{order.items.length} items</td>
                    <td className="py-3 text-right font-semibold">{formatPrice(order.total)}</td>
                    <td className="py-3 text-right">
                      <span className="badge bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">Confirmed</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Product Inventory</h2>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="input w-56 text-sm py-2" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="text-left pb-3 text-slate-400 font-medium">Product</th>
                <th className="text-left pb-3 text-slate-400 font-medium">Category</th>
                <th className="text-right pb-3 text-slate-400 font-medium">Price</th>
                <th className="text-right pb-3 text-slate-400 font-medium">Stock</th>
                <th className="text-right pb-3 text-slate-400 font-medium">Rating</th>
                <th className="text-right pb-3 text-slate-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {filteredProducts.map(p => (
                <tr key={p.id} className={deleting === p.id ? 'opacity-0 transition-opacity' : 'transition-opacity'}>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0" />
                      <span className="font-medium line-clamp-1">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-slate-500">{p.category}</td>
                  <td className="py-3 text-right font-semibold">{formatPrice(p.price)}</td>
                  <td className="py-3 text-right">
                    <span className={`badge ${p.stock > 5 ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' : p.stock > 0 ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400' : 'bg-red-100 text-red-600'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="py-3 text-right text-slate-500">⭐ {p.rating}</td>
                  <td className="py-3 text-right">
                    <button onClick={() => confirmDelete(p.id)} className="text-xs text-red-500 hover:text-red-600 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 px-2 py-1 rounded-lg transition-all">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
