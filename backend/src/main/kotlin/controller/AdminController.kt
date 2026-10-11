package com.sewora.backend.controller

import com.sewora.backend.dto.UpdateOrderStatusRequest
import com.sewora.backend.entity.Order
import com.sewora.backend.repository.OrderRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/admin")
class AdminController(
    private val orderRepository: OrderRepository
) {

    // Allowed status values for orders
    private val allowedStatuses = setOf("PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED")

    // GET /api/admin/orders -> all orders, newest first
    @GetMapping("/orders")
    fun getAllOrders(): List<Order> {
        return orderRepository.findAllByOrderByCreatedAtDesc()
    }

    // PUT /api/admin/orders/{id}/status -> update order status
    @PutMapping("/orders/{id}/status")
    fun updateOrderStatus(
        @PathVariable id: Long,
        @RequestBody req: UpdateOrderStatusRequest
    ): ResponseEntity<Any> {
        val status = req.status.trim()
        if (!allowedStatuses.contains(status)) {
            return ResponseEntity.badRequest()
                .body(mapOf("message" to "Invalid status: $status. Allowed statuses: ${allowedStatuses.joinToString(", ")}"))
        }

        val order = orderRepository.findById(id).orElse(null)
            ?: return ResponseEntity.notFound().build()

        order.status = status
        val updated = orderRepository.save(order)
        return ResponseEntity.ok(updated)
    }
}
