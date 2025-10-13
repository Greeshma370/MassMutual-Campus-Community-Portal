import React, { useState } from "react";
import "./RegisterStudent.css";
import { register } from "../../services/authAPI";
import { useNavigate } from "react-router-dom";

export default function RegisterStudent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    rollnumber: "",
    email: "",
    password: "",
    yearSem: "",
    cgpa: "",
    department: "",
    backlogs: "",
    intern_details: "",
    resume_url: "",
    skills: "",
    interests: "",
  });

  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "cgpa") {
      if (value > 10) value = 10;
      if (value < 0) value = 0;
    }

    if (name === "email") {
      // ✅ Email domain validation on the fly
      if (value && !value.toLowerCase().includes("student.vardhaman.org")) {
        setEmailError("Please use a valid Vardhaman email address.");
      } else {
        setEmailError("");
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Final email check before submitting
    if (!formData.email.toLowerCase().includes("vardhaman")) {
      setEmailError("Please use a valid Vardhaman email address.");
      return;
    }

    try {
      const response = await register("student", formData);
      console.log("Registration successful:", response);
      navigate("/login/student");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Student Registration</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="rollnumber"
            placeholder="Roll Number"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          {emailError && (
            <p style={{ color: "red", fontSize: "0.9rem", marginTop: "-10px" }}>
              {emailError}
            </p>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="yearSem"
            placeholder="Year & Semester (e.g., 3-1)"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="cgpa"
            placeholder="CGPA (0-10)"
            step="0.01"
            min="0"
            max="10"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="backlogs"
            placeholder="No. of Backlogs"
            min="0"
            onChange={handleChange}
          />
          <textarea
            name="intern_details"
            placeholder="Internship Details"
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="resume_url"
            placeholder="Resume URL"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            onChange={handleChange}
          />
          <input
            type="text"
            name="interests"
            placeholder="Interests (comma separated)"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="register-btn"
            disabled={!!emailError} // Prevent submission if invalid email
          >
            Register
          </button>
        </form>

        <button
          className="login-btn"
          onClick={() => navigate("/login/student")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}