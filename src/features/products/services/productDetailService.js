export const FALLBACK_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=900&q=80'

export const getProductGalleryImages = (product) => {
  const images = [product?.image, product?.secondaryImage, ...(product?.gallery || [])]
    .filter(Boolean)

  return [...new Set(images)]
}

export const getRelatedProducts = (products, product) =>
  products
    .filter((item) => item.category === product?.category && item.id !== product?.id)
    .slice(0, 4)

export const getReviewStats = (product) => {
  const reviews = product?.reviewList || []
  const count = reviews.length
  const average = count > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / count
    : Number(product?.rating || 0)

  return {
    count: product?.reviews || count,
    average: Math.round(average * 10) / 10,
    reviews,
  }
}

export const clampQuantity = (value, stock) => {
  const safeStock = Math.max(0, Number(stock) || 0)
  const safeValue = Math.max(1, Number(value) || 1)
  return safeStock === 0 ? 0 : Math.min(safeValue, safeStock)
}
