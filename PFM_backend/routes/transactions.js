import express from "express";
import Transaction from "../models/Transaction.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Add new transaction
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { description, amount, date, category, type } = req.body;
    if (!description || !amount || !date || !category || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction = await Transaction.create({
      userId: req.user.id, // ✅ Changed from _id to id
      description,
      amount,
      date,
      category,
      type,
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("❌ Error adding transaction:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get all transactions for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    console.error("❌ Error fetching transactions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Delete transaction
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    res.json({ message: "Transaction deleted" });
  } catch (error) {
    console.error("❌ Error deleting transaction:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Edit / Update transaction
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Transaction not found" });
    res.json(updated);
  } catch (error) {
    console.error("❌ Error updating transaction:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
