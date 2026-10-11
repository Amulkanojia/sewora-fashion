// src/components/FeaturedProducts.jsx
// New Arrivals section featuring the first 4 products with sharp streetwear editorial aesthetics
import { useState } from 'react'
import { Link } from 'react-router-dom'
import products from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import './FeaturedProducts.css'

function FeaturedProducts() {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { showToast } = useToast()

  // Display only the first 4 products as New Arrivals
  const newArrivals = products.slice(0, 4)

  // Cart addition feedback
  const [addedItems, setAddedItems] = useState({})

  const handleAddToCart = (product) => {
    const defaultSize = product.sizes?.[0] || 'One Size'
    addToCart(product, defaultSize, 1)
    showToast('Added to cart')

    setAddedItems((prev) => ({ ...prev, [product.id]: true }))
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }))
    }, 1500)
  }

  return (
    <section id="featured-products" className="arrivals-section">
      <div className="arrivals-container">
        {/* Section Header */}
        <div className="arrivals-header">
          <div className="arrivals-eyebrow-row">
            <span className="streetwear-badge-lime">LATEST RELEASE</span>
            <span className="arrivals-eyebrow-text">LIMITED EDITION CAPSULE</span>
          </div>
          <div className="arrivals-title-row">
            <h2 className="arrivals-title">NEW ARRIVALS</h2>
            <Link to="/products" className="arrivals-view-all">
              VIEW ALL SILHOUETTES &rarr;
            </Link>
          </div>
        </div>

        {/* 4-Item Streetwear Product Grid */}
        <div className="arrivals-grid">
          {newArrivals.map((product) => {
            const isWishlisted = isInWishlist(product.id)
            const isAdded = addedItems[product.id]

            return (
              <div key={product.id} className="streetwear-card">
                {/* Media area with near-black fallback block */}
                <div className="streetwear-card-media">
                  <Link
                    to={`/products/${product.id}`}
                    className="streetwear-media-link"
                    aria-label={product.name}
                  >
                    <div className="streetwear-img-wrap">
                      <img
                        src={`/images/product-${product.id}.jpg`}
                        alt={product.name}
                        className="streetwear-img"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      {/* Monolithic technical badge inside the media block */}
                      <div className="media-corner-badge" aria-hidden="true">
                        <span className="badge-index">
                          #{product.id < 10 ? `0${product.id}` : product.id}
                        </span>
                        <span className="badge-category">{product.category}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    className={`streetwear-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={() => {
                      const isSaved = isWishlisted
                      toggleWishlist(product.id)
                      showToast(isSaved ? 'Removed from wishlist' : 'Saved to wishlist')
                    }}
                    aria-pressed={isWishlisted}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    {isWishlisted ? '♥' : '♡'}
                  </button>
                </div>

                {/* Product Metadata */}
                <div className="streetwear-card-info">
                  <div className="info-top-row">
                    <span className="card-category">{product.category}</span>
                    <span className="card-color">{product.color}</span>
                  </div>

                  <h3 className="card-product-name">
                    <Link to={`/products/${product.id}`} className="card-title-link">
                      {product.name}
                    </Link>
                  </h3>

                  <div className="card-price-row">
                    <span className="card-price">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="card-sizes">
                      {Array.isArray(product.sizes) ? product.sizes.join(' · ') : ''}
                    </span>
                  </div>

                  {/* Add to Cart Action */}
                  <button
                    type="button"
                    className={`streetwear-cart-btn ${isAdded ? 'added' : ''}`}
                    onClick={() => handleAddToCart(product)}
                  >
                    {isAdded ? 'ADDED TO CART ✓' : 'ADD TO CART'}
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
