import mongoose from "mongoose";

const roundSchema = new mongoose.Schema({
  roundName: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "shortlisted", "accepted", "rejected"],
    default: "pending",
  },
});

const applicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  rounds: [roundSchema], // Array of rounds with their statuses
  status: {
    type: String,
    enum: ["pending", "shortlisted", "accepted", "rejected", "withdrawn"],
    default: "pending",
  },
  facultyNotes: String, // Faculty can add notes here
  appliedDate: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Application", applicationSchema);