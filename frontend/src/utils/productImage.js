// src/utils/productImage.js
// Shared helper to resolve product photo URL with fallback to local static asset

export function getProductImage(product) {
  if (!product) return ''
  if (typeof product.imageUrl === 'string' && product.imageUrl.trim() !== '') {
    return product.imageUrl.trim()
  }
  return `/images/product-${product.id}.jpg`
}

export default getProductImage
