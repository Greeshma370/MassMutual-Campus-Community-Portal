import React, { useState } from "react";
import "./loginStudent.css";

export default function LoginStudent() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);

    // Later: replace with API call to backend
    // fetch("/api/student/login", {method:"POST", body: JSON.stringify(formData)})
  };

  return (
    <div className="login-container">
      <h2>Student Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
