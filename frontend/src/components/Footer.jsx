// src/components/Footer.jsx
// Near-black brutalist streetwear editorial footer
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Footer Section */}
        <div className="footer-top-grid">
          {/* Brand Manifesto Column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">SEWORA</Link>
            <p className="footer-tagline">
              BUILT TO STAND APART. Architectural silhouettes, raw heavyweight organic textiles,
              and uncompromising construction engineered for life in motion.
            </p>
            <div className="footer-drop-status">
              <span className="status-dot"></span>
              <span className="status-text">DROP 01 ACTIVE // GLOBAL DISPATCH</span>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="footer-columns-group">
            <div className="footer-col">
              <h4 className="footer-col-title">COLLECTIONS</h4>
              <ul className="footer-links-list">
                <li><Link to="/products">All Silhouettes</Link></li>
                <li><Link to="/products">Women Capsule</Link></li>
                <li><Link to="/products">Men Capsule</Link></li>
                <li><Link to="/products">Modular Gear</Link></li>
                <li><a href="#featured-products">New Arrivals</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">CIRCULAR ETHOS</h4>
              <ul className="footer-links-list">
                <li><a href="#campaign">UN SDG 12 Charter</a></li>
                <li><a href="#campaign">480 GSM Organics</a></li>
                <li><a href="#campaign">Zero Deadstock</a></li>
                <li><a href="#campaign">Artisan Living Wages</a></li>
                <li><a href="#campaign">Non-Toxic Dyes</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">ATELIER DIRECT</h4>
              <ul className="footer-links-list">
                <li><Link to="/cart">Client Cart</Link></li>
                <li><Link to="/login">Atelier Account</Link></li>
                <li><a href="#shipping">Worldwide Shipping</a></li>
                <li><a href="#care">Garment Longevity Care</a></li>
                <li><a href="#contact">Contact Atelier</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Legal */}
        <div className="footer-bottom-row">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} SEWORA ATELIER. ALL RIGHTS RESERVED. CONSTRUCTED WITH ZERO COMPROMISE.
          </p>
          <div className="footer-legal-links">
            <a href="#privacy">PRIVACY POLICY</a>
            <span className="legal-sep">/</span>
            <a href="#terms">TERMS OF SERVICE</a>
            <span className="legal-sep">/</span>
            <a href="#transparency">SUPPLY TRANSPARENCY</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
