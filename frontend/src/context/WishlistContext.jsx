/* eslint-disable react-refresh/only-export-components */
// src/context/WishlistContext.jsx
// React Context for managing wishlist state with localStorage persistence
import { createContext, useContext, useState, useEffect } from 'react'

const WISHLIST_STORAGE_KEY = 'seworaWishlist'

// Safely load saved wishlist product ids from localStorage on initial render
const loadWishlistFromStorage = () => {
  try {
    const saved = localStorage.getItem(WISHLIST_STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) {
        return parsed
      }
    }
  } catch (error) {
    console.error('Error reading wishlist from localStorage:', error)
  }
  return []
}

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  // Array of saved product IDs
  const [wishlistIds, setWishlistIds] = useState(loadWishlistFromStorage)

  // Persist wishlistIds to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds))
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error)
    }
  }, [wishlistIds])

  // Check if a product ID exists in the wishlist
  const isInWishlist = (id) => {
    return wishlistIds.some((itemId) => String(itemId) === String(id))
  }

  // Toggle item in wishlist (add if not present, remove if present)
  const toggleWishlist = (id) => {
    setWishlistIds((prev) => {
      const exists = prev.some((itemId) => String(itemId) === String(id))
      if (exists) {
        return prev.filter((itemId) => String(itemId) !== String(id))
      }
      return [...prev, id]
    })
  }

  // Remove specific product ID from wishlist
  const removeFromWishlist = (id) => {
    setWishlistIds((prev) => prev.filter((itemId) => String(itemId) !== String(id)))
  }

  // Number of items currently in the wishlist
  const wishlistCount = wishlistIds.length

  const value = {
    wishlistIds,
    toggleWishlist,
    isInWishlist,
    removeFromWishlist,
    wishlistCount,
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

// Custom hook to consume wishlist context
export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

export default WishlistContext
