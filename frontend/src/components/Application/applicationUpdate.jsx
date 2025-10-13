import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './applicationUpdate.css';
import { getApplications, updateApplication } from '../../services/applicationsAPI';
import { useAuth } from '../../context/AuthContext';

const ApplicationListFaculty = () => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [companyFilter, setCompanyFilter] = useState('All');

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

  const handleStatusChange = async (appId, newStatus) => {
    try {
      setApplications(prev =>
        prev.map(a => a._id === appId ? { ...a, status: newStatus, updatedAt: new Date() } : a)
      );
      await updateApplication(appId, { status: newStatus });
    } catch {
      fetchApps(); // rollback
    }
  };

  const handleRoundStatusChange = async (appId, roundIndex, newStatus) => {
    try {
      const appToUpdate = applications.find(a => a._id === appId);
      const updatedRounds = [...appToUpdate.rounds];
      updatedRounds[roundIndex].status = newStatus;
      setApplications(prev =>
        prev.map(a => a._id === appId ? { ...a, rounds: updatedRounds, updatedAt: new Date() } : a)
      );
      await updateApplication(appId, { rounds: updatedRounds });
    } catch {
      fetchApps(); // rollback
    }
  };

  const handleSort = (key) => {
    if (sortKey === key) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedAndFilteredApplications = useMemo(() => {
    let filteredApps = [...applications];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredApps = filteredApps.filter(app =>
        (app.studentId?.name || '').toLowerCase().includes(term) ||
        (app.jobId?.title || '').toLowerCase().includes(term) ||
        (app.jobId?.companyName || '').toLowerCase().includes(term)
      );
    }

    // Filters
    if (deptFilter !== 'All') {
      filteredApps = filteredApps.filter(app => (app.studentId?.department || '') === deptFilter);
    }
    if (yearFilter !== 'All') {
      filteredApps = filteredApps.filter(app => (app.studentId?.yearSem || '') === yearFilter);
    }
    if (companyFilter !== 'All') {
      filteredApps = filteredApps.filter(app => (app.jobId?.companyName || '') === companyFilter);
    }

    if (!sortKey) return filteredApps;

    return filteredApps.sort((a, b) => {
      const valA = sortKey === 'company'
        ? a.jobId.companyName.toLowerCase()
        : a.studentId.department.toLowerCase();
      const valB = sortKey === 'company'
        ? b.jobId.companyName.toLowerCase()
        : b.studentId.department.toLowerCase();
      return sortOrder === 'asc' ? (valA < valB ? -1 : 1) : (valA > valB ? -1 : 1);
    });
  }, [applications, sortKey, sortOrder, searchTerm, deptFilter, yearFilter, companyFilter]);

  return (
    <div className="applications-list-container">
      <h2 className="applications-title">Faculty Portal: Student Applications</h2>

      {/* Back Button */}
      <button className="back-home-btn" onClick={() => navigate('/dashboard/faculty')}>
        ← Back to Dashboard
      </button>

      {/* Search & Filters */}
      <div className="controls-container">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search by student, job, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          {/* Department Filter */}
          <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
            <option value="All">All Departments</option>
            {Array.from(new Set(applications.map(a => a.studentId?.department).filter(Boolean))).map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Year Filter */}
          <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
            <option value="All">All Years</option>
            {Array.from(new Set(applications.map(a => a.studentId?.yearSem).filter(Boolean))).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          {/* Company Filter */}
          <select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)}>
            <option value="All">All Companies</option>
            {Array.from(new Set(applications.map(a => a.jobId?.companyName).filter(Boolean))).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading applications...</p>}
      {error && <p className="error-text">{error}</p>}

      {/* Applications List */}
      {!loading && sortedAndFilteredApplications.length === 0 ? (
        <p className="no-applications-message">
          {searchTerm ? 'No applications match your search.' : 'No applications found.'}
        </p>
      ) : (
        <div className="application-cards-grid">
          {sortedAndFilteredApplications.map((app) => (
            <div key={app._id} className={`application-card status-${app.status}`}>
              <div className="card-header">
                <div className="student-info">
                  <strong>Student:</strong> {app.studentId?.name}<br />
                  <strong>Roll No:</strong> {app.studentId?.rollnumber || "N/A"}<br />
                  <strong>Dept:</strong> {app.studentId?.department}
                </div>
                <select
                  className={`status-selector status-selector-${app.status}`}
                  value={app.status}
                  onChange={(e) => handleStatusChange(app._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
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

              {app.rounds?.length > 0 && (
                <div className="rounds-update">
                  <h4>Update Round Status</h4>
                  {app.rounds.map((round, index) => (
                    <div key={index} className="round-status-updater">
                      <label>{round.roundName}:</label>
                      <select
                        value={round.status}
                        onChange={(e) => handleRoundStatusChange(app._id, index, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationListFaculty;
