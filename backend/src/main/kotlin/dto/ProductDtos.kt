package com.sewora.backend.dto

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

// DTO for creating or updating a product
@JsonIgnoreProperties(ignoreUnknown = true)
data class ProductRequest(
    val name: String = "",
    val description: String = "",
    val price: Double = 0.0,
    val category: String = "",
    val color: String = "",
    val sizes: String = "",
    val imageUrl: String = "",
    val stock: Int = 0
)
