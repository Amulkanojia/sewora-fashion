// src/pages/Checkout.jsx
// Checkout page with shipping address form, payment options, and order summary
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createOrder } from '../services/api'
import './Checkout.css'

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { user } = useAuth()

  // Form field states
  const [fullName, setFullName] = useState(user?.name || '')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')

  // Validation and order completion states
  const [errorMessage, setErrorMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState('')
  const [confirmedTotal, setConfirmedTotal] = useState(0)

  // Order confirmation view after successful checkout
  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-confirmation-card">
            <div className="confirmation-badge-icon" aria-hidden="true">&#x2713;</div>
            <p className="confirmation-eyebrow">Order Confirmed</p>
            <h1 className="confirmation-title">
              Thank you! Your order has been placed.
            </h1>
            <p className="confirmation-order-num">
              Order Reference: <strong>#{confirmedOrderNumber}</strong>
            </p>
            <p className="confirmation-text">
              We are preparing your handcrafted garments with sustainable packaging.
              Your total order value of <strong>₹{confirmedTotal.toLocaleString('en-IN')}</strong> will be handled via {paymentMethod}.
            </p>
            <div className="confirmation-actions">
              <Link to={`/orders/${confirmedOrderNumber}`} className="btn btn-outline" style={{ marginRight: '12px' }}>
                View Order
              </Link>
              <Link to="/products" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Not logged in: show message with link to /login instead of the form
  if (!user) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-empty-card">
            <span className="checkout-empty-icon" aria-hidden="true">&#x1F512;</span>
            <h1 className="checkout-empty-title">Please Log In</h1>
            <p className="checkout-empty-text">
              You need to be logged in to complete your checkout and place an order.
            </p>
            <Link to="/login" className="btn btn-primary checkout-empty-btn">
              Log In to Continue
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Empty cart view when order is not placed yet
  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-empty-card">
            <span className="checkout-empty-icon" aria-hidden="true">&#x1F6D2;</span>
            <h1 className="checkout-empty-title">Your shopping bag is empty</h1>
            <p className="checkout-empty-text">
              You do not have any items in your bag to checkout. Please explore our conscious collections first.
            </p>
            <Link to="/products" className="btn btn-primary checkout-empty-btn">
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Handle form submission and order placement
  const handlePlaceOrder = async (event) => {
    event.preventDefault()
    setErrorMessage('')

    // Validation for empty fields
    if (
      !fullName.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !pinCode.trim()
    ) {
      setErrorMessage('Please fill in all required shipping fields.')
      return
    }

    if (!user?.token) {
      setErrorMessage('Please log in again.')
      return
    }

    // Build order data for backend API
    const orderData = {
      customerName: fullName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      pincode: pinCode.trim(),
      paymentMethod,
      items: cartItems.map((item) => ({
        productId: Number(item.id) || item.id,
        size: item.size,
        quantity: item.quantity,
      })),
    }

    try {
      setSubmitting(true)
      const savedOrder = await createOrder(orderData, user.token)
      clearCart()
      setConfirmedOrderNumber(savedOrder.id)
      setConfirmedTotal(savedOrder.totalAmount || cartTotal)
      setOrderPlaced(true)
    } catch (err) {
      setErrorMessage(err.message || 'Failed to place order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Page Header */}
        <header className="checkout-header">
          <p className="checkout-eyebrow">Conscious Checkout</p>
          <h1 className="checkout-title">Complete Your Order</h1>
        </header>

        {/* Two-Column Responsive Layout */}
        <div className="checkout-grid">
          {/* Left Column: Shipping & Payment Form */}
          <div className="checkout-form-section">
            <div className="checkout-card">
              <h2 className="checkout-section-title">Shipping Address</h2>

              {/* Validation Error Message */}
              {errorMessage && (
                <div className="checkout-error-banner" role="alert">
                  <span className="checkout-error-icon">&bull;</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              <form className="checkout-form" onSubmit={handlePlaceOrder} noValidate>
                {/* Full Name */}
                <div className="checkout-field">
                  <label htmlFor="checkout-name" className="checkout-label">
                    Full Name *
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    className="checkout-input"
                    placeholder="e.g. Priya Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                {/* Phone */}
                <div className="checkout-field">
                  <label htmlFor="checkout-phone" className="checkout-label">
                    Phone Number *
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    className="checkout-input"
                    placeholder="e.g. 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                {/* Address */}
                <div className="checkout-field">
                  <label htmlFor="checkout-address" className="checkout-label">
                    Street Address *
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    className="checkout-input"
                    placeholder="House/Flat number, Street name"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                {/* City and PIN Code in a row */}
                <div className="checkout-form-row">
                  <div className="checkout-field">
                    <label htmlFor="checkout-city" className="checkout-label">
                      City *
                    </label>
                    <input
                      id="checkout-city"
                      type="text"
                      className="checkout-input"
                      placeholder="e.g. Jaipur"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="checkout-pincode" className="checkout-label">
                      PIN Code *
                    </label>
                    <input
                      id="checkout-pincode"
                      type="text"
                      className="checkout-input"
                      placeholder="e.g. 302001"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                    />
                  </div>
                </div>

                {/* Payment Method Section */}
                <div className="checkout-payment-section">
                  <h3 className="checkout-payment-title">Payment Method</h3>

                  <div className="payment-options-group">
                    <label
                      className={`payment-option-label ${
                        paymentMethod === 'Cash on Delivery' ? 'selected' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Cash on Delivery"
                        checked={paymentMethod === 'Cash on Delivery'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className="payment-option-text">
                        Cash on Delivery
                      </span>
                    </label>

                    <label
                      className={`payment-option-label ${
                        paymentMethod === 'UPI (simulated)' ? 'selected' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="UPI (simulated)"
                        checked={paymentMethod === 'UPI (simulated)'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className="payment-option-text">
                        UPI (simulated)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  className="btn btn-primary checkout-submit-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Placing order...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <aside className="checkout-summary-section">
            <div className="checkout-card checkout-summary-card">
              <h2 className="checkout-section-title">Order Summary</h2>

              {/* Items List */}
              <div className="checkout-items-list">
                {cartItems.map((item) => {
                  const lineTotal = item.price * item.quantity

                  return (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="checkout-item-row"
                    >
                      <div className="checkout-item-info">
                        <span className="checkout-item-name">{item.name}</span>
                        <div className="checkout-item-meta">
                          <span>Size: {item.size}</span>
                          <span>&bull;</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="checkout-item-price">
                        ₹{lineTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Totals Calculation */}
              <div className="checkout-totals">
                <div className="checkout-total-row">
                  <span className="total-label">Subtotal</span>
                  <span className="total-value">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="checkout-total-row">
                  <span className="total-label">Shipping</span>
                  <span className="total-value total-free">
                    Free (Climate-Neutral)
                  </span>
                </div>

                <div className="checkout-total-row final-total-row">
                  <span className="final-total-label">Total</span>
                  <span className="final-total-value">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Sustainable delivery pledge */}
              <div className="checkout-perks">
                <div className="checkout-perk">
                  <span className="perk-mark">&#x2713;</span>
                  <span>100% plastic-free packaging</span>
                </div>
                <div className="checkout-perk">
                  <span className="perk-mark">&#x2713;</span>
                  <span>UN SDG 12 Responsible Consumption</span>
                </div>
              </div>

              <div className="checkout-back-link-wrap">
                <Link to="/cart" className="checkout-back-link">
                  &larr; Return to shopping bag
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Checkout
