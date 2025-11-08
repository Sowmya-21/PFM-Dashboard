import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import plaidRoutes from "./routes/plaidRoutes.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import goalsRoutes from "./routes/goals.js";
import budgetsRoutes from "./routes/budgets.js";
import transactionsRoutes from "./routes/transactions.js"; // ✅ NEW import

import User from "./models/User.js";

dotenv.config(); // Load .env variables

const app = express();
app.use(express.json());

// ✅ Middleware to log each request
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

// ✅ CORS setup
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);

// ✅ Routes registration
console.log("✅ Routes initialized successfully");
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/plaid", plaidRoutes);
app.use("/api/goals", goalsRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/budgets", budgetsRoutes); // ✅ NEW: Budgets route added

// ✅ Debug: Check if Mongo URI is loaded
console.log("Mongo URI:", process.env.MONGO_URI || "(missing)");

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connection successful"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

const db = mongoose.connection;
db.on("connected", () => console.log("✅ Mongoose connected to DB"));
db.on("error", (err) => console.error("❌ Mongoose connection error:", err));
db.on("disconnected", () => console.warn("⚠️ Mongoose disconnected"));

// ✅ Test route
app.get("/", (req, res) => {
  console.log("✅ GET / route hit");
  res.status(200).send("Server is running 🚀");
});

// ✅ Health check route
app.get("/health", (req, res) => {
  const state = mongoose.connection.readyState; // 0 = disconnected, 1 = connected
  res.json({ ok: state === 1, readyState: state });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
