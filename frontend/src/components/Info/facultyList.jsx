import React, { useState, useEffect } from "react";
import { FaEnvelope, FaBuilding, FaUserTie, FaSearch, FaTrashAlt } from "react-icons/fa";
import "./facultyList.css";
import { getAllFaculty, deleteFaculty } from "../../services/authAPI";

const FacultyList = () => {
  const [faculty, setFaculty] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const dummyFaculty = [
    { _id: "1", name: "Dr. John Doe", email: "johndoe@university.edu", department: "Computer Science", role: "Faculty" },
    { _id: "2", name: "Prof. Jane Smith", email: "janesmith@university.edu", department: "Electrical Engineering", role: "Faculty" },
    { _id: "3", name: "Dr. Michael Johnson", email: "mjohnson@university.edu", department: "Mechanical Engineering", role: "Faculty" },
  ];

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchFaculty = async () => {
      try {
        const res = await getAllFaculty();
        const data = res?.data ?? res;
        const facultyArray = Array.isArray(data) ? data : data.data || data.faculty || [];
        if (mounted && facultyArray.length > 0) setFaculty(facultyArray);
        else if (mounted) setFaculty(dummyFaculty);
      } catch (err) {
        console.error("Failed to fetch faculty", err);
        if (mounted) setFaculty(dummyFaculty);
      }
    };

    fetchFaculty();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteFaculty(id);
      setFaculty(faculty.filter(member => member._id !== id));
    } catch (err) {
      console.error("Failed to delete faculty member", err);
      alert("Failed to delete faculty member.");
    }
  };

  const filteredFaculty = faculty.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  return (
    <div className="faculty-list-wrapper">
      <h2 className="faculty-heading">Our Placement Coordinators Members</h2>

      <div className="faculty-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by name or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="faculty-grid">
        {filteredFaculty.length > 0 ? (
          filteredFaculty.map((member) => (
            <div key={member._id} className="faculty-card">
              <div className="faculty-icon">
                <FaUserTie />
              </div>
              <h3 className="faculty-name">{member.name}</h3>
              <p className="faculty-role">{member.role}</p>

              <div className="faculty-info">
                <p>{member.emp_id}</p>
                <p><FaEnvelope /> {member.email}</p>
                <p><FaBuilding /> {member.department}</p>
              </div>
              <button className="delete-button" onClick={() => handleDelete(member._id)}>
                <FaTrashAlt />
              </button>
            </div>
          ))
        ) : (
          <p className="no-faculty-msg">No Placement Coordinators members found.</p>
        )}
      </div>
    </div>
  );
};

export default FacultyList;