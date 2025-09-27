import React, { useState } from 'react';
import './applicationList.css'; 

// --- DUMMY POPULATED DATA ---
const dummyApplications = [
  {
    _id: 'app1',
    studentId: { name: 'Alice Smith', rollNo: 'S19001' },
    jobId: {
      _id: 'job1',
      title: 'Full Stack Developer Intern',
      companyName: 'NexGen Tech',
      location: 'Hyderabad',
      salaryPackage: '6 LPA',
    },
    status: 'shortlisted',
    facultyNotes: 'Excellent CGPA and good project work.',
    appliedDate: new Date('2024-09-10T10:00:00.000Z'),
    updatedAt: new Date('2024-09-25T14:30:00.000Z'),
  },
  {
    _id: 'app2',
    studentId: { name: 'Bob Johnson', rollNo: 'S19002' },
    jobId: {
      _id: 'job2',
      title: 'Data Analyst Trainee',
      companyName: 'Global Insights',
      location: 'Bangalore',
      salaryPackage: '4.5 LPA',
    },
    status: 'pending',
    facultyNotes: '',
    appliedDate: new Date('2024-09-12T11:00:00.000Z'),
    updatedAt: new Date('2024-09-12T11:00:00.000Z'),
  },
  {
    _id: 'app3',
    studentId: { name: 'Charlie Brown', rollNo: 'S19003' },
    jobId: {
      _id: 'job3',
      title: 'Cloud Engineer',
      companyName: 'CloudSphere Solutions',
      location: 'Remote',
      salaryPackage: '10 LPA',
    },
    status: 'rejected',
    facultyNotes: 'Missed minimum CGPA requirement (7.5 needed, student has 7.0).',
    appliedDate: new Date('2024-09-05T09:00:00.000Z'),
    updatedAt: new Date('2024-09-15T10:00:00.000Z'),
  },
  {
    _id: 'app4',
    studentId: { name: 'Dana Scully', rollNo: 'S19004' },
    jobId: {
      _id: 'job1',
      title: 'Full Stack Developer Intern',
      companyName: 'NexGen Tech',
      location: 'Hyderabad',
      salaryPackage: '6 LPA',
    },
    status: 'accepted',
    facultyNotes: 'Final selection confirmed by HR.',
    appliedDate: new Date('2024-09-11T12:00:00.000Z'),
    updatedAt: new Date('2024-09-28T16:00:00.000Z'),
  },
];


const ApplicationList = () => {
  // Use state to manage applications (useful if the student can withdraw)
  const [applications, setApplications] = useState(dummyApplications);

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return '⏳ Pending Review';
      case 'shortlisted':
        return '✅ Shortlisted';
      case 'accepted':
        return '🎉 Offer Accepted';
      case 'rejected':
        return '❌ Rejected';
      case 'withdrawn':
        return '🛑 Withdrawn';
      default:
        return 'Unknown';
    }
  };

  const handleWithdraw = (_id) => {
    if (window.confirm("Are you sure you want to withdraw this application?")) {
      setApplications(applications.map(app => 
        app._id === _id ? { ...app, status: 'withdrawn', updatedAt: new Date() } : app
      ));
      console.log(`Application ${_id} withdrawn.`);
    }
  };

  return (
    <div className="applications-list-container">
      <h2 className="applications-title">Your Job Applications</h2>

      {applications.length === 0 ? (
        <p className="no-applications-message">You have not applied for any jobs yet.</p>
      ) : (
        <div className="application-cards-grid">
          {applications.map((app) => (
            <div key={app._id} className={`application-card status-${app.status}`}>
              <div className="card-header">
                {/* As this is a student view, we only show the status */}
                <div className={`app-status-tag status-tag-${app.status}`}>
                  {getStatusText(app.status)}
                </div>
              </div>
              
              <h3 className="job-title">{app.jobId.title}</h3>
              <p className="job-company">{app.jobId.companyName}</p>

              <div className="meta-info">
                <span>📍 {app.jobId.location}</span>
                <span>💰 {app.jobId.salaryPackage}</span>
              </div>
              
              <div className="dates-info">
                <span>Applied: {app.appliedDate.toLocaleDateString()}</span>
                <span>Last Update: {app.updatedAt.toLocaleDateString()}</span>
              </div>
              
              {/* Display Faculty Notes only if available for the student */}
              {app.facultyNotes && (
                <div className="faculty-notes">
                    <strong>Notes:</strong> {app.facultyNotes}
                </div>
              )}

              {/* Action Button for Student */}
              {app.status === 'pending' && (
                <button 
                  className="withdraw-btn" 
                  onClick={() => handleWithdraw(app._id)}
                >
                  Withdraw Application
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationList;