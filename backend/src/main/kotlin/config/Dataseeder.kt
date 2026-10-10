package com.sewora.backend.config

import com.sewora.backend.entity.Product
import com.sewora.backend.repository.ProductRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

// Runs once when the app starts and adds sample products if the table is empty
@Component
class DataSeeder(private val productRepository: ProductRepository) : CommandLineRunner {

    override fun run(vararg args: String) {
        if (productRepository.count() > 0) return

        val products = listOf(
            Product(name = "Organic Cotton Tee", description = "Soft everyday tee made from organic cotton.", price = 1299.0, category = "Women", color = "White", sizes = "S,M,L,XL", stock = 25),
            Product(name = "Linen Wrap Dress", description = "Breathable linen dress with a relaxed fit.", price = 3499.0, category = "Women", color = "Sage", sizes = "S,M,L", stock = 12),
            Product(name = "Upcycled Denim Jacket", description = "Jacket crafted from reclaimed denim.", price = 4299.0, category = "Women", color = "Indigo", sizes = "S,M,L,XL", stock = 8),
            Product(name = "Hemp Wide-Leg Pants", description = "Durable, lightweight pants made from hemp blend.", price = 2799.0, category = "Women", color = "Sand", sizes = "S,M,L", stock = 15),
            Product(name = "Recycled Polyester Hoodie", description = "Warm hoodie made from recycled bottles.", price = 2999.0, category = "Men", color = "Charcoal", sizes = "M,L,XL", stock = 20),
            Product(name = "Organic Linen Shirt", description = "Classic button-up in organic linen.", price = 2499.0, category = "Men", color = "Cream", sizes = "S,M,L,XL", stock = 18),
            Product(name = "Tapered Chino Trousers", description = "Smart chinos in organic cotton twill.", price = 2899.0, category = "Men", color = "Olive", sizes = "M,L,XL", stock = 14),
            Product(name = "Recycled Wool Sweater", description = "Cosy crew-neck knit from recycled wool.", price = 3799.0, category = "Men", color = "Navy", sizes = "M,L,XL", stock = 10),
            Product(name = "Jute Tote Bag", description = "Sturdy everyday tote made from natural jute.", price = 999.0, category = "Accessories", color = "Natural", sizes = "One Size", stock = 40),
            Product(name = "Cork Wallet", description = "Slim vegan wallet made from cork leather.", price = 1199.0, category = "Accessories", color = "Tan", sizes = "One Size", stock = 30),
            Product(name = "Bamboo Sunglasses", description = "Lightweight frames made from sustainable bamboo.", price = 1799.0, category = "Accessories", color = "Brown", sizes = "One Size", stock = 22),
            Product(name = "Organic Cotton Scarf", description = "Soft scarf in naturally dyed organic cotton.", price = 1499.0, category = "Accessories", color = "Rust", sizes = "One Size", stock = 16)
        )
        productRepository.saveAll(products)
    }
}