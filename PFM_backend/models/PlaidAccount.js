import mongoose from "mongoose";

const PlaidAccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accountId: {
    type: String,
    required: true,
  },
  name: String,
  officialName: String,
  mask: String,
  type: String,
  subtype: String,
  balances: {
    available: Number,
    current: Number,
    limit: Number,
    iso_currency_code: String,
  },
  institution: {
    name: String,
    institution_id: String,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const PlaidAccount = mongoose.model("PlaidAccount", PlaidAccountSchema);
export default PlaidAccount;
