import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../../products/context/ProductContext'
import { categories } from '../../products/data/defaultProducts'
import { formatPrice } from '../../../shared/utils/helpers'

export default function AddProduct() {
  const { addProduct } = useProducts()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', price: '', originalPrice: '', category: categories[0],
    vendor: '', image: '', description: '', stock: '10', featured: false,
    tags: '',
  })
  const [saved, setSaved] = useState(false)

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const product = {
      ...form,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
      stock: parseInt(form.stock),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    }
    addProduct(product)
    setSaved(true)
    setTimeout(() => { setSaved(false); navigate('/admin') }, 1500)
  }

  const field = (key, label, placeholder, type = 'text', required = true) => (
    <div>
      <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type} placeholder={placeholder} value={form[key]}
        onChange={e => set(key, e.target.value)}
        required={required}
        className="input"
      />
    </div>
  )

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Add New Product</h1>
          <p className="text-slate-400 text-sm mt-0.5">Fill in the product details below</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-xl text-sm font-medium">
            ✓ Product added! Redirecting...
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="card p-6">
              <h2 className="font-semibold mb-4 text-slate-700 dark:text-slate-200">Basic Information</h2>
              <div className="space-y-4">
                {field('name', 'Product Name', 'e.g. Premium Wireless Headphones')}
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">Description <span className="text-red-400">*</span></label>
                  <textarea
                    value={form.description} onChange={e => set('description', e.target.value)}
                    placeholder="Describe the product in detail..."
                    required className="input h-32 resize-none"
                  />
                </div>
                {field('vendor', 'Vendor / Store Name', 'e.g. TechStore Pro')}
                {field('tags', 'Tags (comma-separated)', 'e.g. wireless, premium, audio', 'text', false)}
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-semibold mb-4 text-slate-700 dark:text-slate-200">Pricing & Inventory</h2>
              <div className="grid grid-cols-2 gap-4">
                {field('price', 'Sale Price', '199.99', 'number')}
                {field('originalPrice', 'Original Price', '249.99 (optional)', 'number', false)}
                {field('stock', 'Stock Quantity', '10', 'number')}
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">Category <span className="text-red-400">*</span></label>
                  <select value={form.category} onChange={e => set('category', e.target.value)} className="input">
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-semibold mb-4 text-slate-700 dark:text-slate-200">Media</h2>
              {field('image', 'Image URL', 'https://images.unsplash.com/...')}
              {form.image && (
                <div className="mt-3">
                  <p className="text-xs text-slate-400 mb-2">Preview:</p>
                  <img src={form.image} alt="preview" className="w-32 h-32 object-cover rounded-xl bg-slate-100"
                    onError={e => e.target.style.display = 'none'} />
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="card p-5 sticky top-24">
              <h2 className="font-semibold mb-4 text-slate-700 dark:text-slate-200">Preview</h2>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-xl h-40 overflow-hidden mb-3">
                {form.image ? (
                  <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">No image</div>
                )}
              </div>
              <p className="text-xs text-brand-600 font-semibold">{form.vendor || 'Vendor Name'}</p>
              <p className="font-semibold text-sm mt-1 text-slate-800 dark:text-slate-100 line-clamp-2">{form.name || 'Product Name'}</p>
              {form.price && <p className="text-lg font-bold text-slate-900 dark:text-white mt-2">{formatPrice(parseFloat(form.price))}</p>}

              <div className="mt-4 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="w-4 h-4 accent-brand-600" />
                  <span className="text-sm font-medium">Mark as Featured</span>
                </label>
              </div>

              <button type="submit" className="btn-primary w-full mt-5">
                Add Product →
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
