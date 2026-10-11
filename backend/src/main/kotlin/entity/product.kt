package com.sewora.backend.entity

// Product entity without JPA annotations
class Product(
    var id: Long? = null,
    var name: String = "",
    var description: String = "",
    var price: Double = 0.0,
    var category: String = "",
    var color: String = "",
    var sizes: String = "",
    var imageUrl: String = "",
    var stock: Int = 0
)