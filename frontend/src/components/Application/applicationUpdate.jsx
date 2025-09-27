import React, { useState, useMemo } from 'react';
import './applicationUpdate.css'; 

// --- DUMMY POPULATED DATA ---
const dummyApplications = [
  {
    _id: 'app1',
    studentId: { name: 'Alice Smith', rollNo: 'S19001', department: 'CSE' },
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
    studentId: { name: 'Bob Johnson', rollNo: 'S19002', department: 'ECE' },
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
    studentId: { name: 'Charlie Brown', rollNo: 'S19003', department: 'Mech' },
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
    studentId: { name: 'Dana Scully', rollNo: 'S19004', department: 'CSE' },
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
  {
    _id: 'app5',
    studentId: { name: 'George Harrison', rollNo: 'S19005', department: 'ECE' },
    jobId: {
      _id: 'job4',
      title: 'UI/UX Designer',
      companyName: 'DesignForge',
      location: 'Pune',
      salaryPackage: '5.5 LPA',
    },
    status: 'pending',
    facultyNotes: '',
    appliedDate: new Date('2024-09-13T14:00:00.000Z'),
    updatedAt: new Date('2024-09-13T14:00:00.000Z'),
  },
];

const ApplicationListFaculty = () => {
  const [applications, setApplications] = useState(dummyApplications);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  // Function to handle status change (simulates an API update)
  const handleStatusChange = (appId, newStatus) => {
    setApplications(prevApps =>
      prevApps.map(app =>
        app._id === appId ? { ...app, status: newStatus, updatedAt: new Date() } : app
      )
    );
  };

  // Function to handle sorting logic
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  // Memoized function to sort applications based on current sortKey and sortOrder
  const sortedApplications = useMemo(() => {
    const sortableApps = [...applications];
    if (!sortKey) return sortableApps;

    sortableApps.sort((a, b) => {
      let valA, valB;
      if (sortKey === 'company') {
        valA = a.jobId.companyName.toLowerCase();
        valB = b.jobId.companyName.toLowerCase();
      } else if (sortKey === 'department') {
        valA = a.studentId.department.toLowerCase();
        valB = b.studentId.department.toLowerCase();
      } else {
        return 0; // No valid sort key
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sortableApps;
  }, [applications, sortKey, sortOrder]);

  return (
    <div className="applications-list-container">
      <h2 className="applications-title">Faculty Portal: Student Applications</h2>

      {/* Sorting Controls */}
      <div className="sort-controls">
        <span>Sort by:</span>
        <button 
          className={`sort-btn ${sortKey === 'company' ? 'active' : ''}`}
          onClick={() => handleSort('company')}
        >
          Company Name
          {sortKey === 'company' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
        </button>
        <button 
          className={`sort-btn ${sortKey === 'department' ? 'active' : ''}`}
          onClick={() => handleSort('department')}
        >
          Department
          {sortKey === 'department' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
        </button>
      </div>

      {applications.length === 0 ? (
        <p className="no-applications-message">No applications found.</p>
      ) : (
        <div className="application-cards-grid">
          {sortedApplications.map((app) => (
            <div key={app._id} className={`application-card status-${app.status}`}>
              <div className="card-header">
                <div className="student-info">
                    <strong>Student:</strong> {app.studentId.name} ({app.studentId.rollNo})
                    <br />
                    <strong>Dept:</strong> {app.studentId.department}
                </div>
                <div className="status-selector-container">
                    {/* Status Dropdown: Faculty can change the status */}
                    <select
                        className={`status-selector status-selector-${app.status}`}
                        value={app.status}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                        <option value="withdrawn">Withdrawn</option>
                    </select>
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
              
              <div className="faculty-notes">
                  {/* Faculty Notes can be viewed here */}
                  <strong>Notes:</strong> {app.facultyNotes || "No notes available."}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationListFaculty;
