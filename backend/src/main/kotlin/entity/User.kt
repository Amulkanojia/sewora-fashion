package com.sewora.backend.entity

// User entity without JPA annotations
class User(
    var id: Long? = null,
    var name: String = "",
    var email: String = "",
    var password: String = "",
    var role: String = "USER"
)