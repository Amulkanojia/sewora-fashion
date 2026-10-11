/* eslint-disable react-refresh/only-export-components */
// src/context/ToastContext.jsx
// React Context for displaying ephemeral toast notifications
import { createContext, useContext, useState, useRef, useCallback } from 'react'
import Toast from '../components/Toast'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toastMessage, setToastMessage] = useState(null)
  const timerRef = useRef(null)

  // Show a toast message and automatically dismiss after 2.5 seconds
  const showToast = useCallback((message) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    setToastMessage(message)
    timerRef.current = setTimeout(() => {
      setToastMessage(null)
    }, 2500)
  }, [])

  const closeToast = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    setToastMessage(null)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast message={toastMessage} onClose={closeToast} />
    </ToastContext.Provider>
  )
}

// Custom hook to trigger toast notifications
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export default ToastContext
