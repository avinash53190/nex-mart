import { createContext, useContext, useReducer, useEffect, useState } from 'react'
import { storage } from '../utils/helpers'

const CartContext = createContext(null)

const CART_STORAGE_KEY = 'nx_cart_v2'

const initialState = {
  items: storage.get(CART_STORAGE_KEY, []),
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload
      const existing = state.items.find(i => i.id === product.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
        }
      }
      return { ...state, items: [...state.items, { ...product, quantity }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(i => i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i)
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    storage.set(CART_STORAGE_KEY, state.items)
  }, [state.items])

  const addToCart = (product, quantity = 1) => dispatch({ type: 'ADD_ITEM', payload: { product, quantity } })
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id })
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return removeFromCart(id)
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  // Calculations
  const subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0)
  const tax = subtotal * 0.08
  const shipping = subtotal > 500 || itemCount === 0 ? 0 : 15
  const total = subtotal + tax + shipping

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
        tax,
        shipping,
        total,
        isDrawerOpen,
        setIsDrawerOpen
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
