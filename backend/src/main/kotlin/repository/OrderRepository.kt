package com.sewora.backend.repository

import com.google.cloud.firestore.DocumentSnapshot
import com.google.cloud.firestore.Firestore
import com.sewora.backend.entity.Order
import com.sewora.backend.entity.OrderItem
import org.springframework.stereotype.Repository
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.Optional

@Repository
class OrderRepository(private val firestore: Firestore) {

    private val collection get() = firestore.collection("orders")

    private fun itemToMap(item: OrderItem): Map<String, Any?> = mapOf(
        "id" to item.id,
        "productId" to item.productId,
        "productName" to item.productName,
        "size" to item.size,
        "quantity" to item.quantity,
        "price" to item.price
    )

    private fun mapToItem(map: Map<String, Any?>): OrderItem = OrderItem(
        id = (map["id"] as? Number)?.toLong(),
        productId = (map["productId"] as? Number)?.toLong() ?: 0L,
        productName = map["productName"] as? String ?: "",
        size = map["size"] as? String ?: "",
        quantity = (map["quantity"] as? Number)?.toInt() ?: 0,
        price = (map["price"] as? Number)?.toDouble() ?: 0.0
    )

    private fun parseCreatedAt(value: Any?): LocalDateTime {
        return when (value) {
            is String -> try {
                LocalDateTime.parse(value, DateTimeFormatter.ISO_DATE_TIME)
            } catch (_: Exception) {
                try {
                    LocalDateTime.parse(value)
                } catch (_: Exception) {
                    LocalDateTime.now()
                }
            }
            is com.google.cloud.Timestamp -> value.toDate().toInstant()
                .atZone(java.time.ZoneId.systemDefault()).toLocalDateTime()
            else -> LocalDateTime.now()
        }
    }

    private fun toMap(order: Order): Map<String, Any?> = mapOf(
        "id" to order.id,
        "userEmail" to order.userEmail,
        "customerName" to order.customerName,
        "phone" to order.phone,
        "address" to order.address,
        "city" to order.city,
        "pincode" to order.pincode,
        "paymentMethod" to order.paymentMethod,
        "totalAmount" to order.totalAmount,
        "status" to order.status,
        "createdAt" to order.createdAt.toString(),
        "items" to order.items.mapIndexed { idx, it ->
            if (it.id == null || it.id == 0L) it.id = (idx + 1).toLong()
            itemToMap(it)
        }
    )

    @Suppress("UNCHECKED_CAST")
    private fun fromDocument(doc: DocumentSnapshot): Order {
        val rawItems = doc.get("items") as? List<Map<String, Any?>> ?: emptyList()
        val itemsList = rawItems.map { mapToItem(it) }
        val numericId = doc.id.toLongOrNull()
            ?: (doc.get("id") as? Number)?.toLong()
            ?: (doc.get("id") as? String)?.toLongOrNull()
        return Order(
            id = numericId,
            userEmail = doc.getString("userEmail").orEmpty(),
            customerName = doc.getString("customerName").orEmpty(),
            phone = doc.getString("phone").orEmpty(),
            address = doc.getString("address").orEmpty(),
            city = doc.getString("city").orEmpty(),
            pincode = doc.getString("pincode").orEmpty(),
            paymentMethod = doc.getString("paymentMethod").orEmpty(),
            totalAmount = (doc.get("totalAmount") as? Number)?.toDouble() ?: 0.0,
            status = doc.getString("status") ?: "PLACED",
            createdAt = parseCreatedAt(doc.get("createdAt")),
            items = itemsList.toMutableList()
        )
    }

    private fun getNextId(): Long {
        val snapshot = collection.get().get()
        var maxId = 0L
        for (doc in snapshot.documents) {
            val idVal = doc.id.toLongOrNull()
                ?: (doc.get("id") as? Number)?.toLong()
                ?: (doc.get("id") as? String)?.toLongOrNull()
                ?: 0L
            if (idVal > maxId) {
                maxId = idVal
            }
        }
        return maxId + 1
    }

    fun findByUserEmailOrderByCreatedAtDesc(email: String): List<Order> {
        val snapshot = collection.whereEqualTo("userEmail", email).get().get()
        return snapshot.documents
            .filter { it.exists() }
            .map { fromDocument(it) }
            .sortedByDescending { it.createdAt }
    }

    fun findAllByOrderByCreatedAtDesc(): List<Order> {
        val snapshot = collection.get().get()
        return snapshot.documents
            .filter { it.exists() }
            .map { fromDocument(it) }
            .sortedByDescending { it.createdAt }
    }

    fun findAll(): List<Order> = findAllByOrderByCreatedAtDesc()

    fun findById(id: Long): Optional<Order> {
        val doc = collection.document(id.toString()).get().get()
        if (doc.exists()) {
            return Optional.of(fromDocument(doc))
        }
        val query = collection.whereEqualTo("id", id).limit(1).get().get()
        val found = query.documents.firstOrNull()
        if (found != null && found.exists()) {
            return Optional.of(fromDocument(found))
        }
        return Optional.empty()
    }

    @Synchronized
    fun save(order: Order): Order {
        val id = if (order.id == null || order.id == 0L) getNextId() else order.id!!
        order.id = id
        collection.document(id.toString()).set(toMap(order)).get()
        return order
    }

    @Synchronized
    fun saveAll(orders: Iterable<Order>): List<Order> {
        var nextId = getNextId()
        val saved = mutableListOf<Order>()
        for (order in orders) {
            val id = if (order.id == null || order.id == 0L) nextId++ else order.id!!
            order.id = id
            collection.document(order.id.toString()).set(toMap(order)).get()
            saved.add(order)
        }
        return saved
    }

    fun count(): Long {
        val snapshot = collection.get().get()
        return snapshot.size().toLong()
    }

    fun deleteById(id: Long) {
        val docRef = collection.document(id.toString())
        val doc = docRef.get().get()
        if (doc.exists()) {
            docRef.delete().get()
        } else {
            val query = collection.whereEqualTo("id", id).get().get()
            for (d in query.documents) {
                d.reference.delete().get()
            }
        }
    }

    fun delete(order: Order) {
        val id = order.id ?: return
        deleteById(id)
    }

    fun existsById(id: Long): Boolean {
        val doc = collection.document(id.toString()).get().get()
        if (doc.exists()) return true
        val query = collection.whereEqualTo("id", id).limit(1).get().get()
        return !query.isEmpty
    }
}
