// src/components/Hero.jsx
// Premium streetwear editorial hero section
import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Editorial Text Content */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-badge-lime">SEWORA ATELIER</span>
            <span className="hero-eyebrow-text">CAPSULE 2026 // LIMITED RELEASE</span>
          </div>

          <h1 className="hero-title">
            BUILT TO<br />STAND APART.
          </h1>

          <p className="hero-description">
            Architectural silhouettes, raw heavyweight organic textiles, and zero compromise.
            Engineered for life in motion and constructed to endure season after season.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary hero-btn-main">
              SHOP THE COLLECTION
            </Link>
            <a href="#campaign" className="btn btn-outline hero-btn-sub">
              THE MANIFESTO
            </a>
          </div>

          {/* Editorial Specs Bar */}
          <div className="hero-specs">
            <div className="spec-item">
              <span className="spec-label">FABRIC</span>
              <span className="spec-value">480 GSM ORGANIC FLEECE</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">ORIGIN</span>
              <span className="spec-value">CERTIFIED ETHICAL MILLS</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">BATCH</span>
              <span className="spec-value">LIMITED RUN 01</span>
            </div>
          </div>
        </div>

        {/* Large Visual Block with /images/hero.jpg */}
        <div className="hero-media-wrap">
          <div className="hero-image-block">
            <img
              src="/images/hero.jpg"
              alt="SEWORA Streetwear Editorial"
              className="hero-image"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            {/* Editorial overlay markings */}
            <div className="hero-block-overlay" aria-hidden="true">
              <div className="overlay-corner top-left">
                <span className="corner-mark">[+]</span>
                <span>LOOKBOOK 01</span>
              </div>
              <div className="overlay-corner top-right">
                <span className="corner-accent">SEWORA // 26</span>
              </div>
              <div className="overlay-corner bottom-left">
                <span>COORD: 28.6139° N, 77.2090° E</span>
              </div>
              <div className="overlay-corner bottom-right">
                <span className="corner-lime-dot"></span>
                <span>ACTIVE DROP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
