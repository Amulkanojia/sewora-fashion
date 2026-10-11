package com.sewora.backend.entity

import java.time.LocalDateTime

// Represents a customer order
class Order(
    var id: Long? = null,
    var userEmail: String = "",
    var customerName: String = "",
    var phone: String = "",
    var address: String = "",
    var city: String = "",
    var pincode: String = "",
    var paymentMethod: String = "",
    var totalAmount: Double = 0.0,
    var status: String = "PLACED",
    var createdAt: LocalDateTime = LocalDateTime.now(),
    var items: MutableList<OrderItem> = mutableListOf()
)
