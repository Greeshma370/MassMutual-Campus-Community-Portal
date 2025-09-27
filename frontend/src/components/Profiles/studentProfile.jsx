import React from 'react';
import './studentProfile.css';

// Dummy data representing the student profile
const studentData = {
  name: 'Aisha Sharma',
  email: 'aisha.sharma@example.com',
  yearSem: '3rd Year, 6th Sem',
  cgpa: 9.15,
  department: 'Computer Science',
  backlogs: 0,
  intern_details: 'Completed a 3-month remote internship at DataWave Analytics focusing on predictive modeling using Python and TensorFlow. Successfully reduced error rates by 15%.',
  resume_url: 'https://cloud-storage/aisha_sharma_resume.pdf',
  skills: ['Python', 'Data Structures & Algorithms', 'React', 'Node.js', 'MongoDB', 'AWS'],
  interests: ['Web Development', 'Cloud Computing', 'Competitive Coding'],
  role: 'student',
};

// Helper function to render skill/interest tags
const renderTags = (tags, type) => (
  <div className="tags-container">
    {tags.map((tag, index) => (
      <span key={index} className={`tag tag-${type}`}>
        {tag}
      </span>
    ))}
  </div>
);

const StudentProfile = () => {
  return (
    <div className="student-profile-container">
      <div className="profile-card">
        
        {/* Header Section */}
        <header className="profile-header">
          <h1 className="profile-name">{studentData.name}</h1>
          <p className="profile-department">{studentData.department}</p>
          <p className="profile-semester">{studentData.yearSem}</p>
        </header>

        {/* Core Academic Stats */}
        <div className="stats-grid">
          <div className="stat-item cgpa">
            <span className="stat-label">CGPA</span>
            <span className="stat-value">{studentData.cgpa.toFixed(2)} / 10</span>
          </div>
          <div className="stat-item backlogs">
            <span className="stat-label">Current Backlogs</span>
            <span className="stat-value">{studentData.backlogs}</span>
          </div>
        </div>

        {/* Contact and Resume */}
        <div className="info-group">
          <div className="info-section">
            <span className="info-label">Email:</span>
            <span className="info-value">{studentData.email}</span>
          </div>
          <div className="info-section">
            <span className="info-label">Resume:</span>
            <a 
              href={studentData.resume_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="info-value resume-link"
            >
              View Resume
            </a>
          </div>
        </div>

        {/* Internship Details */}
        <div className="details-section">
          <h2>Internship Details</h2>
          <p className="intern-details-content">{studentData.intern_details || "No formal internship details provided yet."}</p>
        </div>

        {/* Skills */}
        <div className="details-section">
          <h2>Key Skills ({studentData.skills.length})</h2>
          {renderTags(studentData.skills, 'skill')}
        </div>

        {/* Interests */}
        <div className="details-section">
          <h2>Interests ({studentData.interests.length})</h2>
          {renderTags(studentData.interests, 'interest')}
        </div>
        
      </div>
    </div>
  );
};

export default StudentProfile;