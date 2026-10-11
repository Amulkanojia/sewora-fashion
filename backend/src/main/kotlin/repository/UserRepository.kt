package com.sewora.backend.repository

import com.google.cloud.firestore.DocumentSnapshot
import com.google.cloud.firestore.Firestore
import com.sewora.backend.entity.User
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
class UserRepository(private val firestore: Firestore) {

    private val collection get() = firestore.collection("users")

    private fun toMap(user: User): Map<String, Any?> = mapOf(
        "id" to user.id,
        "name" to user.name,
        "email" to user.email,
        "password" to user.password,
        "role" to user.role
    )

    private fun fromDocument(doc: DocumentSnapshot): User {
        val numericId = doc.id.toLongOrNull()
            ?: (doc.get("id") as? Number)?.toLong()
            ?: (doc.get("id") as? String)?.toLongOrNull()
        return User(
            id = numericId,
            name = doc.getString("name").orEmpty(),
            email = doc.getString("email").orEmpty(),
            password = doc.getString("password").orEmpty(),
            role = doc.getString("role") ?: "USER"
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

    fun findByEmail(email: String): User? {
        val snapshot = collection.whereEqualTo("email", email).get().get()
        val doc = snapshot.documents.firstOrNull() ?: return null
        return fromDocument(doc)
    }

    fun findById(id: Long): Optional<User> {
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

    fun findAll(): List<User> {
        val snapshot = collection.get().get()
        return snapshot.documents
            .filter { it.exists() }
            .map { fromDocument(it) }
            .sortedBy { it.id ?: 0L }
    }

    @Synchronized
    fun save(user: User): User {
        val id = if (user.id == null || user.id == 0L) getNextId() else user.id!!
        user.id = id
        collection.document(id.toString()).set(toMap(user)).get()
        return user
    }

    @Synchronized
    fun saveAll(users: Iterable<User>): List<User> {
        var nextId = getNextId()
        val saved = mutableListOf<User>()
        for (user in users) {
            val id = if (user.id == null || user.id == 0L) nextId++ else user.id!!
            user.id = id
            collection.document(user.id.toString()).set(toMap(user)).get()
            saved.add(user)
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

    fun delete(user: User) {
        val id = user.id ?: return
        deleteById(id)
    }

    fun existsById(id: Long): Boolean {
        val doc = collection.document(id.toString()).get().get()
        if (doc.exists()) return true
        val query = collection.whereEqualTo("id", id).limit(1).get().get()
        return !query.isEmpty
    }
}
