// src/pages/Register.jsx
// User registration page with form validation and link to login
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

function Register() {
  // Form fields state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Handle registration submission with validation
  const handleSubmit = (event) => {
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

    // Form is valid: log values and prepare for backend integration
    console.log('Register user details:', { name, email, password })
    // TODO: connect to backend API
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

          {/* Validation Error Message */}
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
              />
            </div>

            <button type="submit" className="btn btn-primary auth-submit-btn">
              Create account
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
