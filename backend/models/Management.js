import mongoose from "mongoose";

const managementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // Hashed
  role: { type: String, default: "management", immutable: true },
});

export default mongoose.model("Management", managementSchema);