// src/pages/NotFound.jsx
// 404 page for unmatched routes in SEWORA
import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-container">
        <div className="notfound-card">
          <div className="notfound-code">404</div>
          <span className="notfound-eyebrow">VOID ZONE // SILHOUETTE NOT FOUND</span>
          <p className="notfound-message">
            The page or silhouette you are looking for does not exist, has been
            retired from our capsule, or has moved to a new coordinate.
          </p>
          <Link to="/" className="btn btn-primary notfound-btn">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
