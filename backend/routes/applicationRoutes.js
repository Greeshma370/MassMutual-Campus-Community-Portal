import express from "express";
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/applications
// @desc    Student applies to a job
// @access  Private (Student only)
router.post("/", protect, authorizeRoles("student"), async (req, res) => {
  try {
    const { jobId } = req.body;
    const studentId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job || !job.isActive) {
      return res.status(400).json({
        success: false,
        message: "Job not found or not active",
      });
    }

    const existingApplication = await Application.findOne({ studentId, jobId });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "Already applied to this job",
      });
    }

    const application = await Application.create({
      studentId,
      jobId,
      status: "pending",
      appliedDate: Date.now(), // matches schema
      updatedAt: Date.now(),
    });

    res.status(201).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// @route   GET /api/applications
// @desc    Get applications based on role
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    let applications;

    if (req.user.role === "student") {
      // Students: only their own applications
      applications = await Application.find({ studentId: req.user.id })
        .populate("jobId")
        .sort("-appliedDate");
    } else if (req.user.role === "faculty" || req.user.role === "management") {
      // Faculty & Management: all applications
      applications = await Application.find()
        .populate("studentId")
        .populate("jobId")
        .sort("-appliedDate");
    }

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   PUT /api/applications/:id
// @desc    Update application status or faculty notes
// @access  Private (Faculty/Management only)
router.put("/:id", protect, authorizeRoles("faculty", "management"), async (req, res) => {
  try {
    const { status, facultyNotes } = req.body;

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (status) application.status = status;
    if (facultyNotes) application.facultyNotes = facultyNotes;
    application.updatedAt = Date.now();

    await application.save();

    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
