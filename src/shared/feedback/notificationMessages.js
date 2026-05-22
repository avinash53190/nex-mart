export const normalizeFeedbackMessage = (error, fallback = 'Something went wrong') => {
  if (!error) return fallback
  if (typeof error === 'string') return error
  if (error?.message) return error.message
  return fallback
}

export const getCartMessage = (action, productName, quantity = 1) => {
  if (action === 'added') {
    return quantity > 1
      ? `${quantity} x ${productName} added to cart`
      : `${productName} added to cart`
  }
  if (action === 'removed') return `${productName} removed from cart`
  if (action === 'cleared') return 'Cart cleared'
  return 'Cart updated'
}

export const getWishlistMessage = (action, productName) =>
  action === 'added'
    ? `${productName} saved to wishlist`
    : `${productName} removed from wishlist`

export const getAuthMessage = (action, name) => {
  if (action === 'login') return `Welcome back${name ? `, ${name}` : ''}`
  if (action === 'register') return `Account created${name ? ` for ${name}` : ''}`
  if (action === 'logout') return 'You have been signed out'
  return 'Authentication updated'
}

export const getCheckoutMessage = (action, orderId) =>
  action === 'success'
    ? `Order placed successfully${orderId ? ` (${orderId})` : ''}`
    : 'Checkout failed'

export const getReviewMessage = (productName) =>
  `Review posted for ${productName}`
