// src/components/Footer.jsx
// Minimalist, elegant footer for SEWORA
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top footer row with brand info and link groups */}
        <div className="footer-top">
          {/* Brand identity column */}
          <div className="footer-brand-col">
            <a href="/" className="footer-brand-logo">SEWORA</a>
            <p className="footer-tagline">
              Wear less. Mean more. Thoughtfully designed sustainable fashion,
              crafted with organic textiles and ethical commitment.
            </p>
            <div className="footer-badge">
              UN SDG 12 &bull; Responsible Fashion
            </div>
          </div>

          {/* Navigation link columns */}
          <div className="footer-links-grid">
            <div className="footer-column">
              <h3 className="footer-heading">Collections</h3>
              <ul className="footer-links">
                <li><a href="#categories">Women</a></li>
                <li><a href="#categories">Men</a></li>
                <li><a href="#categories">Accessories</a></li>
                <li><a href="#featured-products">Featured Pieces</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Our Ethos</h3>
              <ul className="footer-links">
                <li><a href="#sustainability">SDG 12 Mission</a></li>
                <li><a href="#sustainability">Organic Linen &amp; Silk</a></li>
                <li><a href="#sustainability">Zero-Waste Promise</a></li>
                <li><a href="#sustainability">Artisan Living Wages</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Support</h3>
              <ul className="footer-links">
                <li><a href="#contact">Contact Atelier</a></li>
                <li><a href="#shipping">Shipping &amp; Returns</a></li>
                <li><a href="#care">Garment Care Guide</a></li>
                <li><a href="#faqs">Frequently Asked</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} SEWORA. All rights reserved. Thoughtfully crafted for a sustainable future.
          </p>
          <div className="footer-legal">
            <a href="#privacy">Privacy</a>
            <span>&bull;</span>
            <a href="#terms">Terms</a>
            <span>&bull;</span>
            <a href="#transparency">Supply Transparency</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
