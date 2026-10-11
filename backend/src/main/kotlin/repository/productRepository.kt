package com.sewora.backend.repository

import com.google.cloud.firestore.DocumentSnapshot
import com.google.cloud.firestore.Firestore
import com.sewora.backend.entity.Product
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
class ProductRepository(private val firestore: Firestore) {

    private val collection get() = firestore.collection("products")

    private fun toMap(product: Product): Map<String, Any?> = mapOf(
        "id" to product.id,
        "name" to product.name,
        "description" to product.description,
        "price" to product.price,
        "category" to product.category,
        "color" to product.color,
        "sizes" to product.sizes,
        "imageUrl" to product.imageUrl,
        "stock" to product.stock
    )

    private fun fromDocument(doc: DocumentSnapshot): Product = Product(
        id = (doc.get("id") as? Number)?.toLong() ?: doc.id.toLongOrNull(),
        name = doc.getString("name").orEmpty(),
        description = doc.getString("description").orEmpty(),
        price = (doc.get("price") as? Number)?.toDouble() ?: 0.0,
        category = doc.getString("category").orEmpty(),
        color = doc.getString("color").orEmpty(),
        sizes = doc.getString("sizes").orEmpty(),
        imageUrl = doc.getString("imageUrl").orEmpty(),
        stock = (doc.get("stock") as? Number)?.toInt() ?: 0
    )

    private fun getNextId(): Long {
        val snapshot = collection.get().get()
        var maxId = 0L
        for (doc in snapshot.documents) {
            val idVal = (doc.get("id") as? Number)?.toLong() ?: doc.id.toLongOrNull() ?: 0L
            if (idVal > maxId) {
                maxId = idVal
            }
        }
        return maxId + 1
    }

    fun findAll(): List<Product> {
        val snapshot = collection.get().get()
        return snapshot.documents
            .filter { it.exists() }
            .map { fromDocument(it) }
            .sortedBy { it.id ?: 0L }
    }

    fun findById(id: Long): Optional<Product> {
        val doc = collection.document(id.toString()).get().get()
        return if (doc.exists()) {
            Optional.of(fromDocument(doc))
        } else {
            Optional.empty()
        }
    }

    @Synchronized
    fun save(product: Product): Product {
        val id = product.id ?: getNextId()
        product.id = id
        collection.document(id.toString()).set(toMap(product)).get()
        return product
    }

    @Synchronized
    fun saveAll(products: Iterable<Product>): List<Product> {
        var nextId = getNextId()
        val saved = mutableListOf<Product>()
        for (product in products) {
            if (product.id == null) {
                product.id = nextId++
            }
            collection.document(product.id.toString()).set(toMap(product)).get()
            saved.add(product)
        }
        return saved
    }

    fun count(): Long {
        val snapshot = collection.get().get()
        return snapshot.size().toLong()
    }

    fun deleteById(id: Long) {
        collection.document(id.toString()).delete().get()
    }

    fun delete(product: Product) {
        val id = product.id ?: return
        deleteById(id)
    }

    fun existsById(id: Long): Boolean {
        val doc = collection.document(id.toString()).get().get()
        return doc.exists()
    }
}