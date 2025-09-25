import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// import routes
import studentRoutes from "./routes/studentRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import managementRoutes from "./routes/managementRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import loginRoutes from './routes/loginRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// connect to DB
mongoose.connect("mongodb://127.0.0.1:27017/collegePortal")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ DB connection error:", err));

// mount routes
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/management", managementRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/news", newsRoutes);
app.use('/api/login', loginRoutes);

// test route
app.get("/", (req, res) => {
  res.send("College Portal Backend Running 🚀");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
