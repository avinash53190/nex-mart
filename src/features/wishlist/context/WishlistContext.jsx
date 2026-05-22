import { createContext, useContext, useState, useEffect } from 'react'
import { storage } from '../../../shared/services/storage'
import { STORAGE_KEYS } from '../../../shared/services/constants'

const WishlistContext = createContext(null)

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(() => storage.get(STORAGE_KEYS.WISHLIST, []))

  useEffect(() => { storage.set(STORAGE_KEYS.WISHLIST, items) }, [items])

  const toggle = (product) => {
    setItems(prev => prev.find(i => i.id === product.id)
      ? prev.filter(i => i.id !== product.id)
      : [...prev, product]
    )
  }

  const isWishlisted = (id) => items.some(i => i.id === id)

  return (
    <WishlistContext.Provider value={{ items, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
