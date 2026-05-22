import { apiClient } from '../../../shared/services/apiClient'
import { filterAndSortProducts } from './productDiscoveryService'

const fallbackId = () =>
  (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2, 11))

export const normalizeProduct = (product) => {
  const images = product.images || [product.image, product.secondaryImage].filter(Boolean)

  return {
    ...product,
    id: product.id || product._id,
    _id: product._id || product.id,
    title: product.title || product.name || '',
    name: product.name || product.title || '',
    images,
    image: product.image || images[0] || '',
    secondaryImage: product.secondaryImage || images[1] || images[0] || '',
    vendor: product.vendor || 'Nex-Mart',
    originalPrice: product.originalPrice ?? null,
    featured: Boolean(product.featured),
    tags: product.tags || [],
    reviewList: product.reviewList || [],
  }
}

const normalizeProductsResponse = (payload) => {
  const items = payload?.items || payload?.data?.items || payload?.data || []
  return Array.isArray(items) ? items.map(normalizeProduct) : []
}

export const loadProducts = async (params = {}) => {
  const response = await apiClient.get('/products', { params })
  return normalizeProductsResponse(response.data)
}

export const loadProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`)
  const product = response.data?.data || response.data
  return normalizeProduct(product)
}

export const createProduct = (product) => {
  const id = product.id || fallbackId()

  return {
    ...product,
    id,
    _id: product._id || id,
    title: product.title || product.name || '',
    name: product.name || product.title || '',
    images: product.images || [product.image].filter(Boolean),
    image: product.image || product.images?.[0] || '',
    secondaryImage: product.secondaryImage || product.images?.[1] || product.images?.[0] || '',
    rating: Number(product.rating) || 0,
    reviews: Number(product.reviews) || 0,
    stock: parseInt(product.stock, 10) || 0,
  }
}

export const removeProductById = (products, id) => products.filter((product) => product.id !== id && product._id !== id)

export const updateProductById = (products, id, updates) =>
  products.map((product) => (product.id === id || product._id === id ? { ...product, ...updates } : product))

export const addReviewToProduct = (products, productId, review) =>
  products.map((product) => {
    if (product.id !== productId && product._id !== productId) return product

    const reviewList = product.reviewList ? [...product.reviewList, review] : [review]
    const average = reviewList.reduce((sum, item) => sum + item.rating, 0) / reviewList.length

    return {
      ...product,
      reviewList,
      rating: Math.round(average * 10) / 10,
      reviews: reviewList.length,
    }
  })

export const findProductById = (products, id) =>
  products.find((product) => product.id === id || product._id === id)

export const filterProducts = (products, { search, selectedCategories, priceRange, sort }) =>
  filterAndSortProducts(products, {
    search,
    selectedCategories,
    priceRange,
    sort,
    minRating: 0,
    inStockOnly: false,
  })
