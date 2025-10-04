import React, { useState, useEffect } from "react";
import "./studentList.css";
import { getAllStudents } from '../../services/authAPI';

const StudentList = () => {
  // Dummy student data
  const dummyStudents = [
    {
      _id: "1",
      name: "Amit Verma",
      email: "amit.verma@university.edu",
      yearSem: "3rd Year, 6th Sem",
      cgpa: 8.5,
      department: "Computer Science",
      backlogs: 0,
      intern_details: "Intern at Infosys - Web Development",
      resume_url: "https://example.com/resume/amit",
      skills: ["JavaScript", "React", "Node.js"],
      interests: ["Web Development", "AI/ML"],
      role: "student",
    },
    {
      _id: "2",
      name: "Priya Sharma",
      email: "priya.sharma@university.edu",
      yearSem: "2nd Year, 4th Sem",
      cgpa: 9.1,
      department: "Electrical Engineering",
      backlogs: 1,
      intern_details: "Summer internship at Siemens",
      resume_url: "https://example.com/resume/priya",
      skills: ["MATLAB", "C++", "VHDL"],
      interests: ["Embedded Systems", "Robotics"],
      role: "student",
    },
    {
      _id: "3",
      name: "Rahul Nair",
      email: "rahul.nair@university.edu",
      yearSem: "4th Year, 8th Sem",
      cgpa: 7.8,
      department: "Mechanical Engineering",
      backlogs: 2,
      intern_details: "Internship at Tata Motors",
      resume_url: "https://example.com/resume/rahul",
      skills: ["AutoCAD", "SolidWorks"],
      interests: ["Automobile Design", "Manufacturing"],
      role: "student",
    },
  ];

  const [students, setStudents] = useState([]);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchStudents = async () => {
      try {
        const res = await getAllStudents();
        const data = res?.data ?? res;
        const studentsArray = Array.isArray(data) ? data : (data.data || data.students || []);
        if (mounted && studentsArray.length > 0) setStudents(studentsArray);
        else if (mounted) setStudents(dummyStudents); // fallback for dev
      } catch (err) {
        console.error('Failed to fetch students', err);
        if (mounted) setStudents(dummyStudents);
      }
    };

    fetchStudents();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="student-list-container">
      <h2 className="student-list-title">Student Profiles</h2>
      <div className="student-grid">
        {students.map((student) => (
          <div key={student._id} className="student-card">
            <h3 className="student-name">{student.name}</h3>
            <p className="student-email">📧 {student.email}</p>
            <p className="student-department">🏫 {student.department}</p>
            <p className="student-year">📅 {student.yearSem}</p>
            <p className="student-cgpa">⭐ CGPA: {student.cgpa}</p>
            <p className="student-backlogs">❌ Backlogs: {student.backlogs}</p>
            <p className="student-intern">💼 {student.intern_details}</p>
            <p className="student-resume">
              📄 <a href={student.resume_url} target="_blank" rel="noreferrer">View Resume</a>
            </p>
            <div className="student-skills">
              <strong>Skills:</strong>
              <ul>
                {student.skills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="student-interests">
              <strong>Interests:</strong>
              <ul>
                {student.interests.map((interest, idx) => (
                  <li key={idx}>{interest}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
