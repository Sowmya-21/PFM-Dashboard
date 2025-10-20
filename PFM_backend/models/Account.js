const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accountId: { type: String, required: true }, // from Plaid
  name: { type: String },
  mask: { type: String }, // last 4 digits
  subtype: { type: String },
  type: { type: String },
  balances: {
    available: { type: Number },
    current: { type: Number },
    limit: { type: Number },
  },
  institution: { type: String }, // e.g. "Chase Bank"
});

module.exports = mongoose.model("Account", accountSchema);
