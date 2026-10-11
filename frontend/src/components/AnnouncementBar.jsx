// src/components/AnnouncementBar.jsx
// Continuously scrolling slim streetwear announcement ticker above the navbar
import './AnnouncementBar.css'

const ANNOUNCEMENT_TEXT =
  'NEW DROP LIVE  //  FREE DELIVERY OVER Rs. 2,999  //  MADE FROM RECYCLED + ORGANIC FABRICS  //  '

function AnnouncementBar() {
  return (
    <div className="announcement-bar" role="region" aria-label="Announcement">
      <div className="announcement-track">
        {/* Primary announcement stream */}
        <span className="announcement-content">
          {ANNOUNCEMENT_TEXT}
          {ANNOUNCEMENT_TEXT}
        </span>
        {/* Mirrored stream for seamless continuous scroll loop */}
        <span className="announcement-content" aria-hidden="true">
          {ANNOUNCEMENT_TEXT}
          {ANNOUNCEMENT_TEXT}
        </span>
      </div>
    </div>
  )
}

export default AnnouncementBar
