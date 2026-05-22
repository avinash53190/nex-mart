const AppError = require('../utils/AppError')
const { hasRequiredFields } = require('./commonValidators')

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 12
const DEFAULT_SORT = 'newest'

const normalizePositiveInteger = (value, fallback, label) => {
  if (value === undefined || value === null || value === '') return fallback
  const parsed = Number(value)
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new AppError(`${label} must be a positive integer`, 400)
  }
  return parsed
}

const normalizeNumber = (value, fallback, label) => {
  if (value === undefined || value === null || value === '') return fallback
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) {
    throw new AppError(`${label} must be a valid number`, 400)
  }
  return parsed
}

const normalizeProductQuery = (query = {}) => {
  const categories = Array.isArray(query.category)
    ? query.category
    : typeof query.category === 'string'
      ? query.category.split(',').map((item) => item.trim()).filter(Boolean)
      : []

  const page = normalizePositiveInteger(query.page, DEFAULT_PAGE, 'page')
  const limit = normalizePositiveInteger(query.limit, DEFAULT_LIMIT, 'limit')
  const minPrice = normalizeNumber(query.minPrice, undefined, 'minPrice')
  const maxPrice = normalizeNumber(query.maxPrice, undefined, 'maxPrice')
  const minRating = normalizeNumber(query.minRating ?? query.rating, undefined, 'rating')
  const inStock = query.inStock === '1' || query.inStock === 'true' || query.inStock === true
  const search = typeof query.q === 'string' ? query.q.trim() : ''
  const sort = ['price-asc', 'price-desc', 'rating', 'newest'].includes(query.sort)
    ? query.sort
    : DEFAULT_SORT

  return {
    search,
    categories,
    minPrice,
    maxPrice,
    minRating,
    inStock,
    sort,
    page,
    limit,
  }
}

const validateProductBody = (payload = {}) => {
  const requiredFields = ['title', 'description', 'price', 'category', 'images', 'stock']
  if (!hasRequiredFields(payload, requiredFields)) {
    throw new AppError(`Missing required fields: ${requiredFields.join(', ')}`, 400)
  }

  const price = Number(payload.price)
  const stock = Number(payload.stock)

  if (!Number.isFinite(price) || price < 0) {
    throw new AppError('price must be a valid number greater than or equal to 0', 400)
  }

  if (!Number.isFinite(stock) || stock < 0) {
    throw new AppError('stock must be a valid number greater than or equal to 0', 400)
  }

  if (!Array.isArray(payload.images) || payload.images.length === 0) {
    throw new AppError('images must contain at least one image', 400)
  }

  return {
    ...payload,
    price,
    originalPrice:
      payload.originalPrice === undefined || payload.originalPrice === null || payload.originalPrice === ''
        ? null
        : Number(payload.originalPrice),
    stock,
    rating: payload.rating === undefined || payload.rating === null || payload.rating === ''
      ? 0
      : Number(payload.rating),
    reviews: payload.reviews === undefined || payload.reviews === null || payload.reviews === ''
      ? 0
      : Number(payload.reviews),
  }
}

const validateProductQuery = (req, res, next) => {
  try {
    req.productQuery = normalizeProductQuery(req.query)
    return next()
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
  normalizeProductQuery,
  validateProductBody,
  validateProductQuery,
}
