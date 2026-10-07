// src/components/FeaturedProducts.jsx
// Grid of 4 curated fashion items with wishlist and cart actions
import { useState } from 'react'
import './FeaturedProducts.css'

// Hard-coded sample products (name, price in INR, category)
const sampleProducts = [
  {
    id: 1,
    name: 'Organic Linen Overshirt',
    category: 'Men',
    price: 4499,
    fabric: '100% French Flax',
    placeholderBg: '#ece6dd',
  },
  {
    id: 2,
    name: 'Peace Silk Slip Dress',
    category: 'Women',
    price: 5999,
    fabric: 'Ahimsa Cruelty-Free Silk',
    placeholderBg: '#e6ded4',
  },
  {
    id: 3,
    name: 'Structured Canvas Tote',
    category: 'Accessories',
    price: 2499,
    fabric: 'Recycled Heavy Canvas',
    placeholderBg: '#dfe6de',
  },
  {
    id: 4,
    name: 'Relaxed Hemp Trousers',
    category: 'Women',
    price: 3899,
    fabric: 'Hemp & Organic Cotton',
    placeholderBg: '#dedbd4',
  },
]

function FeaturedProducts() {
  // Simple state to track wishlisted item IDs
  const [wishlist, setWishlist] = useState([])
  // State to provide temporary "Added ✓" feedback when adding to cart
  const [addedItems, setAddedItems] = useState({})

  // Toggle wishlist state for a product
  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  // Handle Add to Cart with friendly temporary button feedback
  const handleAddToCart = (productId) => {
    setAddedItems((prev) => ({ ...prev, [productId]: true }))
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [productId]: false }))
    }, 1600)
  }

  return (
    <section id="featured-products" className="featured-section">
      <div className="featured-container">
        {/* Section Header */}
        <div className="featured-header">
          <p className="featured-eyebrow">Curated Capsule</p>
          <h2 className="featured-title">Featured Pieces</h2>
          <p className="featured-subtitle">
            Mindfully designed garments tailored with earth-first materials, made to be worn and loved for years.
          </p>
        </div>

        {/* 4 Product Cards Grid */}
        <div className="featured-grid">
          {sampleProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id)
            const isAdded = addedItems[product.id]

            return (
              <div key={product.id} className="product-card">
                {/* Soft colored placeholder block (no external images) */}
                <div
                  className="product-placeholder"
                  style={{ backgroundColor: product.placeholderBg }}
                >
                  <span className="product-fabric-tag">{product.fabric}</span>

                  <div className="product-swatch-silhouette">
                    <span className="silhouette-label">{product.category}</span>
                  </div>

                  {/* Wishlist Button in top corner */}
                  <button
                    type="button"
                    className={`wishlist-btn ${isWishlisted ? 'wishlist-active' : ''}`}
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={`Wishlist ${product.name}`}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    {isWishlisted ? '♥' : '♡'}
                  </button>
                </div>

                {/* Product Information */}
                <div className="product-details">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    ₹{product.price.toLocaleString('en-IN')}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    className={`cart-btn ${isAdded ? 'cart-btn-added' : ''}`}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    {isAdded ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
