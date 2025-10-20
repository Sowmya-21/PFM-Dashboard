const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accountId: { type: String },
  transactionId: { type: String, required: true },
  name: { type: String },
  amount: { type: Number },
  date: { type: String },
  category: { type: [String] },
  merchant_name: { type: String },
});

module.exports = mongoose.model("Transaction", transactionSchema);
