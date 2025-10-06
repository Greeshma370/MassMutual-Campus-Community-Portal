import React, { useEffect, useState } from 'react';
import './facultyProfile.css';
import { getFacultyById } from '../../services/authAPI';

const FacultyProfile = () => {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getIdFromToken = () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      if (!token) return null;
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payload = JSON.parse(atob(parts[1]));
      return payload?.id;
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;
    const id = getIdFromToken();
    if (!id) {
      setError('Not authenticated');
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await getFacultyById(id);
        const data = res?.data?.data || res?.data || null;
        if (mounted) setFaculty(data);
      } catch (err) {
        console.error('Error fetching faculty profile', err);
        if (mounted) setError(err?.response?.data?.message || err.message || 'Failed to load profile');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProfile();
    return () => { mounted = false; };
  }, []);

  const handleEdit = () => console.log('Edit profile clicked');
  const handleDelete = () => console.log('Delete profile clicked');

  if (loading) return <div className="faculty-profile-container">Loading...</div>;
  if (error) return <div className="faculty-profile-container">Error: {error}</div>;

  return (
    <div className="faculty-profile-container">
      <div className="profile-card">
        <div className="profile-details">
          <h1 className="profile-name">{faculty?.name || 'Unnamed'}</h1>
          <p className="profile-role">{faculty?.role || 'Faculty'}</p>

          <div className="info-section">
            <span className="info-label">Email:</span>
            <span className="info-value">{faculty?.email || 'N/A'}</span>
          </div>

          <div className="info-section">
            <span className="info-label">Department:</span>
            <span className="info-value">{faculty?.department || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
