package com.sewora.backend.security

import com.sewora.backend.entity.User
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.util.Date

// Creates and checks JWT tokens
@Service
class JwtService(@Value("\${jwt.secret}") secret: String) {

    private val key = Keys.hmacShaKeyFor(secret.toByteArray())
    private val expirationMs = 24L * 60 * 60 * 1000 // token valid for 24 hours

    fun generateToken(user: User): String =
        Jwts.builder()
            .subject(user.email)
            .claim("role", user.role)
            .issuedAt(Date())
            .expiration(Date(System.currentTimeMillis() + expirationMs))
            .signWith(key)
            .compact()

    // Returns null if the token is fake or expired
    private fun readClaims(token: String): Claims? =
        try {
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token).payload
        } catch (e: Exception) {
            null
        }

    fun extractEmail(token: String): String? = readClaims(token)?.subject

    fun extractRole(token: String): String? = readClaims(token)?.get("role", String::class.java)
}