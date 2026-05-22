import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import ToastViewport from './ToastViewport'

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartDrawer />
      <ToastViewport />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
