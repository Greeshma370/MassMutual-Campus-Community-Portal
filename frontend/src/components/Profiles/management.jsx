import React from 'react';
import './facultyProfile.css';

// Dummy data representing the faculty profile
const facultyData = {
  name: 'Dr. Johnathan Doe',
  email: 'john.doe@university.edu',
  department: 'Computer Science',
  role: 'Faculty',
};

const FacultyProfile = () => {
  // Placeholder functions for actions (no functionality required yet)
  const handleEdit = () => {
    console.log('Edit profile button clicked. (Functionality TBD)');
  };

  const handleDelete = () => {
    console.log('Delete profile button clicked. (Functionality TBD)');
  };

  return (
    <div className="faculty-profile-container">
      <div className="profile-card">
        {/* Profile Details */}
        <div className="profile-details">
          <h1 className="profile-name">{facultyData.name}</h1>
          <p className="profile-role">{facultyData.role}</p>
          
          <div className="info-section">
            <span className="info-label">Email:</span>
            <span className="info-value">{facultyData.email}</span>
          </div>
          
          <div className="info-section">
            <span className="info-label">Department:</span>
            <span className="info-value">{facultyData.department}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="profile-actions">
          <button className="action-btn edit-btn" onClick={handleEdit}>
            Edit Profile
          </button>
          <button className="action-btn delete-btn" onClick={handleDelete}>
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
