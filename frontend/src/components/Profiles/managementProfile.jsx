import React, { useState, useEffect } from "react";
import './managementProfile.css';
import { getProfile, getManagementById } from "../../services/authAPI";
import { useParams } from "react-router-dom";

const defaultManagement = {
  name: "John Doe",
  email: "john.doe@massmutual.edu",
  role: "Super Admin",
};

const ManagementProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(defaultManagement);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchProfile = async (_id) => {
      setLoading(true);
      try {
        let res;
        if (_id) res = await getManagementById(_id);
        else res = await getProfile();

        const data = res?.data ?? res;
        if (mounted && data) {
          const profileData = data.data || data || {};
          setProfile(prev => ({ ...prev, ...profileData }));
        }
      } catch (err) {
        console.error("Failed to load profile", err);
        if (mounted) setError(err?.response?.data?.message || err?.message || "Failed to load profile");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProfile(id);

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [id]);

  const handleEdit = () => alert("Edit profile clicked");
 const handleLogout = () => {
  // remove token and user data from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // redirect to login page
  window.location.href = "/";
};


  const firstLetter = profile.name ? profile.name.charAt(0).toUpperCase() : "M";

  return (
    <div className="management-profile-wrapper">
      <div className="management-profile-card">
        {loading && <p className="loading-text">Loading profile...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <>
            <div className="profile-avatar">{firstLetter}</div>
            <div className="profile-header">
              <h1 className="profile-name">{profile.name}</h1>
              {profile.role.toLowerCase() === "super admin" && (
                <span className="super-admin-badge">SUPER ADMIN</span>
              )}
              <p className="profile-role">{profile.role}</p>
              <p className="profile-email">{profile.email}</p>
            </div>

            <div className="profile-actions">
               <button className="action-btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManagementProfile;
