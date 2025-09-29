import React, { useState, useEffect } from "react";
import "./managementList.css";

const ManagementList = () => {
  // Dummy management data
  const dummyManagement = [
    {
      _id: "1",
      name: "Mr. Rajesh Kumar",
      email: "rajesh.kumar@university.edu",
      role: "management",
    },
    {
      _id: "2",
      name: "Mrs. Anita Sharma",
      email: "anita.sharma@university.edu",
      role: "management",
    },
    {
      _id: "3",
      name: "Dr. Suresh Mehta",
      email: "suresh.mehta@university.edu",
      role: "management",
    },
  ];

  const [management, setManagement] = useState([]);

  useEffect(() => {
    // In real case: fetch from backend API
    setManagement(dummyManagement);
  }, []);

  return (
    <div className="management-list-container">
      <h2 className="management-list-title">Management Members</h2>
      <div className="management-grid">
        {management.map((member) => (
          <div key={member._id} className="management-card">
            <h3 className="management-name">{member.name}</h3>
            <p className="management-email">📧 {member.email}</p>
            <p className="management-role">🎓 Role: {member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagementList;
