package com.sewora.backend.entity

import jakarta.persistence.*
import java.time.LocalDateTime

// Represents a customer order
@Entity
@Table(name = "orders")
class Order(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @OneToMany(mappedBy = "order", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    var items: MutableList<OrderItem> = mutableListOf()
)
