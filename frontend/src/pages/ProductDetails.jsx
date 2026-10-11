// src/pages/ProductDetails.jsx
// Detailed product view with size selector, quantity counter, and cart/wishlist actions
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import products from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import './ProductDetails.css'

function ProductView({ product }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { showToast } = useToast()

  // State for selected size and quantity
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '')
  const [quantity, setQuantity] = useState(1)

  // Feedback state for cart
  const [isAdded, setIsAdded] = useState(false)
  const isWishlisted = isInWishlist(product.id)

  // Handle quantity changes (minimum 1)
  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  // Handle Add to Cart action using selected size and quantity
  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity)
    showToast('Added to cart')
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1800)
  }

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        {/* Breadcrumb / Back Link */}
        <nav className="product-details-breadcrumb" aria-label="Breadcrumb">
          <Link to="/products" className="breadcrumb-back">
            &larr; Back to Products
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-category">{product.category}</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        {/* Two-Column Responsive Layout */}
        <div className="product-details-grid">
          {/* Left Column: Large Soft-Colored Placeholder Image Block */}
          <div className="product-details-media">
            <div
              className="product-large-placeholder"
              style={{ backgroundColor: product.placeholderBg || '#ece6dd' }}
            >
              <span className="media-fabric-badge">
                {product.fabric || product.color}
              </span>

              <div className="media-swatch-silhouette">
                <span className="media-silhouette-label">{product.category}</span>
              </div>

              <div className="media-caption">
                100% Sustainable &bull; Plant-Dyed
              </div>
            </div>
          </div>

          {/* Right Column: Product Information & Controls */}
          <div className="product-details-info">
            <span className="product-info-category">{product.category}</span>
            <h1 className="product-info-title">{product.name}</h1>
            <div className="product-info-price">
              ₹{product.price.toLocaleString('en-IN')}
            </div>

            <div className="product-info-color">
              <span className="info-label">Color:</span>
              <span className="info-value">{product.color}</span>
            </div>

            <div className="product-info-description">
              <p>{product.description}</p>
            </div>

            {/* Size Buttons Group */}
            <div className="product-info-sizes">
              <div className="sizes-header">
                <span className="info-label">Select Size:</span>
                <span className="selected-size-indicator">{selectedSize}</span>
              </div>
              <div className="size-buttons-group" role="group" aria-label="Available sizes">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector with Minus and Plus Buttons */}
            <div className="product-info-quantity">
              <span className="info-label">Quantity:</span>
              <div className="quantity-controls">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  &minus;
                </button>
                <span className="qty-number">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={handleIncreaseQuantity}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Cart & Wishlist */}
            <div className="product-info-actions">
              <button
                type="button"
                className={`btn btn-primary add-to-cart-btn ${isAdded ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {isAdded ? `Added (${quantity}) to Cart ✓` : 'Add to Cart'}
              </button>
              <button
                type="button"
                className={`btn btn-outline wishlist-action-btn ${
                  isWishlisted ? 'wishlist-active' : ''
                }`}
                onClick={() => {
                  const isSaved = isWishlisted
                  toggleWishlist(product.id)
                  showToast(isSaved ? 'Removed from wishlist' : 'Saved to wishlist')
                }}
                aria-pressed={isWishlisted}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                {isWishlisted ? '♥ In Wishlist' : '♡ Wishlist'}
              </button>
            </div>

            {/* Sustainable Ethos Highlights */}
            <div className="product-info-perks">
              <div className="perk-line">
                <span className="perk-check">&#x2713;</span>
                <span>Certified eco-friendly materials &bull; Plastic-free packaging</span>
              </div>
              <div className="perk-line">
                <span className="perk-check">&#x2713;</span>
                <span>Crafted under fair-wage ethical artisan conditions</span>
              </div>
              <div className="perk-line">
                <span className="perk-check">&#x2713;</span>
                <span>Aligned with UN SDG 12: Responsible Consumption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductDetails() {
  // Read product id from URL parameter
  const { id } = useParams()

  // Find product by id from the shared data array
  const product = products.find((item) => String(item.id) === String(id))

  // Handle product not found state
  if (!product) {
    return (
      <div className="product-not-found-page">
        <div className="not-found-card">
          <p className="not-found-eyebrow">SEWORA Archive</p>
          <h1 className="not-found-title">Product not found</h1>
          <p className="not-found-text">
            The piece you are looking for does not exist or has been retired from our capsule.
          </p>
          <Link to="/products" className="btn btn-primary not-found-link">
            &larr; Back to all products
          </Link>
        </div>
      </div>
    )
  }

  // Keyed by product.id to automatically re-initialize state when navigating between products
  return <ProductView key={product.id} product={product} />
}

export default ProductDetails
