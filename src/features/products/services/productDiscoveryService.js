export const DEFAULT_PRODUCT_DISCOVERY_FILTERS = {
  search: '',
  selectedCategories: [],
  priceRange: [0, 3000],
  minRating: 0,
  inStockOnly: false,
  sort: 'newest',
}

const toNumber = (value, fallback) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export const parseProductDiscoveryFilters = (searchParams) => {
  const categories = searchParams.getAll('category').filter(Boolean)
  const minPrice = toNumber(searchParams.get('minPrice'), DEFAULT_PRODUCT_DISCOVERY_FILTERS.priceRange[0])
  const maxPrice = toNumber(searchParams.get('maxPrice'), DEFAULT_PRODUCT_DISCOVERY_FILTERS.priceRange[1])
  const normalizedPriceRange = [Math.min(minPrice, maxPrice), Math.max(minPrice, maxPrice)]
  const minRating = toNumber(searchParams.get('rating'), DEFAULT_PRODUCT_DISCOVERY_FILTERS.minRating)

  return {
    search: searchParams.get('q') || DEFAULT_PRODUCT_DISCOVERY_FILTERS.search,
    selectedCategories: categories,
    priceRange: normalizedPriceRange,
    minRating,
    inStockOnly: searchParams.get('inStock') === '1',
    sort: searchParams.get('sort') || DEFAULT_PRODUCT_DISCOVERY_FILTERS.sort,
  }
}

export const createProductDiscoverySearchParams = (filters) => {
  const params = new URLSearchParams()

  const search = filters.search?.trim()
  if (search) params.set('q', search)

  filters.selectedCategories?.forEach((category) => {
    params.append('category', category)
  })

  const [minPrice, maxPrice] = filters.priceRange || DEFAULT_PRODUCT_DISCOVERY_FILTERS.priceRange
  if (minPrice !== DEFAULT_PRODUCT_DISCOVERY_FILTERS.priceRange[0]) params.set('minPrice', String(minPrice))
  if (maxPrice !== DEFAULT_PRODUCT_DISCOVERY_FILTERS.priceRange[1]) params.set('maxPrice', String(maxPrice))
  if ((filters.minRating || 0) > 0) params.set('rating', String(filters.minRating))
  if (filters.inStockOnly) params.set('inStock', '1')
  if (filters.sort && filters.sort !== DEFAULT_PRODUCT_DISCOVERY_FILTERS.sort) params.set('sort', filters.sort)

  return params
}

export const filterAndSortProducts = (products, filters) => {
  let result = [...products]
  const search = filters.search?.trim().toLowerCase()

  if (search) {
    result = result.filter((product) => product.name.toLowerCase().includes(search))
  }

  if (filters.selectedCategories?.length > 0) {
    result = result.filter((product) => filters.selectedCategories.includes(product.category))
  }

  const [rawMinPrice, rawMaxPrice] = filters.priceRange || DEFAULT_PRODUCT_DISCOVERY_FILTERS.priceRange
  const minPrice = Math.min(rawMinPrice, rawMaxPrice)
  const maxPrice = Math.max(rawMinPrice, rawMaxPrice)
  result = result.filter((product) => product.price >= minPrice && product.price <= maxPrice)

  if ((filters.minRating || 0) > 0) {
    result = result.filter((product) => product.rating >= filters.minRating)
  }

  if (filters.inStockOnly) {
    result = result.filter((product) => product.stock > 0)
  }

  switch (filters.sort) {
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
      result.sort((a, b) => (b._id || b.id).localeCompare(a._id || a.id))
      break
  }

  return result
}

export const hasActiveProductDiscoveryFilters = (filters) => {
  const [rawMinPrice, rawMaxPrice] = filters.priceRange || DEFAULT_PRODUCT_DISCOVERY_FILTERS.priceRange
  const minPrice = Math.min(rawMinPrice, rawMaxPrice)
  const maxPrice = Math.max(rawMinPrice, rawMaxPrice)

  return Boolean(
    (filters.search || '').trim() ||
    (filters.selectedCategories?.length || 0) > 0 ||
    minPrice !== DEFAULT_PRODUCT_DISCOVERY_FILTERS.priceRange[0] ||
    maxPrice !== DEFAULT_PRODUCT_DISCOVERY_FILTERS.priceRange[1] ||
    (filters.minRating || 0) > 0 ||
    filters.inStockOnly ||
    (filters.sort || DEFAULT_PRODUCT_DISCOVERY_FILTERS.sort) !== DEFAULT_PRODUCT_DISCOVERY_FILTERS.sort
  )
}
