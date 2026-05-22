import { storage } from '../../../shared/services/storage'
import { STORAGE_KEYS } from '../../../shared/services/constants'

export const loadCartItems = () => storage.get(STORAGE_KEYS.CART, [])

export const saveCartItems = (items) => {
  storage.set(STORAGE_KEYS.CART, items)
}

export const addCartItem = (items, product, quantity = 1) => {
  const existing = items.find((item) => item.id === product.id)

  if (existing) {
    return items.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
    )
  }

  return [...items, { ...product, quantity }]
}

export const removeCartItem = (items, id) => items.filter((item) => item.id !== id)

export const updateCartQuantity = (items, id, quantity) => {
  if (quantity <= 0) return removeCartItem(items, id)

  return items.map((item) =>
    item.id === id ? { ...item, quantity } : item
  )
}

export const clearCartItems = () => []

export const calculateCartTotals = (items) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)
  const tax = subtotal * 0.08
  const shipping = subtotal > 500 || itemCount === 0 ? 0 : 15
  const total = subtotal + tax + shipping

  return { subtotal, itemCount, tax, shipping, total }
}
