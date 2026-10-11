package com.sewora.backend.controller

import com.sewora.backend.dto.ProductRequest
import com.sewora.backend.entity.Product
import com.sewora.backend.repository.ProductRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/products")
class ProductController(private val productRepository: ProductRepository) {

    // GET /api/products -> all products
    @GetMapping
    fun getAll(): List<Product> = productRepository.findAll()

    // GET /api/products/{id} -> one product, or 404 if it doesn't exist
    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): ResponseEntity<Product> {
        val product = productRepository.findById(id)
        return if (product.isPresent) ResponseEntity.ok(product.get())
        else ResponseEntity.notFound().build()
    }

    // POST /api/products -> create a product (Admin only)
    @PostMapping
    fun create(@RequestBody req: ProductRequest): ResponseEntity<Any> {
        if (req.name.isBlank()) {
            return ResponseEntity.badRequest().body(mapOf("message" to "Product name cannot be blank"))
        }
        if (req.price <= 0.0) {
            return ResponseEntity.badRequest().body(mapOf("message" to "Price must be greater than 0"))
        }
        if (req.stock < 0) {
            return ResponseEntity.badRequest().body(mapOf("message" to "Stock must be 0 or greater"))
        }

        val product = Product(
            name = req.name,
            description = req.description,
            price = req.price,
            category = req.category,
            color = req.color,
            sizes = req.sizes,
            imageUrl = req.imageUrl,
            stock = req.stock
        )
        val saved = productRepository.save(product)
        return ResponseEntity.status(HttpStatus.CREATED).body(saved)
    }

    // PUT /api/products/{id} -> update product fields (Admin only)
    @PutMapping("/{id}")
    fun update(@PathVariable id: Long, @RequestBody req: ProductRequest): ResponseEntity<Any> {
        val existing = productRepository.findById(id).orElse(null)
            ?: return ResponseEntity.notFound().build()

        if (req.name.isBlank()) {
            return ResponseEntity.badRequest().body(mapOf("message" to "Product name cannot be blank"))
        }
        if (req.price <= 0.0) {
            return ResponseEntity.badRequest().body(mapOf("message" to "Price must be greater than 0"))
        }
        if (req.stock < 0) {
            return ResponseEntity.badRequest().body(mapOf("message" to "Stock must be 0 or greater"))
        }

        existing.name = req.name
        existing.description = req.description
        existing.price = req.price
        existing.category = req.category
        existing.color = req.color
        existing.sizes = req.sizes
        existing.imageUrl = req.imageUrl
        existing.stock = req.stock

        val updated = productRepository.save(existing)
        return ResponseEntity.ok(updated)
    }

    // DELETE /api/products/{id} -> delete product (Admin only)
    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long): ResponseEntity<Void> {
        val existing = productRepository.findById(id).orElse(null)
            ?: return ResponseEntity.notFound().build()

        productRepository.delete(existing)
        return ResponseEntity.noContent().build()
    }
}