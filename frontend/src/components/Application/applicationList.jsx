import React, { useState, useEffect } from 'react';
import './applicationList.css'; 
import { getApplications } from '../../services/applicationsAPI';
import { useAuth } from '../../context/AuthContext';

const ApplicationList = () => {
  const { isAuthenticated, role } = useAuth();
  // Use state to manage applications (fetched from server)
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchApps = async () => {
      if (!isAuthenticated) return;
      setLoading(true);
      setError(null);
      try {
        const res = await getApplications();
        // res may be axios response -> data is in res.data
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
    // Withdraw option removed - handled server-side by faculty/management if needed
  };

  // use server data directly
  const displayApps = applications;

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

      {loading && <p>Loading applications...</p>}
      {error && <p className="error-text">Error: {error}</p>}

      {(!loading && displayApps.length === 0) ? (
        <p className="no-applications-message">You have not applied for any jobs yet.</p>
      ) : (
        <div className="application-cards-grid">
          {displayApps.map((app) => (
            <div key={app._id} className={`application-card status-${app.status}`}>
              <div className="card-header">
                {/* As this is a student view, we only show the status */}
                <div className={`app-status-tag status-tag-${app.status}`}>
                  {getStatusText(app.status)}
                </div>
              </div>
              
              <h3 className="job-title">{app.jobId?.title || app.jobId.title}</h3>
              <p className="job-company">{app.jobId?.companyName || app.jobId.companyName}</p>

              <div className="meta-info">
                <span>📍 {app.jobId?.location || app.jobId.location}</span>
                <span>💰 {app.jobId?.salaryPackage || app.jobId.salaryPackage}</span>
              </div>
              
              <div className="dates-info">
                <span>Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                <span>Last Update: {new Date(app.updatedAt).toLocaleDateString()}</span>
              </div>
              
              {/* Display Faculty Notes only if available for the student */}
              {app.facultyNotes && (
                <div className="faculty-notes">
                    <strong>Notes:</strong> {app.facultyNotes}
                </div>
              )}

              {/* Withdraw option removed for students */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationList;