const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId, // Reference to an account
    ref: "Account",
    required: true
  },
  type: {
    type: String,
    enum: ["credit", "debit"],  // Transaction type
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
