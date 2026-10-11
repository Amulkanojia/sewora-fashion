package com.sewora.backend.config

import com.google.auth.oauth2.GoogleCredentials
import com.google.cloud.firestore.Firestore
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.cloud.FirestoreClient
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource

// Firebase and Firestore initialization configuration
@Configuration
class FirebaseConfig {

    @Bean
    fun firestore(): Firestore {
        // Guard against double initialization
        if (FirebaseApp.getApps().isEmpty()) {
            val serviceAccount = ClassPathResource("firebase-key.json").inputStream
            val options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build()
            FirebaseApp.initializeApp(options)
        }
        return FirestoreClient.getFirestore()
    }
}
