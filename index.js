const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const crypto = require("crypto");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.static("public"));

// AES key (consider a more secure key management in production)
const SECRET_KEY = process.env.SECRET_KEY || crypto.randomBytes(32); // Use env variable or generate key

// Function to encrypt messages
function encrypt(message) {
  const iv = crypto.randomBytes(16); // Initialization vector
  const cipher = crypto.createCipheriv("aes-256-gcm", SECRET_KEY, iv);

  let encrypted = cipher.update(message, "utf8", "hex");
  encrypted += cipher.final("hex");

  // Get the authentication tag
  const authTag = cipher.getAuthTag().toString("hex");

  return {
    initializationVector: iv.toString("hex"),
    encryptedData: encrypted,
    authTag: authTag,
  };
}

// Function to decrypt messages
function decrypt(encryptedMessage) {
  const { initializationVector, encryptedData, authTag } = encryptedMessage;

  const iv = Buffer.from(initializationVector, "hex");
  const encryptedBuffer = Buffer.from(encryptedData, "hex");
  const tag = Buffer.from(authTag, "hex");

  const decipher = crypto.createDecipheriv("aes-256-gcm", SECRET_KEY, iv);
  decipher.setAuthTag(tag); // Set the authentication tag

  let decrypted;
  try {
    decrypted = decipher.update(encryptedBuffer, undefined, "utf8");
    decrypted += decipher.final("utf8");
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error("Decryption failed");
  }

  return decrypted;
}

// Listen for incoming connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle new user joining
  socket.on("new user", (username) => {
    socket.username = username; // Store the username
    socket.broadcast.emit("user joined", `${username} has joined the chat`);
  });

  // Handle chat messages
  socket.on("chat message", (message) => {
    try {
      const encryptedMessage = encrypt(message); // Encrypt the message
      console.log("Encrypted Message:", encryptedMessage.encryptedData);

      // Decrypt the message before broadcasting
      const decryptedMessage = decrypt(encryptedMessage);
      console.log("Decrypted message:", decryptedMessage);

      // Send the decrypted message to all clients with username and timestamp
      const timestamp = new Date().toLocaleTimeString();
      io.emit("chat message", {
        text: decryptedMessage,
        user: socket.username,
        time: timestamp,
      });
    } catch (error) {
      console.error("Failed to encrypt or decrypt message:", error);
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    socket.broadcast.emit("user left", `${socket.username} has left the chat`);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
