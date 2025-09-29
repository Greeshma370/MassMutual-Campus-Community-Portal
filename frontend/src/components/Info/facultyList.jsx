import React, { useState, useEffect } from "react";
import "./facultyList.css";

const FacultyList = () => {
  // Dummy faculty data
  const dummyFaculty = [
    {
      _id: "1",
      name: "Dr. John Doe",
      email: "johndoe@university.edu",
      department: "Computer Science",
      role: "faculty",
    },
    {
      _id: "2",
      name: "Prof. Jane Smith",
      email: "janesmith@university.edu",
      department: "Electrical Engineering",
      role: "faculty",
    },
    {
      _id: "3",
      name: "Dr. Michael Johnson",
      email: "mjohnson@university.edu",
      department: "Mechanical Engineering",
      role: "faculty",
    },
  ];

  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    // In real case: fetch from backend
    setFaculty(dummyFaculty);
  }, []);

  return (
    <div className="faculty-list-container">
      <h2 className="faculty-list-title">Faculty Members</h2>
      <div className="faculty-grid">
        {faculty.map((member) => (
          <div key={member._id} className="faculty-card">
            <h3 className="faculty-name">{member.name}</h3>
            <p className="faculty-email">📧 {member.email}</p>
            <p className="faculty-department">🏫 {member.department}</p>
            <p className="faculty-role">🎓 Role: {member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyList;
