const Product = require('../models/productModel')
const AppError = require('../utils/AppError')
const seedProducts = require('../data/productSeeds')
const { normalizeProductQuery } = require('../validators/productValidators')

const buildProductMatch = (filters) => {
  const match = {}

  if (filters.search) {
    match.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { description: { $regex: filters.search, $options: 'i' } },
      { category: { $regex: filters.search, $options: 'i' } },
      { vendor: { $regex: filters.search, $options: 'i' } },
    ]
  }

  if (filters.categories.length > 0) {
    match.category = { $in: filters.categories }
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    match.price = {}
    if (filters.minPrice !== undefined) match.price.$gte = filters.minPrice
    if (filters.maxPrice !== undefined) match.price.$lte = filters.maxPrice
  }

  if (filters.minRating !== undefined) {
    match.rating = { $gte: filters.minRating }
  }

  if (filters.inStock) {
    match.stock = { $gt: 0 }
  }

  return match
}

const getSortSpec = (sort) => {
  switch (sort) {
    case 'price-asc':
      return { price: 1, createdAt: -1 }
    case 'price-desc':
      return { price: -1, createdAt: -1 }
    case 'rating':
      return { rating: -1, reviews: -1, createdAt: -1 }
    case 'newest':
    default:
      return { createdAt: -1, _id: -1 }
  }
}

const toClientProduct = (product) => ({
  id: product.id || product._id?.toString(),
  _id: product._id?.toString(),
  title: product.title,
  name: product.title,
  description: product.description,
  price: product.price,
  originalPrice: product.originalPrice ?? null,
  category: product.category,
  images: product.images || [],
  image: product.images?.[0] || '',
  secondaryImage: product.images?.[1] || product.images?.[0] || '',
  stock: product.stock,
  rating: product.rating,
  reviews: product.reviews,
  reviewList: product.reviewList || [],
  vendor: product.vendor,
  featured: product.featured,
  tags: product.tags || [],
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
})

const ensureSeedProducts = async () => {
  const count = await Product.countDocuments()
  if (count > 0) return

  await Product.insertMany(seedProducts)
}

const listProducts = async (query) => {
  const filters = normalizeProductQuery(query)
  const match = buildProductMatch(filters)
  const sortSpec = getSortSpec(filters.sort)
  const skip = (filters.page - 1) * filters.limit

  const [items, total] = await Promise.all([
    Product.find(match).sort(sortSpec).skip(skip).limit(filters.limit).lean(),
    Product.countDocuments(match),
  ])

  return {
    items: items.map(toClientProduct),
    pagination: {
      page: filters.page,
      limit: filters.limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / filters.limit)),
    },
  }
}

const getProductById = async (id) => {
  const product = await Product.findById(id).lean()
  if (!product) {
    throw new AppError('Product not found', 404)
  }

  return toClientProduct(product)
}

module.exports = {
  ensureSeedProducts,
  listProducts,
  getProductById,
  normalizeProductQuery,
  toClientProduct,
}
