import express from "express";
import Job from "../models/Job.js";
import Student from "../models/Student.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/jobs
// @desc    Create a new job posting
// @access  Private (Faculty only)
router.post("/", protect, authorizeRoles("faculty","management"), async (req, res) => {
  const { companyName, title, description, location, salaryPackage, eligibility, last_date_to_apply, rounds } = req.body;
  try {
    const job = await Job.create({
      companyName, title, description, location, salaryPackage, eligibility, last_date_to_apply, rounds,
      postedBy: req.user.id, // Faculty ID from authenticated user
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/jobs
// @desc    Get all active job postings (Students, Faculty, Management)
// @access  Public (Can be filtered based on user role/eligibility on frontend)
router.get("/", protect, async (req, res) => {
  try {
    // Students typically only see active jobs
    let jobs = await Job.find({ isActive: true }).populate("postedBy", "name email department");

    // If a student, filter based on eligibility (optional, can be done on frontend too)
    if (req.user.role === "student") {
        const student = await Student.findById(req.user.id);
        jobs = jobs.filter(job => {
            const { minCGPA, requiredBranches, maxBacklogs, yearSem } = job.eligibility;
            const meetsCGPA = student.cgpa >= minCGPA;
            const meetsBranches = requiredBranches.length === 0 || requiredBranches.includes(student.department);
            const meetsBacklogs = student.backlogs <= maxBacklogs;
            const meetsYearSem = yearSem.length === 0 || yearSem.includes(student.yearSem);
            return meetsCGPA && meetsBranches && meetsBacklogs && meetsYearSem;
        });
    }

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/jobs/all (for faculty/management to see inactive jobs too)
// @desc    Get all jobs including inactive ones
router.get("/all", protect, async (req, res) => {
  try {
    let jobs = await Job.find().populate("postedBy", "name email department");
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching all jobs:", error);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get job by ID
// @access  Private (All authenticated roles)
router.get("/:id", protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "name email department");
    if (!job) return res.status(404).json({ message: "Job not found" });

    // If student, ensure job is active
    if (req.user.role === "student" && !job.isActive) {
      return res.status(403).json({ message: "Job is no longer active" });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/jobs/:id
// @desc    Update a job posting (Faculty/Management)
// @access  Private (Faculty who posted it, or Management)
router.put("/:id", protect, authorizeRoles("faculty", "management"), async (req, res) => {
  const { companyName, title, description, location, salaryPackage, eligibility, last_date_to_apply, isActive, rounds } = req.body;
  try {
    let job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Check if faculty is the one who posted it, or if user is management
    if (req.user.role === "faculty" && job.postedBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this job" });
    }

    job.companyName = companyName || job.companyName;
    job.title = title || job.title;
    job.description = description || job.description;
    job.location = location !== undefined ? location : job.location;
    job.salaryPackage = salaryPackage !== undefined ? salaryPackage : job.salaryPackage;
    job.eligibility = eligibility || job.eligibility;
    job.last_date_to_apply = last_date_to_apply || job.last_date_to_apply;
    job.isActive = isActive !== undefined ? isActive : job.isActive;
    job.rounds = rounds || job.rounds;

    await job.save();
    res.json({ message: "Job updated successfully", job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete a job posting (Faculty who posted it, or Management)
// @access  Private (Faculty, Management)
router.delete("/:id", protect, authorizeRoles("faculty", "management"), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Check if faculty is the one who posted it, or if user is management
    if (req.user.role === "faculty" && job.postedBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this job" });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;