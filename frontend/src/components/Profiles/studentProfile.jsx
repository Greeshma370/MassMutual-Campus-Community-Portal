import React, { useState, useEffect } from 'react';
import './studentProfile.css';
import { getProfile, getStudentById } from '../../services/authAPI';
import { useParams } from 'react-router-dom';

const renderTags = (tags, type) => (
  <div className="tags-container">
    {tags.map((tag, idx) => (
      <span key={idx} className={`tag tag-${type}`}>
        {tag}
      </span>
    ))}
  </div>
);

const StudentProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchProfile = async (_id) => {
      setLoading(true);
      try {
        let res;
        if (_id) {
          res = await getStudentById(_id);
        } else {
          res = await getProfile();
        }
        const data = res?.data ?? res;
        if (mounted && data) {
          const profileData = data.data || data || {};
          setProfile(prev => ({ ...prev, ...profileData }));
        }
      } catch (err) {
        if (mounted) setError(err?.response?.data?.message || err?.message || 'Failed to load profile');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProfile(id);
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="student-profile-container"><p className="loading-text">Loading profile...</p></div>;
  if (error) return <div className="student-profile-container"><p className="error-text">{error}</p></div>;

  const studentData = profile;
  const handleLogout = async () => {
  try {
    // Optional: if you have a backend logout endpoint
    // await API.post("/logout");

    // Remove token and user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
 
    // Redirect to login page
    window.location.href = "/";
  } catch (error) {
    console.error("Logout failed", error);
  }
};

  return (
    <div className="student-profile-container">
      <div className="profile-card">
        <header className="profile-header">
          <h1 className="profile-name">{studentData.name}</h1>
          <p className="profile-department">{studentData.department}</p>
          <p className="profile-semester">{studentData.yearSem}</p>

        </header>
      <div className="info-section">
    <span className="info-value1">{studentData.rollnumber}</span>
  </div>
        <div className="stats-grid">
          <div className="stat-item cgpa">
            <span className="stat-label">CGPA</span>
            <span className="stat-value">{Number(studentData.cgpa || 0).toFixed(2)} / 10</span>
          </div>
          <div className="stat-item backlogs">
            <span className="stat-label">Current Backlogs</span>
            <span className="stat-value">{studentData.backlogs ?? 0}</span>
          </div>
        </div>

        <div className="info-group">
          <div className="info-section">
            <span className="info-label">Email:</span>
            <span className="info-value">{studentData.email}</span>
          </div>
          {studentData.resume_url && (
            <div className="info-section">
              <span className="info-label">Resume:</span>
              <a href={studentData.resume_url} target="_blank" rel="noopener noreferrer" className="info-value resume-link">
                View Resume
              </a>
            </div>
          )}
        </div>

        <div className="details-section">
          <h2>Internship Details</h2>
          <p className="intern-details-content">{studentData.intern_details || "No internship details provided."}</p>
        </div>

        <div className="details-section">
          <h2>Key Skills ({(studentData.skills || []).length})</h2>
          {renderTags(studentData.skills || [], 'skill')}
        </div>

        <div className="details-section">
          <h2>Interests ({(studentData.interests || []).length})</h2>
          {renderTags(studentData.interests || [], 'interest')}
        </div>
              <div className="profile-actions">
  <button className="action-btn logout-btn" onClick={handleLogout}>
    Logout
  </button>
</div>
      </div>
    </div>
  );
};

export default StudentProfile;
