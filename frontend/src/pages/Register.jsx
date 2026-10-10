// src/pages/Register.jsx
// User registration page with form validation, backend registration, and redirection
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  // Form fields state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // Handle registration submission with validation and backend API call
  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')

    // Validation: check for empty fields
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage('Please fill in all fields.')
      return
    }

    // Validation: password minimum length
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.')
      return
    }

    // Validation: passwords matching
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    try {
      setLoading(true)
      await register(name, email, password)
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
            <p className="auth-eyebrow">SEWORA Community</p>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">
              Join SEWORA for conscious capsule drops, early access, and sustainable fashion care.
            </p>
          </div>

          {/* Validation or Server Error Message */}
          {errorMessage && (
            <div className="auth-error-banner" role="alert">
              <span className="auth-error-icon">&bull;</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Registration Form */}
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="register-name" className="auth-label">
                Full Name
              </label>
              <input
                id="register-name"
                type="text"
                className="auth-input"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                disabled={loading}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-email" className="auth-label">
                Email Address
              </label>
              <input
                id="register-email"
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
              <label htmlFor="register-password" className="auth-label">
                Password
              </label>
              <input
                id="register-password"
                type="password"
                className="auth-input"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                disabled={loading}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-confirm-password" className="auth-label">
                Confirm Password
              </label>
              <input
                id="register-confirm-password"
                type="password"
                className="auth-input"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit-btn"
              disabled={loading}
            >
              {loading ? 'Please wait...' : 'Create account'}
            </button>
          </form>

          {/* Link to Login */}
          <div className="auth-switch">
            <span>Already have an account?</span>
            <Link to="/login" className="auth-switch-link">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
