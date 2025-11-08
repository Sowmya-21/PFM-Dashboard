import express from "express";
import Transaction from "../models/Transaction.js";
import Budget from "../models/Budget.js";
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
      userId: req.user.id,
      description,
      amount,
      date,
      category,
      type,
    });

    // ✅ If it's an expense, update matching budget
    if (type === "expense") {
      const matchingBudget = await Budget.findOne({
        userId: req.user.id,
        category: { $regex: new RegExp(category, "i") }, // case-insensitive match
      });

      if (matchingBudget) {
        matchingBudget.spent += Number(amount);
        await matchingBudget.save();
        console.log(
          `💰 Updated ${matchingBudget.category} budget spent: ${matchingBudget.spent}`
        );
      } else {
        console.log("⚠️ No matching budget found for category:", category);
      }
    }

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get all transactions for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
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
    if (!updated)
      return res.status(404).json({ message: "Transaction not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Delete transaction and rollback budget spent if expense
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });

    // ✅ If it's an expense, subtract from the matching budget
    if (transaction.type === "expense") {
      const budget = await Budget.findOne({
        userId: req.user.id,
        category: { $regex: new RegExp(transaction.category, "i") },
      });

      if (budget) {
        budget.spent = Math.max(0, budget.spent - Number(transaction.amount));
        await budget.save();
        console.log(
          `🧾 Rolled back ${transaction.amount} from ${budget.category} budget`
        );
      } else {
        console.log("⚠️ No matching budget found for rollback");
      }
    }

    res.json({ message: "Transaction deleted successfully", transaction });
  } catch (err) {
    console.error("Error deleting transaction:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
