import { createContext, useContext, useState, useEffect } from 'react'
import { storage } from '../../../shared/services/storage'
import { STORAGE_KEYS } from '../../../shared/services/constants'
import { createOrder, getOrdersForUser, loadOrders, saveOrders } from '../services/orderService'

const OrderContext = createContext(null)

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => loadOrders())

  useEffect(() => { saveOrders(orders) }, [orders])

  const placeOrder = (cartItems, total, billing, discount = 0) => {
    const order = createOrder(cartItems, total, billing, discount, storage.get(STORAGE_KEYS.USER)?.id)
    setOrders(prev => [order, ...prev])
    return order
  }

  const getUserOrders = (userId) => getOrdersForUser(orders, userId)

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getUserOrders, status: 'success', error: null }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => useContext(OrderContext)
