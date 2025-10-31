import express from "express";
import Goal from "../models/Goal.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// ✅ Middleware to verify JWT and get userId
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

// ✅ GET all goals for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    console.error("❌ Error fetching goals:", err);
    res.status(500).json({ error: "Failed to fetch goals" });
  }
});

// ✅ POST - Create new goal
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, targetAmount, currentAmount, deadline } = req.body;

    if (!name || !targetAmount || !deadline) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    const newGoal = new Goal({
      userId: req.userId,
      name,
      targetAmount,
      currentAmount: currentAmount || 0,
      deadline,
    });

    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    console.error("❌ Error creating goal:", err);
    res.status(500).json({ error: "Failed to create goal" });
  }
});

// ✅ PUT - Update existing goal
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!goal) return res.status(404).json({ error: "Goal not found" });
    res.json(goal);
  } catch (err) {
    console.error("❌ Error updating goal:", err);
    res.status(500).json({ error: "Failed to update goal" });
  }
});

// ✅ DELETE - Remove goal
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!goal) return res.status(404).json({ error: "Goal not found" });
    res.json({ message: "Goal deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting goal:", err);
    res.status(500).json({ error: "Failed to delete goal" });
  }
});

export default router;
