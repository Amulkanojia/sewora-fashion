// src/components/Categories.jsx
// Featured Collection section with sharp editorial cards and near-black media blocks
import { Link } from 'react-router-dom'
import './Categories.css'

const collections = [
  {
    id: 'women',
    categoryName: 'WOMEN',
    dropCode: 'DROP 01 // W',
    headline: 'ARCHITECTURAL FORM',
    description: 'Heavyweight organic knits, boxy hoodies, and relaxed structured trousers.',
    imageSrc: '/images/collection-women.jpg',
    tag: '12 SILHOUETTES',
  },
  {
    id: 'men',
    categoryName: 'MEN',
    dropCode: 'DROP 01 // M',
    headline: 'HEAVY FOUNDATIONS',
    description: 'Raw hemp overshirts, 300 GSM tees, and wide-leg engineered utility pants.',
    imageSrc: '/images/collection-men.jpg',
    tag: '14 SILHOUETTES',
  },
  {
    id: 'accessories',
    categoryName: 'ACCESSORIES',
    dropCode: 'DROP 01 // ACC',
    headline: 'MODULAR GEAR',
    description: 'Cordura sling carriers, reclaimed hardware buckles, and brutalist caps.',
    imageSrc: '/images/collection-accessories.jpg',
    tag: '08 OBJECTS',
  },
]

function Categories() {
  return (
    <section id="categories" className="categories-section">
      <div className="categories-container">
        {/* Section Header */}
        <div className="categories-header">
          <div className="categories-eyebrow-row">
            <span className="streetwear-badge-lime">CURATED DROPS</span>
            <span className="categories-eyebrow-text">AUTUMN / WINTER 2026</span>
          </div>
          <h2 className="categories-title">FEATURED COLLECTION</h2>
          <p className="categories-subtitle">
            Engineered modular systems constructed from certified organic textiles.
            Purpose-built garments tailored for modern city movement.
          </p>
        </div>

        {/* 3-Column Collection Grid */}
        <div className="categories-grid">
          {collections.map((item) => (
            <Link
              key={item.id}
              to="/products"
              className="collection-card"
              aria-label={`View ${item.categoryName} collection`}
            >
              {/* Media Block with /images fallback */}
              <div className="collection-media-block">
                <img
                  src={item.imageSrc}
                  alt={item.categoryName}
                  className="collection-img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                {/* Monolithic overlay details */}
                <div className="collection-media-overlay" aria-hidden="true">
                  <span className="collection-drop-badge">{item.dropCode}</span>
                  <span className="collection-tag-pill">{item.tag}</span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="collection-content">
                <div className="collection-meta-top">
                  <span className="collection-category">{item.categoryName}</span>
                  <span className="collection-arrow">&rarr;</span>
                </div>
                <h3 className="collection-headline">{item.headline}</h3>
                <p className="collection-desc">{item.description}</p>
                <div className="collection-cta">
                  <span>DISCOVER DROP</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
