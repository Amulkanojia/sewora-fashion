package com.sewora.backend.entity

import jakarta.persistence.*

@Entity
@Table(name = "products")
class Product(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    var name: String = "",
    @Column(length = 1000)
    var description: String = "",
    var price: Double = 0.0,
    var category: String = "",
    var color: String = "",
    var sizes: String = "",
    var imageUrl: String = "",
    var stock: Int = 0
)