// src/pages/Products.jsx
// Products catalog page with search, category filters, sorting, and responsive grid
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/api'
import { useCart } from '../context/CartContext'
import './Products.css'

const categories = ['All', 'Women', 'Men', 'Accessories']

function Products() {
  const { addToCart } = useCart()

  // Products from API state
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filter and sort state
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('default')

  // Wishlist and cart feedback state
  const [wishlist, setWishlist] = useState([])
  const [addedItems, setAddedItems] = useState({})

  // Fetch products from backend on mount
  useEffect(() => {
    let isMounted = true
    setLoading(true)
    setError(null)

    getProducts()
      .then((data) => {
        if (isMounted) {
          setProducts(data)
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

  // Toggle wishlist for a given product
  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  // Handle Add to Cart using first available size on catalog cards
  const handleAddToCart = (product) => {
    const defaultSize = product.sizes?.[0] || 'One Size'
    addToCart(product, defaultSize, 1)

    setAddedItems((prev) => ({ ...prev, [product.id]: true }))
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }))
    }, 1600)
  }

  // Filter products by search query and category
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      product.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim())
    return matchesCategory && matchesSearch
  })

  // Sort filtered products based on sort selection
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    return 0 // default order from data
  })

  // Clear all active filters
  const resetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setSortBy('default')
  }

  return (
    <div className="products-page">
      <div className="products-container">
        {/* Page Header */}
        <header className="products-header">
          <p className="products-eyebrow">Mindful Wardrobe</p>
          <h1 className="products-title">All Products</h1>
          <p className="products-subtitle">
            Ethically crafted garments and timeless essentials made from certified organic,
            renewable materials that honor people and planet.
          </p>
        </header>

        {/* Loading state */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontSize: '18px', color: 'var(--color-muted)' }}>Loading...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontSize: '18px', color: 'var(--color-muted)' }}>
              Could not load products. Is the backend running?
            </p>
          </div>
        )}

        {/* Content when loaded successfully */}
        {!loading && !error && (
          <>
            {/* Filter and Search Controls Bar */}
            <div className="products-controls">
              {/* Search Box */}
              <div className="search-box">
                <span className="search-icon" aria-hidden="true">&#x1F50D;</span>
                <input
                  type="text"
                  placeholder="Search by product name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  aria-label="Search products"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="search-clear"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    &times;
                  </button>
                )}
              </div>

              {/* Category Filter Buttons */}
              <div className="category-filters" role="group" aria-label="Category filters">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`category-filter-btn ${
                      selectedCategory === cat ? 'active' : ''
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="sort-box">
                <label htmlFor="sort-select" className="sort-label">Sort:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="default">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Results Count & Active Status */}
            <div className="results-summary">
              <span>
                Showing <strong>{sortedProducts.length}</strong> of{' '}
                <strong>{products.length}</strong> pieces
              </span>
              {(searchQuery || selectedCategory !== 'All' || sortBy !== 'default') && (
                <button
                  type="button"
                  className="reset-filters-link"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              )}
            </div>

            {/* Product Cards Grid */}
            {sortedProducts.length > 0 ? (
              <div className="products-grid">
                {sortedProducts.map((product) => {
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
                            <span className="product-fabric-tag">
                              {product.fabric || product.color}
                            </span>

                            <div className="product-swatch-silhouette">
                              <span className="silhouette-label">{product.category}</span>
                            </div>
                          </div>
                        </Link>

                        {/* Wishlist Button */}
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

                      {/* Product Details */}
                      <div className="product-details">
                        <div className="product-meta">
                          <span className="product-category">{product.category}</span>
                          <span className="product-color">{product.color}</span>
                        </div>

                        <h2 className="product-name">
                          <Link to={`/products/${product.id}`} className="product-name-link">
                            {product.name}
                          </Link>
                        </h2>
                        <p className="product-description">{product.description}</p>

                        {/* Available Sizes */}
                        <div className="product-sizes">
                          <span className="sizes-label">Sizes:</span>
                          <span className="sizes-list">
                            {Array.isArray(product.sizes) ? product.sizes.join(' · ') : ''}
                          </span>
                        </div>

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
            ) : (
              /* Empty Search State */
              <div className="products-empty">
                <p className="empty-icon">&#x2605;</p>
                <h3 className="empty-title">No products found</h3>
                <p className="empty-text">
                  We couldn&apos;t find any conscious pieces matching &ldquo;{searchQuery}&rdquo; in {selectedCategory}.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={resetFilters}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Products
