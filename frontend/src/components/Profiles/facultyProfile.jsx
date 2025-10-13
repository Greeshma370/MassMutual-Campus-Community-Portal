import React, { useState, useEffect } from "react";
import "./facultyProfile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FacultyProfile = () => {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ API base URL
  const APIURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/faculty/";


  // ✅ Function to decode faculty ID from token
  const getIdFromToken = () => {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("authToken");
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload?.id;
    } catch {
      return null;
    }
  };

  // ✅ Fetch faculty profile data
  useEffect(() => {
    let mounted = true;
    const id = getIdFromToken();
    if (!id) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    if (!token) throw new Error("No authentication token found");

    const res = await axios.get(`${APIURL}${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = res?.data?.data || res?.data || null;
    setFaculty(data);
  } catch (err) {
    console.error("Error fetching Placement Coordinator profile:", err);
    setError(err?.response?.data?.message || err.message || "Failed to load profile");
  } finally {
    setLoading(false);
  }
};


    fetchProfile();
    return () => {
      mounted = false;
    };
  }, []);

  // ✅ Edit handler
  const handleEdit = () => {
    navigate(`/faculty/edit/${faculty?._id}`);
  };

  // ✅ Delete handler
  const handleDelete = async () => {
    if (!faculty?._id) return;
    if (window.confirm("Are you sure you want to delete this profile?")) {
      try {
        await axios.delete(`${APIURL}/${faculty._id}`);
        alert("Profile deleted successfully");
        navigate("/dashboard/management");
      } catch (err) {
        console.error("Delete failed", err);
        alert("Failed to delete profile");
      }
    }
  };

  if (loading) return <div className="faculty-profile-container">Loading...</div>;
  if (error) return <div className="faculty-profile-container">Error: {error}</div>;

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("authToken");
  navigate("/login");
};
return (
  <div className="faculty-profile-container">
    <div className="profile-card">
      <div className="profile-details">
        <h1 className="profile-name">{faculty?.name || "Unnamed"}</h1>
        <p className="profile-role">{faculty?.role || "Placement Coordinator"}</p>

        <div className="info-section">
          <span className="info-label">Employee ID:</span>
          <span className="info-value">{faculty?.emp_id || "N/A"}</span>
        </div>

        <div className="info-section">
          <span className="info-label">Email:</span>
          <span className="info-value">{faculty?.email || "N/A"}</span>
        </div>

        <div className="info-section">
          <span className="info-label">Department:</span>
          <span className="info-value">{faculty?.department || "N/A"}</span>
        </div>
      </div>

      {/* ✅ Logout button here */}
      <div className="profile-actions">
        <button className="action-btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  </div>
);

};

export default FacultyProfile;
