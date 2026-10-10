// src/components/Navbar.jsx
// Header navigation with React Router Link components, live cart counter, and user authentication state
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { cartCount } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Extract user's first name for personal greeting
  const firstName = user?.name ? user.name.trim().split(' ')[0] : 'User'

  // Handle logout and redirect to home
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">SEWORA</Link>

        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
          <Link to="/about">About</Link>
        </nav>

        <div className="navbar-actions">
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart ({cartCount})</Link>
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
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar