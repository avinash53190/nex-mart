import { storage } from '../../../shared/services/storage'
import { STORAGE_KEYS } from '../../../shared/services/constants'

export const loadOrders = () => storage.get(STORAGE_KEYS.ORDERS, [])

export const saveOrders = (orders) => {
  storage.set(STORAGE_KEYS.ORDERS, orders)
}

export const createOrder = (cartItems, total, billing, discount = 0, userId = null) => ({
  id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2, 11),
  items: cartItems,
  total,
  discount,
  billing,
  status: 'confirmed',
  createdAt: new Date().toISOString(),
  userId,
})

export const getOrdersForUser = (orders, userId) => orders.filter((order) => order.userId === userId)
