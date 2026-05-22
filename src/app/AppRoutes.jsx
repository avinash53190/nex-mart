import { Route, Routes } from 'react-router-dom'

import { AdminRoute, ProtectedRoute } from '../features/auth/components/ProtectedRoute'

import Home from '../features/products/pages/Home'
import Shop from '../features/products/pages/Shop'
import ProductDetail from '../features/products/pages/ProductDetail'
import Categories from '../features/products/pages/Categories'
import Cart from '../features/cart/pages/Cart'
import Checkout from '../features/orders/pages/Checkout'
import Login from '../features/auth/pages/Login'
import Register from '../features/auth/pages/Register'
import Profile from '../features/auth/pages/Profile'
import Orders from '../features/orders/pages/Orders'
import AdminLayout from '../features/admin/pages/AdminLayout'
import AdminDashboard from '../features/admin/pages/AdminDashboard'
import AddProduct from '../features/admin/pages/AddProduct'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/checkout"
        element={(
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/profile"
        element={(
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/orders"
        element={(
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/admin"
        element={(
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        )}
      >
        <Route index element={<AdminDashboard />} />
        <Route path="add-product" element={<AddProduct />} />
      </Route>
    </Routes>
  )
}
