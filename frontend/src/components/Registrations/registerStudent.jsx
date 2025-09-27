import React, { useState } from "react";
import "./RegisterStudent.css";

export default function RegisterStudent() {
  const [formData, setFormData] = useState({
    name: "",
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

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Prevent CGPA > 10
    if (name === "cgpa") {
      if (value > 10) value = 10;
      if (value < 0) value = 0;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);

    // Later: send to backend API
  };

  return (
    <div className="register-container">
      <h2> Student Registration</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="yearSem" placeholder="Year & Semester (e.g.,3-1)" onChange={handleChange} required />
        <input type="number" name="cgpa" placeholder="CGPA (0-10)" step="0.01" min="0" max="10" onChange={handleChange} required />
        <input type="text" name="department" placeholder="Department" onChange={handleChange} required />
        <input type="number" name="backlogs" placeholder="No. of Backlogs" min="0" onChange={handleChange} />
        <textarea name="intern_details" placeholder="Internship Details" onChange={handleChange} required />
        <input type="url" name="resume_url" placeholder="Resume URL" onChange={handleChange} required />
        <input type="text" name="skills" placeholder="Skills (comma separated)" onChange={handleChange} />
        <input type="text" name="interests" placeholder="Interests (comma separated)" onChange={handleChange} />
        
        <button type="submit">Register </button>
      </form>
    </div>
  );
}
