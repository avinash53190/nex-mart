import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import FilterSidebar from '../components/FilterSidebar'
import SortBar from '../components/SortBar'
import ProductGrid from '../components/ProductGrid'

export default function Shop() {
  const { products } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()

  // State
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [sort, setSort] = useState('newest')

  // Initial load simulation
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  // Sync with URL params on initial load
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam && categoryParam !== 'All') {
      setSelectedCategories([categoryParam])
    }
  }, [searchParams])

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Search filter
    if (search) {
      const query = search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.vendor.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      )
    }

    // Category filter (Multi-select)
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category))
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sorting
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
      default:
        result.sort((a, b) => b.id.localeCompare(a.id))
        break
    }

    return result
  }, [products, search, selectedCategories, priceRange, sort])

  // Handlers
  const handleResetFilters = useCallback(() => {
    setSearch('')
    setSelectedCategories([])
    setPriceRange([0, 3000])
    setSort('newest')
    setSearchParams({})
  }, [setSearchParams])

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            Explore Nex-Mart
          </h1>
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <p className="text-sm font-medium">Discover {products.length} premium products selected for you</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar */}
          <FilterSidebar
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onReset={handleResetFilters}
          />

          {/* Main Content */}
          <main className="flex-1">
            <SortBar
              totalResults={filteredProducts.length}
              sort={sort}
              setSort={setSort}
              search={search}
              setSearch={setSearch}
            />

            <ProductGrid
              products={filteredProducts}
              loading={loading}
            />
          </main>
        </div>
      </div>
    </div>
  )
}
