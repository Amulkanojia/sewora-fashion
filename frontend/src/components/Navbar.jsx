// src/components/Navbar.jsx
// Premium streetwear header navigation with live cart count, authentication, and mobile hamburger menu
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const { cartCount } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Extract user's first name for personal greeting
  const firstName = user?.name ? user.name.trim().split(' ')[0] : 'User'

  // Handle logout and redirect to home
  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
    navigate('/')
  }

  const closeMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          SEWORA
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links" aria-label="Main Navigation">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/products" className="navbar-link">Shop</Link>
          <a href="#campaign" className="navbar-link">About</a>
        </nav>

        {/* Desktop Right Actions */}
        <div className="navbar-actions">
          <Link to="/products" className="navbar-link">Wishlist</Link>
          <Link to="/cart" className="navbar-link navbar-cart-link">
            Cart <span className="navbar-cart-count">({cartCount})</span>
          </Link>
          {user ? (
            <div className="navbar-user">
              <span className="navbar-user-greeting">Hi, {firstName}</span>
              <button
                type="button"
                className="navbar-logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="navbar-link navbar-login-link">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button (visible under 768px) */}
        <button
          type="button"
          className={`navbar-hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span className="hamburger-line line-1"></span>
          <span className="hamburger-line line-2"></span>
          <span className="hamburger-line line-3"></span>
        </button>
      </div>

      {/* Mobile Drawer Menu (under 768px) */}
      <div className={`navbar-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <div className="navbar-mobile-content">
          <nav className="navbar-mobile-links">
            <Link to="/" className="mobile-link" onClick={closeMenu}>Home</Link>
            <Link to="/products" className="mobile-link" onClick={closeMenu}>Shop</Link>
            <a href="#campaign" className="mobile-link" onClick={closeMenu}>About</a>
            <Link to="/products" className="mobile-link" onClick={closeMenu}>Wishlist</Link>
            <Link to="/cart" className="mobile-link" onClick={closeMenu}>
              Cart ({cartCount})
            </Link>
          </nav>

          <div className="navbar-mobile-auth">
            {user ? (
              <div className="mobile-user-row">
                <span className="navbar-user-greeting">Hi, {firstName}</span>
                <button
                  type="button"
                  className="navbar-logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary mobile-login-btn" onClick={closeMenu}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar