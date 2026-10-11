// src/pages/About.jsx
// Brand story and sustainability manifesto page aligned with UN SDG 12
import { Link } from 'react-router-dom'
import './About.css'

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        {/* Page Header */}
        <header className="about-header">
          <p className="about-eyebrow">Conscious Streetwear Manifesto</p>
          <h1 className="about-title">Architectural Silhouettes. Zero Sacrifice.</h1>
          <p className="about-subtitle">
            SEWORA was founded on an uncompromising principle: heavy, sharp streetwear
            engineered for life in motion without degrading people or the planet.
          </p>
        </header>

        {/* Brand Story Section */}
        <section className="about-story-section">
          <h2 className="about-section-label">The Story</h2>
          <div className="about-story-paragraphs">
            <p>
              We rejected the disposable rhythm of modern fast-fashion streetwear.
              Too many garments are designed to fall apart in weeks, spun from synthetic
              blends that choke waterways and line landfills. SEWORA was conceived in the
              workshop as an architectural antidote.
            </p>
            <p>
              Every garment in our capsule is drafted from raw, heavyweight plant textiles
              and deadstock-neutral patterns. We believe true luxury lies in weight,
              structural permanence, and total supply-chain transparency from organic seed
              to finished seam.
            </p>
          </div>
        </section>

        {/* Key Metrics / Numbers Row */}
        <section className="about-stats-grid" aria-label="Key Brand Metrics">
          <div className="about-stat-card">
            <span className="stat-number">480 GSM</span>
            <span className="stat-label">Organic fleece & heavyweight textiles</span>
          </div>
          <div className="about-stat-card">
            <span className="stat-number">Limited Runs</span>
            <span className="stat-label">Micro-batch drops to prevent surplus waste</span>
          </div>
          <div className="about-stat-card">
            <span className="stat-number">Certified Mills</span>
            <span className="stat-label">Fair-wage verified artisan crafting ateliers</span>
          </div>
        </section>

        {/* Three Sustainability Pillars Tied to UN SDG 12 */}
        <section className="about-pillars-section">
          <div className="about-pillars-header">
            <h2 className="about-pillars-title">Circular Foundations</h2>
            <p className="about-pillars-tagline">
              Aligned with UN SDG 12: Responsible Consumption and Production
            </p>
          </div>

          <div className="about-pillars-grid">
            {/* Pillar 1 */}
            <article className="pillar-card">
              <div className="pillar-header">
                <span className="pillar-sdg-tag">SDG 12.2 Target</span>
                <h3 className="pillar-title">Recycled & Organic Materials</h3>
              </div>
              <p className="pillar-description">
                100% of our fabrics are certified organic cotton, French flax linen,
                or recycled canvas. We never use virgin polyester, petroleum synthetics,
                or harmful chemical finishes.
              </p>
            </article>

            {/* Pillar 2 */}
            <article className="pillar-card">
              <div className="pillar-header">
                <span className="pillar-sdg-tag">SDG 12.5 Target</span>
                <h3 className="pillar-title">Limited Runs to Reduce Waste</h3>
              </div>
              <p className="pillar-description">
                We manufacture in tightly calculated limited batches calibrated to
                real community demand. No surplus warehouse deadstock, no incinerated
                inventory, and zero landfill dumping.
              </p>
            </article>

            {/* Pillar 3 */}
            <article className="pillar-card">
              <div className="pillar-header">
                <span className="pillar-sdg-tag">SDG 12.8 Target</span>
                <h3 className="pillar-title">Ethical Mills & Fair Wages</h3>
              </div>
              <p className="pillar-description">
                Every silhouette is constructed in certified fair-wage partner mills.
                Our master artisans work in safe, dignified spaces and receive
                living wages that support generational family security.
              </p>
            </article>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="about-cta-section">
          <h2 className="about-cta-title">Experience the Capsule</h2>
          <p className="about-cta-text">
            Explore our curated drops of raw streetwear staples constructed with zero compromise.
          </p>
          <Link to="/products" className="btn btn-primary about-cta-btn">
            Shop the Collection
          </Link>
        </section>
      </div>
    </div>
  )
}

export default About
