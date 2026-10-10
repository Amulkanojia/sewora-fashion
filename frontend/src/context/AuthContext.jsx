/* eslint-disable react-refresh/only-export-components */
// src/context/AuthContext.jsx
// React Context for managing user authentication state with localStorage persistence
import { createContext, useContext, useState, useEffect } from 'react'
import { loginUser, registerUser } from '../services/api'

const AUTH_STORAGE_KEY = 'seworaUser'

// Safely load saved user session from localStorage on initial render
const loadUserFromStorage = () => {
  try {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.error('Error reading user from localStorage:', error)
  }
  return null
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // User state: null or { token, name, email, role }
  const [user, setUser] = useState(loadUserFromStorage)

  // Persist user to localStorage under key "seworaUser"
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    } catch (error) {
      console.error('Error saving user to localStorage:', error)
    }
  }, [user])

  // Login handler
  const login = async (email, password) => {
    const data = await loginUser(email, password)
    setUser(data)
    return data
  }

  // Register handler
  const register = async (name, email, password) => {
    const data = await registerUser(name, email, password)
    setUser(data)
    return data
  }

  // Logout handler
  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    } catch (error) {
      console.error('Error removing user from localStorage:', error)
    }
  }

  const value = {
    user,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to consume authentication context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
