import express from "express";
import Faculty from "../models/Faculty.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/faculty
// @desc    Create a new faculty member
// @access  Private (Management)
router.post("/", protect, authorizeRoles("management"), async (req, res) => {
  try {
    const { name, email,emp_id, password, department } = req.body;
    
    const facultyExists = await Faculty.findOne({ email });
    if (facultyExists) {
      return res.status(400).json({
        success: false,
        message: "Faculty already exists"
      });
    }

    const faculty = await Faculty.create({
      name,
      emp_id,
      email,
      password,
      department,
      role: "faculty"
    });

    res.status(201).json({
      success: true,
      data: faculty
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/faculty
// @desc    Get all faculty (Management only)
// @access  Private (Management)
router.get("/", protect, authorizeRoles("management"), async (req, res) => {
  try {
    const faculty = await Faculty.find().select("-password");
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/faculty/:id
// @desc    Get faculty by ID
// @access  Private (Management, Faculty)
router.get("/:id", protect, authorizeRoles("management", "faculty"), async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found"
      });
    }
    res.json({
      success: true,
      data: faculty
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/faculty/:id
// @desc    Update faculty profile (Faculty themselves, or Management)
// @access  Private (Faculty updating their own, Management)
router.put("/:id", protect, async (req, res) => {
  const { name, department } = req.body;
  try {
    let faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });

    if (
      req.user.id.toString() !== faculty._id.toString() &&
      req.user.role !== "management"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this faculty's profile" });
    }

    faculty.name = name || faculty.name;
    faculty.department = department || faculty.department;
    await faculty.save();
    res.json({ message: "Faculty profile updated successfully", faculty });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/faculty/:id
// @desc    Delete a faculty (Management only)
// @access  Private (Management)
router.delete(
  "/:id",
  protect,
  authorizeRoles("management"),
  async (req, res) => {
    try {
      const faculty = await Faculty.findByIdAndDelete(req.params.id);
      if (!faculty) return res.status(404).json({ message: "Faculty not found" });
      res.json({ message: "Faculty removed" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;