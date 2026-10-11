// src/pages/MyOrders.jsx
// Order history page showing the user's placed orders with status and links to details
import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getMyOrders } from '../services/api'
import './MyOrders.css'

function MyOrders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch logged-in user's orders
  const refetch = () => {
    if (!user?.token) return
    setLoading(true)
    setError('')
    getMyOrders(user.token)
      .then((data) => {
        setOrders(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load orders. Please try again.')
        setLoading(false)
      })
  }

  useEffect(() => {
    let isMounted = true
    if (!user?.token) return

    getMyOrders(user.token)
      .then((data) => {
        if (isMounted) {
          setOrders(Array.isArray(data) ? data : [])
          setLoading(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load orders. Please try again.')
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [user?.token])

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
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        {/* Page Header */}
        <header className="orders-header">
          <p className="orders-eyebrow">Account Dashboard</p>
          <h1 className="orders-title">My Orders</h1>
          <p className="orders-subtitle">
            Track and review your previous SEWORA conscious streetwear orders.
          </p>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="orders-status-card">
            <div className="orders-loading-spinner" aria-hidden="true" />
            <p className="orders-loading-text">Loading your orders...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="orders-status-card">
            <div className="orders-error-banner" role="alert">
              <span className="orders-error-icon">&bull;</span>
              <span>{error}</span>
            </div>
            <button
              type="button"
              className="btn btn-outline orders-retry-btn"
              onClick={refetch}
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && orders.length === 0 && (
          <div className="orders-empty-card">
            <span className="orders-empty-icon" aria-hidden="true">&#x1F4E6;</span>
            <h2 className="orders-empty-title">No orders yet</h2>
            <p className="orders-empty-text">
              You haven&apos;t placed any orders with SEWORA yet. Explore our latest drops and conscious essentials.
            </p>
            <Link to="/products" className="btn btn-primary orders-empty-btn">
              Explore Products
            </Link>
          </div>
        )}

        {/* Orders List */}
        {!loading && !error && orders.length > 0 && (
          <div className="orders-list">
            {orders.map((order) => {
              const itemCount = order.items && order.items.length > 0
                ? order.items.reduce((total, item) => total + (item.quantity || 1), 0)
                : 0

              return (
                <article key={order.id} className="order-card">
                  {/* Card Header: Order Number, Date, Status */}
                  <div className="order-card-header">
                    <div className="order-header-left">
                      <span className="order-reference">Order #{order.id}</span>
                      <span className="order-date">{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="order-header-right">
                      <span className="streetwear-badge streetwear-badge-lime">
                        {order.status || 'PLACED'}
                      </span>
                    </div>
                  </div>

                  {/* Card Body: Items Preview */}
                  <div className="order-card-body">
                    {order.items && order.items.length > 0 && (
                      <div className="order-items-summary">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="order-item-snippet">
                            <span className="order-item-bullet">&bull;</span>
                            <span className="order-item-title">
                              {item.productName || item.name}
                            </span>
                            <span className="order-item-tags">
                              Size {item.size} &times; {item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Item count, Total, View Details link */}
                  <div className="order-card-footer">
                    <div className="order-meta-info">
                      <span className="order-count">
                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                      </span>
                      <span className="order-divider">|</span>
                      <span className="order-total-price">
                        Total: <strong>₹{Number(order.totalAmount || 0).toLocaleString('en-IN')}</strong>
                      </span>
                    </div>

                    <Link
                      to={`/orders/${order.id}`}
                      className="btn btn-outline order-action-btn"
                    >
                      View Details &rarr;
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders
