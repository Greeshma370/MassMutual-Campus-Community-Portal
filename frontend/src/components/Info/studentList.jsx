import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaGraduationCap,
  FaStar,
  FaBriefcase,
  FaFileAlt,
  FaTrashAlt,
} from "react-icons/fa";
import "./studentList.css";
import { getAllStudents, deleteStudent } from "../../services/authAPI";

export default function StudentList() {
  const dummyStudents = [
    {
      _id: "1",
      name: "Amit Verma",
      rollnumber: "CS2023001",
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
  ];

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [branchFilter, setBranchFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getAllStudents();
        const data = res?.data ?? res;
        const studentsArray = Array.isArray(data)
          ? data
          : data.data || data.students || [];
        setStudents(studentsArray.length ? studentsArray : dummyStudents);
      } catch (err) {
        console.error("Failed to fetch students", err);
        setStudents(dummyStudents);
      }
    };

    fetchStudents();
  }, []);

  // Handle student deletion
  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      setStudents(students.filter(student => student._id !== id));
    } catch (err) {
      console.error("Failed to delete student", err);
      alert("Failed to delete student.");
    }
  };

  // derive unique branch and year options from students
  const branchOptions = Array.from(new Set(students.map(s => s.department))).filter(Boolean);
  const yearOptions = Array.from(new Set(students.map(s => s.yearSem))).filter(Boolean);

  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = branchFilter === 'All' || s.department === branchFilter;
    const matchesYear = yearFilter === 'All' || s.yearSem === yearFilter;
    return matchesSearch && matchesBranch && matchesYear;
  });

  return (
    <div className="student-page">
      <div className="student-list-container">
        <h2 className="student-list-title">Student Profiles</h2>

        <div className="search-bar-container">
          <input
            type="text"
            placeholder="🔍 Search by name or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)}>
            <option value="All">All Branches</option>
            {branchOptions.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
            <option value="All">All Years</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="student-grid">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div key={student._id} className="student-card">
                <div className="student-header">
                  <h3>{student.name}</h3>
                  <span className="student-role-badge">
                    {student.role.toUpperCase()}
                  </span>
                  <button className="delete-button" onClick={() => handleDelete(student._id)}>
                    <FaTrashAlt />
                  </button>
                </div>
                <p>
                  {student.rollnumber}
                </p>
                <p>
                  <FaEnvelope /> {student.email}
                </p>
                <p>
                  <FaGraduationCap /> {student.department} - {student.yearSem}
                </p>
                <p>
                  <FaStar /> CGPA: {student.cgpa}
                </p>
                <p>❌ Backlogs: {student.backlogs}</p>
                <p>
                  <FaBriefcase /> {student.intern_details}
                </p>
                <p>
                  <FaFileAlt />{" "}
                  <a href={student.resume_url} target="_blank" rel="noreferrer">
                    View Resume
                  </a>
                </p>

                <div className="tags-section">
                  <div>
                    <strong>Skills:</strong>
                    <div className="tag-list">
                      {student.skills.map((skill, idx) => (
                        <span key={idx} className="tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong>Interests:</strong>
                    <div className="tag-list">
                      {student.interests.map((interest, idx) => (
                        <span key={idx} className="tag interest">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-student-msg">No students found.</p>
          )}
        </div>
      </div>
    </div>
  );
}