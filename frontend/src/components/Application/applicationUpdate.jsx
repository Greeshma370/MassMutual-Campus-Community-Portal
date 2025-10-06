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
    // ... (rest of the function remains the same)
  };

  const handleRoundStatusChange = async (appId, roundIndex, newStatus) => {
    // ... (rest of the function remains the same)
  };

  const fetchApps = async () => {
    // ... (rest of the function remains the same)
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
              {/* ... (rest of the card JSX remains the same) ... */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationListFaculty;