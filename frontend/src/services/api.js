// src/services/api.js
// API service for fetching products from the backend

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
