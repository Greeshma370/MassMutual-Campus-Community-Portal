import React, { useState, useEffect } from 'react';
import './applicationList.css';
import { getApplications } from '../../services/applicationsAPI';
import { useAuth } from '../../context/AuthContext';

const ApplicationList = () => {
  const { isAuthenticated } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let mounted = true;
    const fetchApps = async () => {
      if (!isAuthenticated) return;
      setLoading(true);
      setError(null);
      try {
        const res = await getApplications();
        const data = res?.data ?? res;
        const appsArray = Array.isArray(data) ? data : (data.data || data.applications || []);
        if (mounted) setApplications(appsArray);
      } catch (err) {
        console.error('Failed to load applications', err);
        if (mounted) setError(err?.response?.data?.message || err?.message || 'Failed to load applications');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchApps();
    return () => { mounted = false; };
  }, [isAuthenticated]);

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return '⏳ Pending';
      case 'shortlisted':
        return '✅ Shortlisted';
      case 'accepted':
        return '🎉 Accepted';
      case 'rejected':
        return '❌ Rejected';
      case 'withdrawn':
        return '🛑 Withdrawn';
      default:
        return 'Unknown';
    }
  };

  const filteredApplications = applications.filter(app => {
    const searchTermLower = searchTerm.toLowerCase();
    const title = app.jobId?.title?.toLowerCase() || '';
    const company = app.jobId?.companyName?.toLowerCase() || '';
    return title.includes(searchTermLower) || company.includes(searchTermLower);
  });

  if (!isAuthenticated) {
    return (
      <div className="applications-list-container">
        <h2 className="applications-title">Your Job Applications</h2>
        <p className="no-applications-message">Please log in as a student to view your applications.</p>
      </div>
    );
  }

  return (
    <div className="applications-list-container">
      <h2 className="applications-title">Your Job Applications</h2>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by job title or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {loading && <p>Loading applications...</p>}
      {error && <p className="error-text">Error: {error}</p>}

      {(!loading && filteredApplications.length === 0) ? (
        <p className="no-applications-message">
          {searchTerm ? 'No applications match your search.' : 'You have not applied for any jobs yet.'}
        </p>
      ) : (
        <div className="application-cards-grid">
          {filteredApplications.map((app) => (
            <div key={app._id} className={`application-card status-${app.status}`}>
              <div className="card-header">
                <div className={`app-status-tag status-tag-${app.status}`}>
                  {getStatusText(app.status)}
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
                <div className="rounds-info">
                  <h4>Application Rounds</h4>
                  <ul>
                    {app.rounds.map((round, index) => (
                      <li key={index}>
                        {round.roundName}: <span className={`round-status-${round.status}`}>{getStatusText(round.status)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {app.facultyNotes && (
                <div className="faculty-notes">
                    <strong>Notes:</strong> {app.facultyNotes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationList;