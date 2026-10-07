// src/components/Categories.jsx
// Three curated category cards: Women, Men, Accessories
import './Categories.css'

// Category items data with soft placeholder background tones
const categoryList = [
  {
    id: 'women',
    title: 'Women',
    subtitle: 'Flowing silks, organic knits & relaxed tailoring',
    palette: '#efeae2',
    itemCount: '28 Essentials',
  },
  {
    id: 'men',
    title: 'Men',
    subtitle: 'Crisp hemp shirts, raw trousers & pure linen',
    palette: '#e7e5de',
    itemCount: '22 Essentials',
  },
  {
    id: 'accessories',
    title: 'Accessories',
    subtitle: 'Canvas carriers, reclaimed brass & mindful accents',
    palette: '#e8e2d7',
    itemCount: '16 Essentials',
  },
]

function Categories() {
  return (
    <section id="categories" className="categories-section">
      <div className="categories-container">
        {/* Section title & intro */}
        <div className="categories-header">
          <p className="categories-eyebrow">Mindful Selections</p>
          <h2 className="categories-title">Shop by Category</h2>
          <p className="categories-subtitle">
            Explore versatile pieces designed for longevity, comfort, and sustainable everyday living.
          </p>
        </div>

        {/* 3 Category Cards Grid */}
        <div className="categories-grid">
          {categoryList.map((category) => (
            <div key={category.id} className="category-card">
              {/* Soft colored placeholder block (replaces external images) */}
              <div
                className="category-placeholder"
                style={{ backgroundColor: category.palette }}
              >
                <div className="placeholder-watermark">{category.title.toUpperCase()}</div>
                <span className="category-count-badge">{category.itemCount}</span>
              </div>

              {/* Category card details */}
              <div className="category-info">
                <h3 className="category-name">{category.title}</h3>
                <p className="category-desc">{category.subtitle}</p>
                <a href="#featured-products" className="category-link">
                  Explore Collection
                  <span className="category-arrow" aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
