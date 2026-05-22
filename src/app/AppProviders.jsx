import { AuthProvider } from '../features/auth/context/AuthContext'
import { ProductProvider } from '../features/products/context/ProductContext'
import { CartProvider } from '../features/cart/context/CartContext'
import { OrderProvider } from '../features/orders/context/OrderContext'
import { ThemeProvider } from '../features/theme/context/ThemeContext'
import { WishlistProvider } from '../features/wishlist/context/WishlistContext'
import { NotificationProvider } from '../shared/feedback/NotificationContext'

export default function AppProviders({ children }) {
  return (
    <NotificationProvider>
      <ThemeProvider>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <OrderProvider>
                <WishlistProvider>{children}</WishlistProvider>
              </OrderProvider>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </ThemeProvider>
    </NotificationProvider>
  )
}
