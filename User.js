import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true },
  confirmPassword: String,
  dateOfBirth: String,
  gender: String,
  address: String,
  state: String,
  city: String,
  zipCode: String,
  preferredLanguage: String,
  agreeToTerms: String,
  file: String,

  // ✅ ADD THIS — role field
  role: {
    type: String,
    enum: ["admin", "doctor", "user"],  // only these 3 values allowed
    default: "user"                      // everyone who registers = "user" by default
  }

}, { timestamps: true, collection: "users" });

export default mongoose.model("User", userSchema);