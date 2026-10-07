// src/components/Hero.jsx
// Minimalist, premium hero section for SEWORA
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        {/* Left / Main text content */}
        <div className="hero-content">
          <p className="hero-eyebrow">Conscious Wardrobe &bull; Capsule 2026</p>
          <h1 className="hero-heading">Wear less.<br />Mean more.</h1>
          <p className="hero-subtext">
            Mindfully crafted garments made from certified organic fabrics and timeless silhouettes.
            Fashion that respects both people and planet, created to be cherished across seasons.
          </p>
          <div className="hero-cta-group">
            <a href="#featured-products" className="btn btn-primary hero-btn">
              Shop Now
            </a>
            <a href="#sustainability" className="btn btn-outline hero-btn">
              Our Ethos
            </a>
          </div>
        </div>

        {/* Right / Visual placeholder block (no external images) */}
        <div className="hero-media">
          <div className="hero-placeholder">
            <div className="hero-placeholder-card">
              <span className="hero-badge">SDG 12 Mindful Line</span>
              <div className="hero-swatch-graphic">
                <div className="swatch-shape swatch-shape-1"></div>
                <div className="swatch-shape swatch-shape-2"></div>
              </div>
              <p className="hero-caption">100% GOTS Certified Organic Linen &bull; Earth Dyes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
