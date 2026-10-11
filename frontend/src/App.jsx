// src/App.jsx
// SEWORA - Sustainable Fashion Website
import { Routes, Route } from 'react-router-dom'
import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import './components/Navbar.css'
import Hero from './components/Hero'
import Categories from './components/Categories'
import FeaturedProducts from './components/FeaturedProducts'
import Sustainability from './components/Sustainability'
import Footer from './components/Footer'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import MyOrders from './pages/MyOrders'
import OrderDetails from './pages/OrderDetails'
import Wishlist from './pages/Wishlist'
import About from './pages/About'
import NotFound from './pages/NotFound'

// Homepage view grouping all existing homepage sections
function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Sustainability />
    </>
  )
}

function App() {
  return (
    <div className="app">
      {/* Announcement bar appears on every page above the Navbar */}
      <AnnouncementBar />

      {/* Navbar appears on every page */}
      <Navbar />

      {/* Main page routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer appears on every page */}
      <Footer />
    </div>
  )
}

export default App