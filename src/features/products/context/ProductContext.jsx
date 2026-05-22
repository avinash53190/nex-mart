import { createContext, useContext, useState, useEffect } from 'react'
import {
  addReviewToProduct,
  createProduct,
  findProductById,
  loadProducts,
  removeProductById,
  updateProductById,
} from '../services/productService'
import { useAsyncState } from '../../../shared/hooks/useAsyncState'

const ProductContext = createContext(null)

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const asyncState = useAsyncState('loading')

  useEffect(() => {
    let active = true
    asyncState.start()

    loadProducts()
      .then((data) => {
        if (!active) return
        setProducts(data)
        asyncState.succeed()
      })
      .catch((error) => {
        if (!active) return
        asyncState.fail(error.message)
      })

    return () => {
      active = false
    }
  }, [asyncState.start, asyncState.succeed, asyncState.fail])

  const addProduct = (product) => {
    const newProduct = createProduct(product)
    setProducts(prev => [...prev, newProduct])
    return newProduct
  }

  const deleteProduct = (id) => {
    setProducts(prev => removeProductById(prev, id))
  }

  const updateProduct = (id, updates) => {
    setProducts(prev => updateProductById(prev, id, updates))
  }

  const addReview = (productId, review) => {
    setProducts(prev => addReviewToProduct(prev, productId, review))
  }

  const getProduct = (id) => findProductById(products, id)
  const refreshProducts = async () => {
    asyncState.start()
    try {
      const data = await loadProducts()
      setProducts(data)
      asyncState.succeed()
    } catch (error) {
      asyncState.fail(error.message)
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        addReview,
        getProduct,
        refreshProducts,
        status: asyncState.status,
        error: asyncState.error,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => useContext(ProductContext)
