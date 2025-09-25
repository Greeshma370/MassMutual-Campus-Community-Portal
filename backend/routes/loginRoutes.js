import express from 'express';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
import Faculty from '../models/Faculty.js';
import Management from '../models/Management.js';

const router = express.Router();

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

// @route   POST /api/login/student
// @desc    Login student
// @access  Public
router.post('/student', async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Direct password comparison since passwords aren't hashed
    if (password !== student.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: student._id,
      name: student.name,
      email: student.email,
      role: student.role,
      token: generateToken(student._id, student.role)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/login/faculty
// @desc    Login faculty
// @access  Public
router.post('/faculty', async (req, res) => {
  const { email, password } = req.body;

  try {
    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Direct password comparison
    if (password !== faculty.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: faculty._id,
      name: faculty.name,
      email: faculty.email,
      department: faculty.department,
      role: faculty.role,
      token: generateToken(faculty._id, faculty.role)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/login/management
// @desc    Login management
// @access  Public
router.post('/management', async (req, res) => {
  const { email, password } = req.body;

  try {
    const management = await Management.findOne({ email });
    if (!management) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Direct password comparison
    if (password !== management.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: management._id,
      name: management.name,
      email: management.email,
      role: management.role,
      token: generateToken(management._id, management.role)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;