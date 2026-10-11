package com.sewora.backend.dto

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

// DTO for an item within a create order request
data class OrderItemRequest(
    val productId: Long = 0,
    val size: String = "",
    val quantity: Int = 0
)

// DTO for creating a new order
data class CreateOrderRequest(
    val customerName: String = "",
    val phone: String = "",
    val address: String = "",
    val city: String = "",
    val pincode: String = "",
    val paymentMethod: String = "",
    val items: List<OrderItemRequest> = emptyList()
)

// DTO for updating order status
@JsonIgnoreProperties(ignoreUnknown = true)
data class UpdateOrderStatusRequest(
    val status: String = ""
)
