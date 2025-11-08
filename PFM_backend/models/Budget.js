import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    limit: { type: Number, required: true },
    spent: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Budget = mongoose.model("Budget", budgetSchema);
export default Budget;
