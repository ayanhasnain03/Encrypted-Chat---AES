# Encrypted Chat Application

# Overview

This project is an Encrypted Chat Application that allows users to communicate securely through messages. It utilizes advanced encryption techniques to ensure that all messages are encrypted before transmission and decrypted only by the intended recipient. The application is built using Node.js, Express, Socket.io for real-time communication, and the AES-256-GCM encryption algorithm for message security.

## Encryption Details

This application employs **Advanced Encryption Standard (AES)** in **Galois/Counter Mode (GCM)** to provide a secure messaging experience. This combination ensures that messages are not only encrypted but also authenticated, thus maintaining both confidentiality and integrity.

### Key Features of the Encryption

- **AES (Advanced Encryption Standard)**:
  - **Key Size**: The application uses a **256-bit key**, which offers a high level of security against brute-force attacks.
  - **Mode of Operation**: The **Galois/Counter Mode (GCM)** is used, which combines the confidentiality of encryption with the integrity assurance of message authentication.

### How It Works

1. **Encryption**:

   - Each message is encrypted with a unique **Initialization Vector (IV)**, ensuring that the same plaintext will yield different ciphertexts every time it's encrypted.
   - The encryption process involves generating an IV and using it along with the **SECRET_KEY** to encrypt the message.
   - An **authentication tag** is generated during the encryption process, which helps verify that the message has not been altered.

2. **Decryption**:
   - The decryption process requires the same **IV**, **encrypted message**, and **authentication tag**.
   - The application verifies the integrity of the message using the authentication tag. If verification fails, it indicates that the message has been tampered with or is corrupted.

## Why Choose AES-GCM Encryption?

The choice of encryption method is crucial for the security of any application that handles sensitive information, such as chat messages. Here are the primary reasons for selecting **AES-GCM** for this application:

### 1. **Strong Security**

- **AES (Advanced Encryption Standard)** is a widely accepted encryption standard used globally. It is considered secure and efficient, especially with a key size of **256 bits**, which provides a high level of protection against brute-force attacks.
- **Galois/Counter Mode (GCM)** not only encrypts the data but also ensures its integrity by using an authentication tag, which protects against tampering and forgery.

### 2. **Performance**

- AES is designed to be fast and efficient in both hardware and software implementations. This makes it suitable for real-time applications like chat, where low latency is essential for user experience.

### 3. **Authenticated Encryption**

- By combining encryption and authentication, AES-GCM ensures that even if an attacker intercepts the encrypted message, they cannot alter it without detection. This dual-functionality reduces the complexity of managing separate mechanisms for confidentiality and integrity.

### 4. **Industry Standard**

- AES has been extensively analyzed and is widely used in various applications, including government communications, financial transactions, and secure messaging systems. Its adoption as a standard by organizations like NIST (National Institute of Standards and Technology) lends credibility to its security.

### 5. **Scalability**

- AES-GCM is suitable for both small and large data sizes. The algorithm can efficiently handle varying message lengths, making it adaptable to different use cases in chat applications.

### 6. **Robustness Against Attacks**

- AES-GCM is resistant to various types of cryptographic attacks, including chosen-plaintext attacks and certain classes of side-channel attacks, making it a robust choice for securing communication channels.

### Conclusion

By selecting **AES-GCM** for encryption, the application provides users with a secure, reliable, and efficient means of communication. This choice reflects a commitment to protecting user privacy and data integrity in a world where secure communication is increasingly vital.

## Features

- **Real-time Messaging**: Users can send and receive messages instantly.
- **End-to-End Encryption**: Messages are encrypted before being sent and can only be decrypted by the intended recipient.
- **User Notifications**: Alerts for when users join or leave the chat.
- **Responsive Design**: The chat interface is designed to work well on various devices.

## Technologies Used

- **Backend**:

  - Node.js
  - Express
  - Socket.io
  - Crypto (for encryption)

- **Frontend**:
  - HTML
  - CSS (for styling)
  - JavaScript
