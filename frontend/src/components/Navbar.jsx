// src/components/Navbar.jsx
// Header navigation with React Router Link components
import { Link } from 'react-router-dom'

function Navbar() {
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
          <Link to="/cart">Cart (0)</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar