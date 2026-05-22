import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { categories } from '../data/defaultProducts'
import ProductCard from '../components/ProductCard'

const categoryColors = {
  Electronics: { bg: 'from-blue-500 to-cyan-500', light: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400' },
  Fashion: { bg: 'from-pink-500 to-rose-500', light: 'bg-pink-50 dark:bg-pink-900/20', text: 'text-pink-600 dark:text-pink-400' },
  'Home & Office': { bg: 'from-amber-500 to-orange-500', light: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400' },
  Kitchen: { bg: 'from-green-500 to-emerald-500', light: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400' },
  Sports: { bg: 'from-purple-500 to-violet-500', light: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400' },
}

const categoryIcons = {
  Electronics: '⚡', Fashion: '👗', 'Home & Office': '🏠', Kitchen: '☕', Sports: '🏃',
}

export default function Categories() {
  const { products } = useProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Browse Categories</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Explore our curated product categories</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
        {categories.map(cat => {
          const colors = categoryColors[cat]
          const count = products.filter(p => p.category === cat).length
          return (
            <Link
              key={cat}
              to={`/shop?category=${cat}`}
              className={`${colors.light} border border-transparent hover:border-current ${colors.text} rounded-2xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg group`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                {categoryIcons[cat]}
              </div>
              <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{cat}</p>
              <p className="text-xs mt-1 text-slate-500 dark:text-slate-400">{count} products</p>
            </Link>
          )
        })}
      </div>

      {categories.map(cat => {
        const catProducts = products.filter(p => p.category === cat)
        if (catProducts.length === 0) return null
        return (
          <div key={cat} className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{categoryIcons[cat]}</span>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{cat}</h2>
                  <p className="text-sm text-slate-400">{catProducts.length} products</p>
                </div>
              </div>
              <Link to={`/shop?category=${cat}`} className="text-brand-600 text-sm font-semibold hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {catProducts.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
