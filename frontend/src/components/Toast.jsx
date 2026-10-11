// src/components/Toast.jsx
// Minimal streetwear toast notification popup
import './Toast.css'

function Toast({ message, onClose }) {
  if (!message) return null

  return (
    <aside className="toast-container" role="status" aria-live="polite">
      <span className="toast-message">{message}</span>
      {onClose && (
        <button
          type="button"
          className="toast-close-btn"
          onClick={onClose}
          aria-label="Dismiss notification"
        >
          &times;
        </button>
      )}
    </aside>
  )
}

export default Toast
