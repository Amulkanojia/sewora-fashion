package com.sewora.backend.controller

import com.sewora.backend.dto.AuthResponse
import com.sewora.backend.dto.LoginRequest
import com.sewora.backend.dto.RegisterRequest
import com.sewora.backend.entity.User
import com.sewora.backend.repository.UserRepository
import com.sewora.backend.security.JwtService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtService: JwtService
) {

    // POST /api/auth/register -> creates a user and returns a token
    @PostMapping("/register")
    fun register(@RequestBody req: RegisterRequest): ResponseEntity<Any> {
        if (req.name.isBlank() || req.email.isBlank() || req.password.length < 6) {
            return ResponseEntity.badRequest()
                .body(mapOf("message" to "Name, email and a password of at least 6 characters are required"))
        }
        if (userRepository.findByEmail(req.email) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(mapOf("message" to "Email already registered"))
        }
        val hashed = passwordEncoder.encode(req.password).orEmpty()
        val user = userRepository.save(User(name = req.name, email = req.email, password = hashed, role = "USER"))
        val response = AuthResponse(jwtService.generateToken(user), user.name, user.email, user.role)
        return ResponseEntity.status(HttpStatus.CREATED).body(response)
    }

    // POST /api/auth/login -> checks the password and returns a token
    @PostMapping("/login")
    fun login(@RequestBody req: LoginRequest): ResponseEntity<Any> {
        val user = userRepository.findByEmail(req.email)
        if (user == null || !passwordEncoder.matches(req.password, user.password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(mapOf("message" to "Invalid email or password"))
        }
        val response = AuthResponse(jwtService.generateToken(user), user.name, user.email, user.role)
        return ResponseEntity.ok(response)
    }

    // GET /api/auth/me -> a protected endpoint, only works with a valid token
    @GetMapping("/me")
    fun me(authentication: Authentication): Map<String, String> =
        mapOf("email" to authentication.name)
}