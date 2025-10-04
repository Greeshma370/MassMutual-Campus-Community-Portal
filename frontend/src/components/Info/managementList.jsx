import React, { useState, useEffect } from "react";
import "./managementList.css";
import { getAllManagement } from '../../services/authAPI';

const ManagementList = () => {
  const [management, setManagement] = useState([]);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchManagement = async () => {
      try {
        const res = await getAllManagement();
        const data = res?.data ?? res;
        const mgmtArray = Array.isArray(data) ? data : (data.data || data.management || []);
        if (mounted && mgmtArray.length > 0) setManagement(mgmtArray);
        else if (mounted) setManagement([]);
      } catch (err) {
        console.error('Failed to fetch management', err);
        if (mounted) setManagement([]);
      }
    };

    fetchManagement();

    return () => {
      mounted = false;
      controller.abort();
    };
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

