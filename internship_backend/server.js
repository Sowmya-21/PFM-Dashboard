const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load .env

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

// ✅ CORS setup
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true,
}));

const authRoutes = require("./routes/auth");
console.log("✅ Auth routes file loaded successfully");
app.use("/api/auth", authRoutes);

// Import your User model
const User = require("./models/User");

// Debug: Check if Mongo URI is loaded
console.log("Mongo URI:", process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connection successful"))
  .catch(err => console.error("❌ DB Connection Error:", err));

const db = mongoose.connection;
db.on('connected', () => console.log('✅ Mongoose connected to DB'));
db.on('error', err => console.error('❌ Mongoose connection error:', err));
db.on('disconnected', () => console.warn('⚠️ Mongoose disconnected'));




// Routes
app.get("/", (req, res) => {
  console.log("✅ GET / route hit");
  res.status(200).send("Server is running 🚀");
});

// Health check for DB
app.get('/health', (req, res) => {
  const state = mongoose.connection.readyState; // 0 = disconnected, 1 = connected
  res.json({ ok: state === 1, readyState: state });
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
