// src/components/Sustainability.jsx
// Section highlighting UN SDG 12: Responsible Consumption and Production
import './Sustainability.css'

// 3 Core Sustainability Pillars aligned with SDG 12
const sustainabilityPoints = [
  {
    step: '01',
    title: 'Certified Organic & Pure Fibers',
    description:
      'We exclusively work with GOTS-certified organic cotton, flax linen, and regenerative hemp. No toxic pesticides, no petroleum synthetics, and zero microplastic shedding.',
  },
  {
    step: '02',
    title: 'Small-Batch & Zero Fabric Waste',
    description:
      'By producing strictly in limited capsules, we eliminate inventory waste and overproduction. All cutting scrap textiles are upcycled into paper bags and fabric trims.',
  },
  {
    step: '03',
    title: 'Fair Wages & Artisan Preservation',
    description:
      'Every tailor and weaver is paid a verified living wage under safe, dignified working conditions, keeping centuries of mindful handloom heritage alive.',
  },
]

function Sustainability() {
  return (
    <section id="sustainability" className="sustainability-section">
      <div className="sustainability-container">
        {/* Section Header */}
        <div className="sustainability-header">
          <div className="sdg-pill">
            <span className="sdg-badge">SDG 12</span>
            <span>Responsible Consumption &amp; Production</span>
          </div>

          <h2 className="sustainability-title">
            Fashion with a conscience, not a footprint.
          </h2>

          <p className="sustainability-subtitle">
            The fashion industry produces 92 million tons of textile waste each year.
            SEWORA operates in direct alignment with United Nations Sustainable Development Goal 12
            to ensure mindful sourcing, non-toxic manufacturing, and enduring craftsmanship.
          </p>
        </div>

        {/* 3 Core Points Grid */}
        <div className="sustainability-grid">
          {sustainabilityPoints.map((point) => (
            <div key={point.step} className="sustainability-card">
              <div className="step-number">{point.step}</div>
              <h3 className="step-title">{point.title}</h3>
              <p className="step-desc">{point.description}</p>
            </div>
          ))}
        </div>

        {/* Metric Highlights Strip */}
        <div className="sustainability-metrics">
          <div className="metric-item">
            <span className="metric-val">100%</span>
            <span className="metric-label">Plastic-Free Packaging</span>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <span className="metric-val">0%</span>
            <span className="metric-label">Virgin Synthetic Textiles</span>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <span className="metric-val">Fair</span>
            <span className="metric-label">Verified Artisan Wages</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Sustainability
