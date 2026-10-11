package com.sewora.backend.entity

// Represents an individual item within an order
class OrderItem(
    var id: Long? = null,
    var productId: Long = 0,
    var productName: String = "",
    var size: String = "",
    var quantity: Int = 0,
    var price: Double = 0.0
)
