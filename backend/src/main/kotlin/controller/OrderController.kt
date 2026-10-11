package com.sewora.backend.controller

import com.sewora.backend.dto.CreateOrderRequest
import com.sewora.backend.entity.Order
import com.sewora.backend.entity.OrderItem
import com.sewora.backend.entity.Product
import com.sewora.backend.repository.OrderRepository
import com.sewora.backend.repository.ProductRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime

@RestController
@RequestMapping("/api/orders")
class OrderController(
    private val orderRepository: OrderRepository,
    private val productRepository: ProductRepository
) {

    // POST /api/orders -> validate, check stock, save order with DB prices, reduce stock
    @PostMapping
    @Transactional
    fun createOrder(
        @RequestBody req: CreateOrderRequest,
        authentication: Authentication
    ): ResponseEntity<Any> {
        // Validate required fields
        if (req.customerName.isBlank() || req.phone.isBlank() || req.address.isBlank() ||
            req.city.isBlank() || req.pincode.isBlank() || req.paymentMethod.isBlank()
        ) {
            return ResponseEntity.badRequest()
                .body(mapOf("message" to "All fields are required"))
        }

        if (req.items.isEmpty()) {
            return ResponseEntity.badRequest()
                .body(mapOf("message" to "Order must contain at least one item"))
        }

        for (item in req.items) {
            if (item.productId <= 0 || item.quantity <= 0) {
                return ResponseEntity.badRequest()
                    .body(mapOf("message" to "Invalid item in order"))
            }
        }

        // Load each product from database and calculate requested quantities
        val productMap = mutableMapOf<Long, Product>()
        val requestedQuantities = mutableMapOf<Long, Int>()

        for (item in req.items) {
            if (!productMap.containsKey(item.productId)) {
                val product = productRepository.findById(item.productId).orElse(null)
                    ?: return ResponseEntity.badRequest()
                        .body(mapOf("message" to "Product not found with id: ${item.productId}"))
                productMap[item.productId] = product
            }
            requestedQuantities[item.productId] = (requestedQuantities[item.productId] ?: 0) + item.quantity
        }

        // Validate stock availability
        for ((productId, totalQty) in requestedQuantities) {
            val product = productMap[productId]!!
            if (product.stock < totalQty) {
                return ResponseEntity.badRequest()
                    .body(mapOf("message" to "Insufficient stock for ${product.name}"))
            }
        }

        // Reduce stock in database
        for ((productId, totalQty) in requestedQuantities) {
            val product = productMap[productId]!!
            product.stock -= totalQty
            productRepository.save(product)
        }

        // Calculate total amount using database prices
        val totalAmount = req.items.sumOf { item ->
            val product = productMap[item.productId]!!
            product.price * item.quantity
        }

        // Create and save order with items
        val order = Order(
            userEmail = authentication.name,
            customerName = req.customerName,
            phone = req.phone,
            address = req.address,
            city = req.city,
            pincode = req.pincode,
            paymentMethod = req.paymentMethod,
            totalAmount = totalAmount,
            status = "PLACED",
            createdAt = LocalDateTime.now()
        )

        val orderItems = req.items.map { item ->
            val product = productMap[item.productId]!!
            OrderItem(
                productId = product.id ?: item.productId,
                productName = product.name,
                size = item.size,
                quantity = item.quantity,
                price = product.price,
                order = order
            )
        }.toMutableList()

        order.items = orderItems
        val savedOrder = orderRepository.save(order)

        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder)
    }

    // GET /api/orders -> current user's orders, newest first
    @GetMapping
    fun getUserOrders(authentication: Authentication): List<Order> {
        return orderRepository.findByUserEmailOrderByCreatedAtDesc(authentication.name)
    }

    // GET /api/orders/{id} -> specific order only if belonging to current user, otherwise 404
    @GetMapping("/{id}")
    fun getOrderById(
        @PathVariable id: Long,
        authentication: Authentication
    ): ResponseEntity<Order> {
        val order = orderRepository.findById(id).orElse(null)
        return if (order != null && order.userEmail == authentication.name) {
            ResponseEntity.ok(order)
        } else {
            ResponseEntity.notFound().build()
        }
    }
}
