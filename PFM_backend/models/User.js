import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,   // Name is mandatory
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,     // No duplicate emails
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", UserSchema);

export default User; // ✅ ES Module export
