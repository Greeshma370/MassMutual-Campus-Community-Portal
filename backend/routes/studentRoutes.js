import express from "express";
import Student from "../models/Student.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/students/register
// @desc    Register a new student
// @access  Public
router.post("/register", async (req, res) => {
  const { 
    name, 
    email, 
    password, 
    yearSem, 
    cgpa, 
    department, 
    backlogs = 0,
    intern_details, // Added field
    resume_url,    // Added field 
    skills = [], 
    interests = []
  } = req.body;

  try {
    // Check if student already exists
    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      return res.status(400).json({
        success: false,
        message: "Student already exists"
      });
    }

    // Create student with all fields
    const student = await Student.create({
      name,
      email,
      password,
      yearSem,
      cgpa,
      department,
      backlogs,
      skills,
      interests,
      intern_details,
      resume_url,
      role: "student"
    });

    if (student) {
      res.status(201).json({
        success: true,
        data: {
          _id: student._id,
          name: student.name,
          email: student.email,
          yearSem: student.yearSem,
          department: student.department,
          cgpa: student.cgpa,
          backlogs: student.backlogs,
          skills: student.skills,
          interests: student.interests,
          intern_details: student.intern_details,
          resume_url: student.resume_url,
          role: student.role
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/students
// @desc    Get all students (Management/Faculty only)
// @access  Private (Management, Faculty)
router.get("/", protect, authorizeRoles("management", "faculty"), async (req, res) => {
  try {
    const students = await Student.find().select("-password");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/students/:id
// @desc    Get student by ID (Management/Faculty, or student's own profile)
// @access  Private (Management, Faculty, or Student accessing their own ID)
router.get("/:id", protect, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Allow if Management/Faculty or if student is accessing their own profile
    if (req.user.role === "management" || req.user.role === "faculty" || req.user.id.toString() === student._id.toString()) {
      res.json(student);
    } else {
      res.status(403).json({ message: "Not authorized to view this student's profile" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/students/:id
// @desc    Update student profile (Student themselves, or Management)
// @access  Private (Student updating their own, Management)
router.put("/:id", protect, async (req, res) => {
  const { name, yearSem, branch, cgpa, department, backlogs, intern_details, resume_url, skills, interests } = req.body;
  try {
    let student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Only allow if student is updating their own profile or if it's management
    if (req.user.id.toString() !== student._id.toString() && req.user.role !== "management") {
      return res.status(403).json({ message: "Not authorized to update this student's profile" });
    }

    student.name = name || student.name;
    student.yearSem = yearSem || student.yearSem;
    student.cgpa = cgpa || student.cgpa;
    student.department = department || student.department;
    student.backlogs = backlogs !== undefined ? backlogs : student.backlogs;
    student.intern_details = intern_details !== undefined ? intern_details : student.intern_details;
    student.resume_url = resume_url !== undefined ? resume_url : student.resume_url;
    student.skills = skills || student.skills;
    student.interests = interests || student.interests;

    await student.save();
    res.json({ message: "Student profile updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/students/:id
// @desc    Delete a student (Management only)
// @access  Private (Management)
router.delete("/:id", protect, authorizeRoles("faculty","management"), async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;