package com.sewora.backend.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*

// Represents an individual item within an order
@Entity
@Table(name = "order_items")
class OrderItem(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    var productId: Long = 0,
    var productName: String = "",
    var size: String = "",
    var quantity: Int = 0,
    var price: Double = 0.0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    @JsonIgnore
    var order: Order? = null
)
