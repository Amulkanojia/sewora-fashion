// src/components/FeaturedProducts.jsx
// Grid of 4 curated fashion items with wishlist, cart actions, and detail links
import { useState } from 'react'
import { Link } from 'react-router-dom'
import products from '../data/products'
import { useCart } from '../context/CartContext'
import './FeaturedProducts.css'

function FeaturedProducts() {
  const { addToCart } = useCart()

  // Use first 4 items from shared products data
  const featuredProducts = products.slice(0, 4)

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

  // Handle Add to Cart using first available size on featured cards
  const handleAddToCart = (product) => {
    const defaultSize = product.sizes?.[0] || 'One Size'
    addToCart(product, defaultSize, 1)

    setAddedItems((prev) => ({ ...prev, [product.id]: true }))
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }))
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
          {featuredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id)
            const isAdded = addedItems[product.id]

            return (
              <div key={product.id} className="product-card">
                {/* Image area with link to product details */}
                <div className="product-card-image-wrap">
                  <Link
                    to={`/products/${product.id}`}
                    className="product-card-link"
                    aria-label={product.name}
                  >
                    <div
                      className="product-placeholder"
                      style={{ backgroundColor: product.placeholderBg || '#ece6dd' }}
                    >
                      <span className="product-fabric-tag">{product.fabric || product.color}</span>

                      <div className="product-swatch-silhouette">
                        <span className="silhouette-label">{product.category}</span>
                      </div>
                    </div>
                  </Link>

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
                  <h3 className="product-name">
                    <Link to={`/products/${product.id}`} className="product-name-link">
                      {product.name}
                    </Link>
                  </h3>
                  <div className="product-price">
                    ₹{product.price.toLocaleString('en-IN')}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    className={`cart-btn ${isAdded ? 'cart-btn-added' : ''}`}
                    onClick={() => handleAddToCart(product)}
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
