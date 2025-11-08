import express from "express";
import Budget from "../models/Budget.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all budgets for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(budgets);
  } catch (err) {
    console.error("Error fetching budgets:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Create a new budget
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, category, limit } = req.body;
    if (!name || !category || !limit)
      return res.status(400).json({ error: "All fields are required" });

    const budget = new Budget({
      userId: req.user.id,
      name,
      category,
      limit,
    });

    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    console.error("Error creating budget:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update spent when a new expense is added
router.patch("/:id/spent", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    if (typeof amount !== "number")
      return res.status(400).json({ error: "Invalid amount" });

    const updatedBudget = await Budget.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $inc: { spent: amount } },
      { new: true }
    );

    if (!updatedBudget)
      return res.status(404).json({ error: "Budget not found" });

    res.json(updatedBudget);
  } catch (err) {
    console.error("Error updating spent:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Add expense to a specific budget manually
router.post("/:id/add-expense", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ message: "Amount required" });

    const budget = await Budget.findOne({ _id: req.params.id, userId: req.user.id });
    if (!budget) return res.status(404).json({ message: "Budget not found" });

    budget.spent += Number(amount);
    await budget.save();

    res.json({ message: "Budget updated successfully", budget });
  } catch (error) {
    console.error("Error updating budget:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Delete budget (FIXED — uses req.user.id instead of req.user._id)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Budget.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) return res.status(404).json({ message: "Budget not found" });
    res.json({ message: "Budget deleted successfully" });
  } catch (err) {
    console.error("Error deleting budget:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
