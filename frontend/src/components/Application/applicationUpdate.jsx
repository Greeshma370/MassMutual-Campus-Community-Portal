import React, { useState, useMemo, useEffect } from 'react';
import './applicationUpdate.css';
import { getApplications, updateApplication } from '../../services/applicationsAPI';
import { useAuth } from '../../context/AuthContext';

const ApplicationListFaculty = () => {
  const { isAuthenticated, role } = useAuth();
  const [applications, setApplications] = useState([]);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = async (appId, newStatus) => {
    try {
      setApplications(prev => prev.map(a => a._id === appId ? { ...a, status: newStatus, updatedAt: new Date() } : a));
      await updateApplication(appId, { status: newStatus });
    } catch (err) {
      console.error('Failed to update application status', err);
      setError(err?.response?.data?.message || err?.message || 'Failed to update application');
      // Simple rollback on failure by refetching
      fetchApps();
    }
  };

  const handleRoundStatusChange = async (appId, roundIndex, newStatus) => {
    try {
      const appToUpdate = applications.find(a => a._id === appId);
      const updatedRounds = [...appToUpdate.rounds];
      updatedRounds[roundIndex].status = newStatus;

      setApplications(prev => prev.map(a => a._id === appId ? { ...a, rounds: updatedRounds, updatedAt: new Date() } : a));
      await updateApplication(appId, { rounds: updatedRounds });
    } catch (err) {
      console.error('Failed to update round status', err);
      setError(err?.response?.data?.message || err?.message || 'Failed to update round status');
      // Simple rollback on failure by refetching
      fetchApps();
    }
  };

  const fetchApps = async () => {
    if (!isAuthenticated || !(role === 'faculty' || role === 'management')) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getApplications();
      const data = res?.data ?? res;
      const appsArray = Array.isArray(data) ? data : (data.data || data.applications || []);
      setApplications(appsArray);
    } catch (err) {
      console.error('Failed to fetch applications', err);
      setError(err?.response?.data?.message || err?.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, [isAuthenticated, role]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedAndFilteredApplications = useMemo(() => {
    let filteredApps = [...applications];

    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filteredApps = filteredApps.filter(app => {
        const studentName = app.studentId?.name?.toLowerCase() || '';
        const jobTitle = app.jobId?.title?.toLowerCase() || '';
        const companyName = app.jobId?.companyName?.toLowerCase() || '';
        return studentName.includes(searchTermLower) || jobTitle.includes(searchTermLower) || companyName.includes(searchTermLower);
      });
    }

    if (!sortKey) return filteredApps;

    const sortableApps = [...filteredApps];
    sortableApps.sort((a, b) => {
      let valA, valB;
      if (sortKey === 'company') {
        valA = a.jobId.companyName.toLowerCase();
        valB = b.jobId.companyName.toLowerCase();
      } else if (sortKey === 'department') {
        valA = a.studentId.department.toLowerCase();
        valB = b.studentId.department.toLowerCase();
      } else {
        return 0;
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sortableApps;
  }, [applications, sortKey, sortOrder, searchTerm]);

  return (
    <div className="applications-list-container">
      <h2 className="applications-title">Faculty Portal: Student Applications</h2>

      <div className="controls-container">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search by student, job, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="sort-controls">
          <span>Sort by:</span>
          <button className={`sort-btn ${sortKey === 'company' ? 'active' : ''}`} onClick={() => handleSort('company')}>
            Company Name {sortKey === 'company' && (sortOrder === 'asc' ? '▲' : '▼')}
          </button>
          <button className={`sort-btn ${sortKey === 'department' ? 'active' : ''}`} onClick={() => handleSort('department')}>
            Department {sortKey === 'department' && (sortOrder === 'asc' ? '▲' : '▼')}
          </button>
        </div>
      </div>


      {loading && <p>Loading applications...</p>}
      {error && <p className="error-text">Error: {error}</p>}

      {!loading && sortedAndFilteredApplications.length === 0 ? (
        <p className="no-applications-message">{searchTerm ? 'No applications match your search.' : 'No applications found.'}</p>
      ) : (
        <div className="application-cards-grid">
          {sortedAndFilteredApplications.map((app) => (
            <div key={app._id} className={`application-card status-${app.status}`}>
              <div className="card-header">
                <div className="student-info">
                    <strong>Student:</strong> {app.studentId?.name} ({app.studentId?.rollNo})
                    <br />
                    <strong>Dept:</strong> {app.studentId?.department}
                </div>
                <div className="status-selector-container">
                    <select className={`status-selector status-selector-${app.status}`} value={app.status} onChange={(e) => handleStatusChange(app._id, e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
              </div>
              
              <h3 className="job-title">{app.jobId?.title}</h3>
              <p className="job-company">{app.jobId?.companyName}</p>

              <div className="meta-info">
                <span>📍 {app.jobId?.location}</span>
                <span>💰 {app.jobId?.salaryPackage}</span>
              </div>
              
              <div className="dates-info">
                <span>Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                <span>Last Update: {new Date(app.updatedAt).toLocaleDateString()}</span>
              </div>
              
              {app.rounds && app.rounds.length > 0 && (
                <div className="rounds-update">
                  <h4>Update Round Status</h4>
                  {app.rounds.map((round, index) => (
                    <div key={index} className="round-status-updater">
                      <label>{round.roundName}:</label>
                      <select value={round.status} onChange={(e) => handleRoundStatusChange(app._id, index, e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  ))}
                </div>
              )}

              <div className="faculty-notes">
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