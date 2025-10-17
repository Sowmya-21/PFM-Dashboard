const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to a user
    ref: "User",
    required: true
  },
  accountType: {
    type: String,
    enum: ["savings", "current"],  // Only savings or current allowed
    default: "savings"
  },
  balance: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Account", AccountSchema);
