import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  title: { type: String, required: true }, // e.g., "Software Engineer Intern"
  description: { type: String, required: true }, // Full job description
  location: String, // e.g., "Bangalore", "Remote"
  salaryPackage: String, // e.g., "5 LPA", "Negotiable"
  eligibility: {
    minCGPA: { type: Number, default: 0 },
    requiredBranches: [String], // e.g., ["CSE", "ECE"]
    maxBacklogs: { type: Number, default: 0 },
    requiredSkills: [String], // e.g., ["React", "Node.js"]
    yearSem: [String], // e.g., ["3rd Year, 6th Sem", "4th Year, 7th Sem"]
  },
  last_date_to_apply: { type: Date, required: true },
  rounds: [String],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },  
  isActive: { type: Boolean, default: true }, // Faculty can toggle job visibility
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Job", jobSchema);