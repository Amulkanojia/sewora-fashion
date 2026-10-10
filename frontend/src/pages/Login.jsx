// src/pages/Login.jsx
// User login page with form validation, backend authentication, and redirection
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  // Form fields state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // Handle login submission with validation and backend API call
  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')

    // Validation: check for empty fields
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please fill in both email and password.')
      return
    }

    // Validation: password minimum length
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.')
      return
    }

    try {
      setLoading(true)
      await login(email, password)
      navigate('/')
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <p className="auth-eyebrow">SEWORA Account</p>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">
              Sign in to access your orders, wishlist, and conscious wardrobe.
            </p>
          </div>

          {/* Validation or Server Error Message */}
          {errorMessage && (
            <div className="auth-error-banner" role="alert">
              <span className="auth-error-icon">&bull;</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="login-email" className="auth-label">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                className="auth-input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                disabled={loading}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="login-password" className="auth-label">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                className="auth-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit-btn"
              disabled={loading}
            >
              {loading ? 'Please wait...' : 'Login'}
            </button>
          </form>

          {/* Link to Register */}
          <div className="auth-switch">
            <span>Don&apos;t have an account?</span>
            <Link to="/register" className="auth-switch-link">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
