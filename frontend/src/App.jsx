// src/App.jsx
// SEWORA - Sustainable Fashion Website
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import './components/Navbar.css'
import Hero from './components/Hero'
import Categories from './components/Categories'
import FeaturedProducts from './components/FeaturedProducts'
import Sustainability from './components/Sustainability'
import Footer from './components/Footer'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'

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
      {/* Navbar appears on every page */}
      <Navbar />

      {/* Main page routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>

      {/* Footer appears on every page */}
      <Footer />
    </div>
  )
}

export default App