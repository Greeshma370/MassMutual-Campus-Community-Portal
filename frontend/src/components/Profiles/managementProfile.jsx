import React, { useState, useEffect } from "react";
import "./managementProfile.css";
import { getProfile, getManagementById } from "../../services/authAPI";
import { useParams } from "react-router-dom";

const defaultManagement = {
  name: "John Doe",
  email: "john.doe@massmutual.edu",
  role: "management",
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
        // If an :id param is present, fetch that management's profile
        if (_id) {
          res = await getManagementById(_id);
        } else {
          res = await getProfile(); // fallback to logged-in management
        }

        const data = res?.data ?? res;
        if (mounted && data) {
          const profileData = data.data || data || {};
          setProfile((prev) => ({ ...prev, ...profileData }));
        }
      } catch (err) {
        console.error("Failed to load management profile", err);
        if (mounted)
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Failed to load profile"
          );
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

  const managementData = profile;

  return (
    <div className="management-profile-container">
      <div className="management-profile-card">
        {loading && <p>Loading profile...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <>
            <header className="profile-header">
              <h1 className="profile-name">{managementData.name}</h1>
              <p className="profile-email">{managementData.email}</p>
            </header>
          </>
        )}
      </div>
    </div>
  );
};

export default ManagementProfile;
