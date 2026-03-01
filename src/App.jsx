import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'
import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'
import { ThemeProvider } from './context/ThemeContext'
import { WishlistProvider } from './context/WishlistContext'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute'

import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Categories from './pages/Categories'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AddProduct from './pages/admin/AddProduct'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <WishlistProvider>
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <CartDrawer />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/checkout" element={
                        <ProtectedRoute><Checkout /></ProtectedRoute>
                      } />
                      <Route path="/profile" element={
                        <ProtectedRoute><Profile /></ProtectedRoute>
                      } />
                      <Route path="/orders" element={
                        <ProtectedRoute><Orders /></ProtectedRoute>
                      } />
                      <Route path="/admin" element={
                        <AdminRoute><AdminLayout /></AdminRoute>
                      }>
                        <Route index element={<AdminDashboard />} />
                        <Route path="add-product" element={<AddProduct />} />
                      </Route>
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </WishlistProvider>
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
