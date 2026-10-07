// src/App.jsx
// SEWORA - Sustainable Fashion Homepage
import Navbar from './components/Navbar'
import './components/Navbar.css'
import Hero from './components/Hero'
import Categories from './components/Categories'
import FeaturedProducts from './components/FeaturedProducts'
import Sustainability from './components/Sustainability'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      {/* 1. Navigation Bar */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Categories Section */}
      <Categories />

      {/* 4. Featured Products Section */}
      <FeaturedProducts />

      {/* 5. Sustainability (SDG 12) Section */}
      <Sustainability />

      {/* 6. Footer Section */}
      <Footer />
    </div>
  )
}

export default App