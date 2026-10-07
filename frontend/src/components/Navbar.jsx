function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="/" className="navbar-logo">SEWORA</a>

        <nav className="navbar-links">
          <a href="/">Home</a>
          <a href="/products">Shop</a>
          <a href="/about">About</a>
        </nav>

        <div className="navbar-actions">
          <a href="/wishlist">Wishlist</a>
          <a href="/cart">Cart (0)</a>
          <a href="/login">Login</a>
        </div>
      </div>
    </header>
  )
}

export default Navbar