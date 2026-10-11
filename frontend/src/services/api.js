// src/services/api.js
// API service for fetching products and handling authentication with the backend

export const API_BASE_URL = 'http://localhost:8080/api'

// Helper function to convert comma-separated sizes string into an array
function formatProduct(product) {
  if (!product) return null
  return {
    ...product,
    sizes: typeof product.sizes === 'string'
      ? product.sizes.split(',')
      : Array.isArray(product.sizes)
      ? product.sizes
      : [],
  }
}

// GET all products from the backend
export async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/products`)

  if (!response.ok) {
    throw new Error(`Failed to fetch products (status: ${response.status})`)
  }

  const data = await response.json()
  return data.map(formatProduct)
}

// GET single product by id from the backend
export async function getProductById(id) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`)

  // Return null if the product is not found
  if (response.status === 404) {
    return null
  }

  // Throw error if the request fails for any other reason
  if (!response.ok) {
    throw new Error(`Failed to fetch product ${id} (status: ${response.status})`)
  }

  const data = await response.json()
  return formatProduct(data)
}

// Register a new user account: POST /auth/register
export async function registerUser(name, email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const errorMessage = data?.message || 'Something went wrong'
    throw new Error(errorMessage)
  }

  return data
}

// Login an existing user account: POST /auth/login
export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const errorMessage = data?.message || 'Something went wrong'
    throw new Error(errorMessage)
  }

  return data
}

// Create a new order: POST /orders
export async function createOrder(orderData, token) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  })

  if (response.status === 401 || response.status === 403) {
    throw new Error('Please log in again')
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const errorMessage = data?.message || 'Failed to place order'
    throw new Error(errorMessage)
  }

  return data
}

// Get logged-in user's orders: GET /orders
export async function getMyOrders(token) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  if (response.status === 401 || response.status === 403) {
    throw new Error('Please log in again')
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const errorMessage = data?.message || 'Failed to fetch orders'
    throw new Error(errorMessage)
  }

  return data
}

// Get single order by id: GET /orders/:id
export async function getOrderById(id, token) {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  if (response.status === 401 || response.status === 403) {
    throw new Error('Please log in again')
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const errorMessage = data?.message || (response.status === 404 ? 'Order not found' : 'Failed to fetch order')
    throw new Error(errorMessage)
  }

  return data
}
