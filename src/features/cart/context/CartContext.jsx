import { createContext, useContext, useReducer, useEffect, useState } from 'react'
import { loadCartItems, saveCartItems, addCartItem, removeCartItem, updateCartQuantity, clearCartItems, calculateCartTotals } from '../services/cartService'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload
      return { ...state, items: addCartItem(state.items, product, quantity) }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: removeCartItem(state.items, action.payload) }
    case 'UPDATE_QUANTITY':
      return { ...state, items: updateCartQuantity(state.items, action.payload.id, action.payload.quantity) }
    case 'CLEAR_CART':
      return { ...state, items: clearCartItems() }
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, () => ({
    items: loadCartItems(),
  }))
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    saveCartItems(state.items)
  }, [state.items])

  const addToCart = (product, quantity = 1) => dispatch({ type: 'ADD_ITEM', payload: { product, quantity } })
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id })
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const { subtotal, itemCount, tax, shipping, total } = calculateCartTotals(state.items)

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
        setIsDrawerOpen,
        status: 'success',
        error: null,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
