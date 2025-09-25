import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // Hashed
  yearSem: { type: String, required: true }, // e.g., "3rd Year, 6th Sem"
  cgpa: { type: Number, required: true, min: 0, max: 10 },
  department: { type: String, required: true }, // e.g., "Computer Science"
  backlogs: { type: Number, default: 0, min: 0 },
  intern_details:{ type: String, required: true }, // Optional: brief description or link
  resume_url: { type: String, required: true }, // URL to student's resume in cloud storage
  skills: [String], // Array of strings, e.g., ["JavaScript", "Python", "React"]
  interests: [String], // Array of strings, e.g., ["Web Development", "Data Science"]
  role: { type: String, default: "student", immutable: true },
});

export default mongoose.model("Student", studentSchema);