import React, { useState, useEffect } from "react";
import { FaEnvelope, FaUserTie, FaSearch, FaCrown, FaTrashAlt } from "react-icons/fa";
import "./managementList.css";
import { getAllManagement, deleteManagement } from "../../services/authAPI";

const ManagementList = () => {
  const [management, setManagement] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchManagement = async () => {
      try {
        const res = await getAllManagement();
        const data = res?.data ?? res;
        const mgmtArray = Array.isArray(data) ? data : data.data || data.management || [];
        if (mounted && mgmtArray.length > 0) setManagement(mgmtArray);
        else if (mounted) setManagement([]);
      } catch (err) {
        console.error("Failed to fetch management", err);
        if (mounted) setManagement([]);
      }
    };

    fetchManagement();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteManagement(id);
      setManagement(management.filter(member => member._id !== id));
    } catch (err) {
      console.error("Failed to delete management member", err);
      alert("Failed to delete management member.");
    }
  };

  const filteredManagement = management.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="management-wrapper">
      <h2 className="management-title">College Management Team</h2>

      <div className="management-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by name or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="management-grid">
        {filteredManagement.length > 0 ? (
          filteredManagement.map((member) => (
            <div key={member._id} className="management-card">
              <div className="management-icon">
                <FaCrown />
              </div>
              <h3 className="management-name">{member.name}</h3>
              <p className="management-role">{member.role}</p>

              <div className="management-info">
                <p><FaEnvelope /> {member.email}</p>
                <p><FaUserTie /> Role: {member.role}</p>
              </div>
              <button className="delete-button" onClick={() => handleDelete(member._id)}>
                <FaTrashAlt />
              </button>
            </div>
          ))
        ) : (
          <p className="no-management-msg">No management members found.</p>
        )}
      </div>
    </div>
  );
};

export default ManagementList;