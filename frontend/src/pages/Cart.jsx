// src/pages/Cart.jsx
// Shopping cart page showing added items, quantity adjustments, line totals, and order summary
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartCount, cartTotal } = useCart()

  // Empty cart view
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-empty-card">
            <span className="cart-empty-icon" aria-hidden="true">&#x1F6D2;</span>
            <h1 className="cart-empty-title">Your shopping bag is empty</h1>
            <p className="cart-empty-text">
              Discover our thoughtful collections of sustainable, organic fashion essentials.
            </p>
            <Link to="/products" className="btn btn-primary cart-continue-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Page Title */}
        <header className="cart-header">
          <h1 className="cart-title">Your Shopping Bag</h1>
          <p className="cart-subtitle">
            {cartCount} {cartCount === 1 ? 'conscious piece' : 'conscious pieces'} selected
          </p>
        </header>

        {/* Two-Column Layout: Items List & Order Summary */}
        <div className="cart-grid">
          {/* Cart Items List */}
          <div className="cart-items-section">
            <div className="cart-items-list">
              {cartItems.map((item) => {
                const lineTotal = item.price * item.quantity

                return (
                  <div key={`${item.id}-${item.size}`} className="cart-item-card">
                    {/* Item Thumbnail Placeholder */}
                    <Link
                      to={`/products/${item.id}`}
                      className="cart-item-media"
                      style={{ backgroundColor: item.placeholderBg || '#ece6dd' }}
                      aria-label={item.name}
                    >
                      <span className="cart-media-label">{item.size}</span>
                    </Link>

                    {/* Item Info */}
                    <div className="cart-item-info">
                      <div className="cart-item-header">
                        <h2 className="cart-item-name">
                          <Link to={`/products/${item.id}`} className="cart-item-link">
                            {item.name}
                          </Link>
                        </h2>
                        <button
                          type="button"
                          className="cart-remove-btn"
                          onClick={() => removeFromCart(item.id, item.size)}
                          aria-label={`Remove ${item.name} (${item.size}) from cart`}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="cart-item-attributes">
                        <span className="cart-attr">
                          <strong>Size:</strong> {item.size}
                        </span>
                        {item.color && (
                          <span className="cart-attr">
                            <strong>Color:</strong> {item.color}
                          </span>
                        )}
                        <span className="cart-attr-price">
                          ₹{item.price.toLocaleString('en-IN')} each
                        </span>
                      </div>

                      {/* Quantity Selector & Line Total */}
                      <div className="cart-item-footer">
                        <div className="cart-quantity-box">
                          <button
                            type="button"
                            className="cart-qty-btn"
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            &minus;
                          </button>
                          <span className="cart-qty-value">{item.quantity}</span>
                          <button
                            type="button"
                            className="cart-qty-btn"
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <div className="cart-line-total">
                          ₹{lineTotal.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="cart-back-shopping">
              <Link to="/products" className="continue-shopping-link">
                &larr; Continue shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="cart-summary-section">
            <div className="cart-summary-card">
              <h2 className="cart-summary-title">Order Summary</h2>

              <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Carbon-Neutral Shipping</span>
                <span className="summary-value summary-free">Complimentary</span>
              </div>

              <div className="summary-row summary-total-row">
                <span className="summary-total-label">Total</span>
                <span className="summary-total-value">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <p className="summary-tax-note">
                Taxes included. Handcrafted with low-impact natural processes.
              </p>

              {/* Checkout Button linking to /checkout */}
              <Link to="/checkout" className="btn btn-primary cart-checkout-btn">
                Checkout
              </Link>

              {/* Sustainability Pledge */}
              <div className="summary-perks">
                <div className="summary-perk-item">
                  <span className="perk-bullet">&#x2713;</span>
                  <span>UN SDG 12: Responsible Consumption</span>
                </div>
                <div className="summary-perk-item">
                  <span className="perk-bullet">&#x2713;</span>
                  <span>100% plastic-free recycled packaging</span>
                </div>
                <div className="summary-perk-item">
                  <span className="perk-bullet">&#x2713;</span>
                  <span>Fair-wage verified artisan crafting</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Cart
