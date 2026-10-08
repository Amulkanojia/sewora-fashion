/* eslint-disable react-refresh/only-export-components */
// src/context/CartContext.jsx
// React Context for managing shopping cart state with localStorage persistence
import { createContext, useContext, useState, useEffect } from 'react'

// Key for saving cart state to browser storage
const CART_STORAGE_KEY = 'sewora_cart'

// Safely load saved cart items from localStorage on initial render
const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) {
        return parsed
      }
    }
  } catch (error) {
    console.error('Error reading cart from localStorage:', error)
  }
  return []
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
  // Initialize state from localStorage with safe fallback
  const [cartItems, setCartItems] = useState(loadCartFromStorage)

  // Persist cart items to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }, [cartItems])

  // Add an item to the cart, increasing quantity if same product & size already exists
  const addToCart = (product, size, quantity = 1) => {
    if (!product) return

    const selectedSize = size || (product.sizes?.[0] ? product.sizes[0] : 'One Size')
    const addQuantity = Math.max(1, Number(quantity) || 1)

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.size === selectedSize
      )

      if (existingIndex > -1) {
        // Increase quantity of the existing matching item
        return prevItems.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + addQuantity }
            : item
        )
      }

      // Add as a new item in the cart
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          size: selectedSize,
          quantity: addQuantity,
          color: product.color,
          placeholderBg: product.placeholderBg,
        },
      ]
    })
  }

  // Update item quantity with an enforced minimum of 1
  const updateQuantity = (id, size, quantity) => {
    const validQuantity = Math.max(1, Number(quantity) || 1)
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: validQuantity }
          : item
      )
    )
  }

  // Remove an item matching both id and size from the cart
  const removeFromCart = (id, size) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size === size))
    )
  }

  // Empty the cart and reset storage
  const clearCart = () => {
    setCartItems([])
    try {
      localStorage.removeItem(CART_STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing cart from localStorage:', error)
    }
  }

  // Total count of all items in the cart
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  // Total price of all items in the cart
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Custom hook for convenient consumption of cart context
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartContext
