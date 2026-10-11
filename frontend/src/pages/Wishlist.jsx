// src/pages/Wishlist.jsx
// Wishlist page displaying saved products with responsive grid, move to cart, and removal actions
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/api'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import './Wishlist.css'

function Wishlist() {
  const { addToCart } = useCart()
  const { wishlistIds, removeFromWishlist } = useWishlist()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load products from backend on mount
  useEffect(() => {
    let isMounted = true

    getProducts()
      .then((data) => {
        if (isMounted) {
          setProducts(Array.isArray(data) ? data : [])
          setLoading(false)
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Could not load products. Is the backend running?')
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  // Filter products matching current wishlist IDs
  const wishlistedProducts = products.filter((product) =>
    wishlistIds.some((wId) => String(wId) === String(product.id))
  )

  // Move product from wishlist to shopping bag
  const handleMoveToCart = (product) => {
    const defaultSize = product.sizes?.[0] || 'One Size'
    addToCart(product, defaultSize, 1)
    removeFromWishlist(product.id)
  }

  // Remove product from wishlist
  const handleRemove = (product) => {
    removeFromWishlist(product.id)
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        {/* Page Header */}
        <header className="wishlist-header">
          <p className="wishlist-eyebrow">Curated Vault</p>
          <h1 className="wishlist-title">My Wishlist</h1>
          <p className="wishlist-subtitle">
            Saved silhouettes and conscious pieces reserved for your wardrobe capsule.
          </p>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="wishlist-status-card">
            <p className="wishlist-loading-text">Loading your wishlist...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="wishlist-status-card">
            <div className="wishlist-error-banner" role="alert">
              <span className="wishlist-error-icon">&bull;</span>
              <span>Could not load products. Is the backend running?</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && wishlistedProducts.length === 0 && (
          <div className="wishlist-empty-card">
            <span className="wishlist-empty-icon" aria-hidden="true">&#x2661;</span>
            <h2 className="wishlist-empty-title">Your wishlist is empty</h2>
            <p className="wishlist-empty-text">
              Save pieces you love to build your personal conscious capsule.
            </p>
            <Link to="/products" className="btn btn-primary wishlist-empty-btn">
              Explore Products
            </Link>
          </div>
        )}

        {/* Wishlisted Products Grid */}
        {!loading && !error && wishlistedProducts.length > 0 && (
          <div className="wishlist-grid">
            {wishlistedProducts.map((product) => (
              <article key={product.id} className="wishlist-card">
                {/* Product Media Area with Fallback Block */}
                <div className="wishlist-card-media">
                  <Link
                    to={`/products/${product.id}`}
                    className="wishlist-media-link"
                    aria-label={product.name}
                  >
                    <div className="wishlist-img-wrap">
                      <img
                        src={`/images/product-${product.id}.jpg`}
                        alt={product.name}
                        className="wishlist-img"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      {/* Monolithic technical tag inside the media container */}
                      <div className="wishlist-media-badge" aria-hidden="true">
                        <span className="wishlist-badge-index">
                          #{product.id < 10 ? `0${product.id}` : product.id}
                        </span>
                        <span className="wishlist-badge-category">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Product Information */}
                <div className="wishlist-card-info">
                  <div className="wishlist-meta-top">
                    <span className="wishlist-category">{product.category}</span>
                    {product.color && (
                      <span className="wishlist-color">{product.color}</span>
                    )}
                  </div>

                  <h2 className="wishlist-product-name">
                    <Link
                      to={`/products/${product.id}`}
                      className="wishlist-name-link"
                    >
                      {product.name}
                    </Link>
                  </h2>

                  <div className="wishlist-price-row">
                    <span className="wishlist-price">
                      ₹{Number(product.price).toLocaleString('en-IN')}
                    </span>
                    {product.sizes && product.sizes.length > 0 && (
                      <span className="wishlist-sizes">
                        {Array.isArray(product.sizes) ? product.sizes.join(' · ') : ''}
                      </span>
                    )}
                  </div>

                  {/* Actions: Move to cart and Remove */}
                  <div className="wishlist-actions">
                    <button
                      type="button"
                      className="btn btn-primary wishlist-move-btn"
                      onClick={() => handleMoveToCart(product)}
                    >
                      Move to Cart
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline wishlist-remove-btn"
                      onClick={() => handleRemove(product)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist
