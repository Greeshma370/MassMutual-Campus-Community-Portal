import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // Hashed
  department: { type: String, required: true }, // e.g., "Computer Science"
  role: { type: String, default: "faculty", immutable: true },
});

export default mongoose.model("Faculty", facultySchema);