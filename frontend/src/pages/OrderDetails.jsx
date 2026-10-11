// src/pages/OrderDetails.jsx
// Order details page showing full order information, items table, and delivery address
import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getOrderById } from '../services/api'
import './OrderDetails.css'

function OrderDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch single order details by id
  useEffect(() => {
    let isMounted = true
    if (!user?.token || !id) return

    getOrderById(id, user.token)
      .then((data) => {
        if (isMounted) {
          setOrder(data)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load order details.')
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [id, user?.token])

  // Redirect to login if unauthenticated
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="order-details-page">
      <div className="order-details-container">
        {/* Navigation link back to orders */}
        <div className="order-details-back-wrap">
          <Link to="/orders" className="order-details-back-link">
            &larr; Back to orders
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="order-details-status-card">
            <p className="order-details-status-text">Loading order details...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="order-details-status-card">
            <div className="order-details-error-banner" role="alert">
              <span className="order-details-error-icon">&bull;</span>
              <span>{error}</span>
            </div>
            <Link to="/orders" className="btn btn-outline order-details-back-btn">
              Back to orders
            </Link>
          </div>
        )}

        {/* Loaded Order View */}
        {!loading && !error && order && (
          <div className="order-details-content">
            {/* Order Header */}
            <header className="order-details-header">
              <div className="order-details-header-top">
                <div>
                  <p className="order-details-eyebrow">Order Summary</p>
                  <h1 className="order-details-title">Order #{order.id}</h1>
                </div>
                <div className="order-details-badge-wrap">
                  <span className="streetwear-badge streetwear-badge-lime">
                    {order.status || 'PLACED'}
                  </span>
                </div>
              </div>

              <div className="order-details-meta-bar">
                <span className="order-meta-entry">
                  <strong>Placed on:</strong> {formatDate(order.createdAt)}
                </span>
                <span className="order-meta-separator">&bull;</span>
                <span className="order-meta-entry">
                  <strong>Payment Method:</strong> {order.paymentMethod}
                </span>
              </div>
            </header>

            {/* Two-Column Info Grid: Shipping Address & Summary Overview */}
            <div className="order-details-grid">
              {/* Delivery Address Card */}
              <section className="order-details-card">
                <h2 className="order-details-section-title">Delivery Address</h2>
                <div className="order-address-content">
                  <p className="order-address-name">{order.customerName}</p>
                  <p className="order-address-line">{order.address}</p>
                  <p className="order-address-line">
                    {order.city} - {order.pincode}
                  </p>
                  <p className="order-address-contact">
                    <strong>Phone:</strong> {order.phone}
                  </p>
                </div>
              </section>

              {/* Payment & Logistics Card */}
              <section className="order-details-card">
                <h2 className="order-details-section-title">Payment & Dispatch</h2>
                <div className="order-logistics-content">
                  <div className="logistics-row">
                    <span className="logistics-label">Payment Method</span>
                    <span className="logistics-value">{order.paymentMethod}</span>
                  </div>
                  <div className="logistics-row">
                    <span className="logistics-label">Fulfillment Status</span>
                    <span className="logistics-value status-highlight">
                      {order.status || 'PLACED'}
                    </span>
                  </div>
                  <div className="logistics-row">
                    <span className="logistics-label">Packaging</span>
                    <span className="logistics-value">100% Plastic-Free Compostable</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Items Table Card */}
            <section className="order-details-card order-items-card">
              <h2 className="order-details-section-title">Purchased Items</h2>

              <div className="order-table-responsive">
                <table className="order-items-table">
                  <thead>
                    <tr>
                      <th scope="col" className="table-col-product">Product</th>
                      <th scope="col" className="table-col-size">Size</th>
                      <th scope="col" className="table-col-qty">Quantity</th>
                      <th scope="col" className="table-col-price">Price</th>
                      <th scope="col" className="table-col-total">Line Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items && order.items.map((item, index) => {
                      const lineTotal = (item.price || 0) * (item.quantity || 1)

                      return (
                        <tr key={index} className="order-item-row">
                          <td className="table-col-product">
                            <span className="item-name">
                              {item.productName || item.name}
                            </span>
                          </td>
                          <td className="table-col-size">
                            <span className="item-size-badge">{item.size}</span>
                          </td>
                          <td className="table-col-qty">
                            {item.quantity}
                          </td>
                          <td className="table-col-price">
                            ₹{Number(item.price || 0).toLocaleString('en-IN')}
                          </td>
                          <td className="table-col-total">
                            <strong>₹{Number(lineTotal).toLocaleString('en-IN')}</strong>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Order Totals Summary */}
              <div className="order-totals-summary">
                <div className="totals-line">
                  <span className="totals-label">Subtotal</span>
                  <span className="totals-value">
                    ₹{Number(order.totalAmount || 0).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="totals-line">
                  <span className="totals-label">Carbon-Neutral Shipping</span>
                  <span className="totals-value totals-free">Complimentary</span>
                </div>
                <div className="totals-line final-total-line">
                  <span className="final-total-label">Total Amount</span>
                  <span className="final-total-value">
                    ₹{Number(order.totalAmount || 0).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </section>

            {/* Bottom Actions */}
            <div className="order-details-bottom-actions">
              <Link to="/orders" className="btn btn-outline">
                &larr; Back to orders
              </Link>
              <Link to="/products" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
