import express from "express";
import Management from "../models/Management.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/management
// @desc    Create a new management user
// @access  Private (Management only)
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const managementExists = await Management.findOne({ email });
    if (managementExists) {
      return res.status(400).json({
        success: false,
        message: "Management user already exists"
      });
    }

    const management = await Management.create({
      name,
      email,
      password,
      role: "management"
    });

    res.status(201).json({
      success: true,
      data: {
        _id: management._id,
        name: management.name,
        email: management.email,
        role: management.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/management
// @desc    Get all management users (Management only)
// @access  Private (Management)
router.get("/", protect, authorizeRoles("management"), async (req, res) => {
  try {
    const managementUsers = await Management.find().select("-password");
    res.json(managementUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/management/:id
// @desc    Get management user by ID (Management only)
// @access  Private (Management)
router.get("/:id", protect, authorizeRoles("management"), async (req, res) => {
  try {
    const managementUser = await Management.findById(req.params.id).select("-password");
    if (!managementUser) return res.status(404).json({ message: "Management user not found" });
    res.json(managementUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/management/:id
// @desc    Update management user profile (Management only, or user themselves)
// @access  Private (Management)
router.put("/:id",protect, authorizeRoles("management"), async (req, res) => {
  const { name } = req.body;
  try {
    let managementUser = await Management.findById(req.params.id);
    if (!managementUser) return res.status(404).json({ message: "Management user not found" });

    // Management can update any management profile, or a management user can update their own
    if (req.user.id.toString() !== managementUser._id.toString() && req.user.role !== "management") {
      return res.status(403).json({ message: "Not authorized to update this management profile" });
    }

    managementUser.name = name || managementUser.name;
    await managementUser.save();
    res.json({ message: "Management user profile updated successfully", managementUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/management/:id
// @desc    Delete a management user (Management only)
// @access  Private (Management)
router.delete("/:id", protect, authorizeRoles("management"), async (req, res) => {
  try {
    const managementUser = await Management.findByIdAndDelete(req.params.id);
    if (!managementUser) return res.status(404).json({ message: "Management user not found" });
    res.json({ message: "Management user removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;