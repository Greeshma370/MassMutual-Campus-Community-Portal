import express from "express";
import NewsEvent from "../models/NewsEvent.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create news/event/drive
router.post("/", protect, authorizeRoles("faculty", "management"), async (req, res) => {
  try {
    const { title, description, type, eventDate } = req.body;

    const news = await NewsEvent.create({
      title,
      description,
      type: type || "news",
      eventDate: eventDate || null, // only set if provided
      postedBy: req.user._id,
    });

    res.status(201).json(news);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Get all news
router.get("/", async (req, res) => {
  try {
    const news = await NewsEvent.find()
      .populate("postedBy", "name email role")
      .sort("-postedAt");
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Update news/event/drive
router.put("/:id", protect, authorizeRoles("faculty", "management"), async (req, res) => {
  try {
    const { title, description, type, eventDate } = req.body;

    const updated = await NewsEvent.findByIdAndUpdate(
      req.params.id,
      { title, description, type, eventDate },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "News not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Delete news/event/drive
router.delete("/:id", protect, authorizeRoles("faculty", "management"), async (req, res) => {
  try {
    const deleted = await NewsEvent.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "News not found" });
    res.json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
