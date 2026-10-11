// src/components/Sustainability.jsx
// Asymmetrical editorial campaign section highlighting circular streetwear & SDG 12
import './Sustainability.css'

const campaignPillars = [
  {
    num: '01',
    label: 'PURE SUBSTRATES',
    title: 'GOTS Organic & Zero Synthetics',
    text: 'Engineered entirely from heavy 480 GSM organic cotton, natural hemp, and regenerative linen. Zero polyester blending, zero microplastic shedding, and non-toxic earthen dye formulas.',
  },
  {
    num: '02',
    label: 'RADICAL EFFICIENCY',
    title: 'Micro-Capsules & Zero Deadstock',
    text: 'Every garment is produced in strictly controlled limited runs. We eliminate industrial excess before it starts. All cutting waste is shredded and re-spun into reinforced hardware tape.',
  },
  {
    num: '03',
    label: 'ETHICAL FABRICATION',
    title: 'Fair Living Wages & Preserved Craft',
    text: 'Assembled by master tailors paid dignified, certified living wages with full transparent tracing from raw fiber to final stitch under United Nations SDG 12 frameworks.',
  },
]

function Sustainability() {
  return (
    <section id="campaign" className="campaign-section">
      <div className="campaign-container">
        {/* Asymmetrical Editorial Header Grid */}
        <div className="campaign-top-grid">
          {/* Left Column: Big Brutalist Manifesto */}
          <div className="campaign-manifesto">
            <div className="campaign-tag-row">
              <span className="streetwear-badge-lime">MANIFESTO // SDG 12</span>
              <span className="campaign-tag-sub">CIRCULAR PRODUCTION</span>
            </div>

            <h2 className="campaign-headline">
              CONSCIOUS CRAFT.<br />ZERO FOOTPRINT.
            </h2>

            <p className="campaign-lead-text">
              Fast fashion produces 92 million tons of landfill waste every year.
              SEWORA strips away obsolescence in favor of architectural permanence.
              We build brutalist streetwear designed to withstand years of heavy wear,
              grounded in certified circular ecology.
            </p>

            <div className="campaign-quote-box">
              <span className="quote-mark">&ldquo;</span>
              <p className="quote-text">
                WE REFUSE THE LOGIC OF CONSTANT CONSUMPTION. TRUE LUXURY IS AN ENDURING SILHOUETTE CRAFTED RESPONSIBLY.
              </p>
              <span className="quote-author">&mdash; SEWORA ATELIER MANIFESTO</span>
            </div>
          </div>

          {/* Right Column: Offset Large Campaign Visual Block */}
          <div className="campaign-visual-col">
            <div className="campaign-image-block">
              <img
                src="/images/campaign.jpg"
                alt="SEWORA Sustainable Campaign"
                className="campaign-image"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <div className="campaign-image-overlay" aria-hidden="true">
                <div className="cam-overlay-header">
                  <span className="cam-badge">CAMPAIGN 01</span>
                  <span className="cam-coords">COORD: SEWORA LABS</span>
                </div>
                <div className="cam-overlay-footer">
                  <span className="cam-dot"></span>
                  <span className="cam-status">CIRCULAR VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Asymmetrical 3-Pillar Cards Grid */}
        <div className="campaign-pillars-grid">
          {campaignPillars.map((pillar) => (
            <div key={pillar.num} className="pillar-card">
              <div className="pillar-top">
                <span className="pillar-num">{pillar.num}</span>
                <span className="pillar-label">{pillar.label}</span>
              </div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-text">{pillar.text}</p>
            </div>
          ))}
        </div>

        {/* High-Impact Metrics Strip */}
        <div className="campaign-metrics-strip">
          <div className="metric-box">
            <span className="metric-number">100%</span>
            <span className="metric-title">PLASTIC-FREE PACKAGING</span>
            <span className="metric-desc">Biodegradable cornstarch &amp; recycled kraft</span>
          </div>
          <div className="metric-separator" aria-hidden="true"></div>
          <div className="metric-box">
            <span className="metric-number">0%</span>
            <span className="metric-title">VIRGIN SYNTHETICS</span>
            <span className="metric-desc">Strictly zero polyester or nylon virgin fibers</span>
          </div>
          <div className="metric-separator" aria-hidden="true"></div>
          <div className="metric-box">
            <span className="metric-number">FAIR</span>
            <span className="metric-title">CERTIFIED ARTISAN WAGES</span>
            <span className="metric-desc">Independent auditing across every partner mill</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Sustainability
