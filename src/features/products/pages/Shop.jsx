import FilterSidebar from '../components/FilterSidebar'
import SortBar from '../components/SortBar'
import ProductGrid from '../components/ProductGrid'
import { useProducts } from '../context/ProductContext'
import ErrorState from '../../../shared/components/ErrorState'
import { useProductDiscovery } from '../hooks/useProductDiscovery'

export default function Shop() {
  const { products, status, error, refreshProducts } = useProducts()
  const discovery = useProductDiscovery(products)

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <ErrorState
          title="Oops! Something went wrong"
          message={error}
          onRetry={refreshProducts}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <FilterSidebar
            selectedCategories={discovery.selectedCategories}
            setSelectedCategories={discovery.setSelectedCategories}
            priceRange={discovery.priceRange}
            setPriceRange={discovery.setPriceRange}
            minRating={discovery.minRating}
            setMinRating={discovery.setMinRating}
            inStockOnly={discovery.inStockOnly}
            setInStockOnly={discovery.setInStockOnly}
            onReset={discovery.resetFilters}
          />

          <main className="flex-1">
            <SortBar
              totalResults={discovery.filteredProducts.length}
              sort={discovery.sort}
              setSort={discovery.setSort}
              search={discovery.search}
              setSearch={discovery.setSearch}
            />

            <ProductGrid
              products={discovery.filteredProducts}
              loading={status === 'loading' && products.length === 0}
              onReset={discovery.resetFilters}
            />
          </main>
        </div>
      </div>
    </div>
  )
}
