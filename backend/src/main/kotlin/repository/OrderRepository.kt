package com.sewora.backend.repository

import com.sewora.backend.entity.Order
import org.springframework.data.jpa.repository.JpaRepository

// Repository interface for Order database operations
interface OrderRepository : JpaRepository<Order, Long> {
    fun findByUserEmailOrderByCreatedAtDesc(email: String): List<Order>
}
