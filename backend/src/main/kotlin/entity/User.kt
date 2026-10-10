package com.sewora.backend.entity

import jakarta.persistence.*

@Entity
@Table(name = "users")
class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    var name: String = "",
    @Column(unique = true)
    var email: String = "",
    var password: String = "",
    var role: String = "USER"
)