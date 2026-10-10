package com.sewora.backend.controller

import com.sewora.backend.entity.Product
import com.sewora.backend.repository.ProductRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

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
}