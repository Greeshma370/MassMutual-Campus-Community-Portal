import React, { useState, useEffect } from 'react';
import { getAllJobs } from '../../services/jobsAPI';
import './jobsList.css';

const JobList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllJobs();
        const jobsArray = Array.isArray(data) ? data : (data.data || data.jobs || []);
        if (mounted) setJobs(jobsArray);
      } catch (err) {
        console.warn('Jobs fetch failed. Reason:', err?.message || err);
        if (mounted) setError(err?.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchJobs();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let results = jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.eligibility?.requiredSkills || []).some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    results = results.filter(job => job.isActive);

    if (sortBy === 'companyName') {
      results.sort((a, b) => a.companyName.localeCompare(b.companyName));
    } else if (sortBy === 'salary') {
      results.sort((a, b) => (parseFloat(b.salaryPackage) || 0) - (parseFloat(a.salaryPackage) || 0));
    } else {
      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredJobs(results);
  }, [searchTerm, sortBy, jobs]);

  return (
    <div className="job-list-container">
      <h2 className="job-list-title">Available Job Openings</h2>

      <div className="job-controls">
        <input
          type="text"
          placeholder="Search jobs..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="sort-by-container">
          <label htmlFor="sort-select" className="sort-label">Sort By:</label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="companyName">Company Name</option>
            <option value="salary">Salary (High to Low)</option>
          </select>
        </div>
      </div>

      {loading && <p className="loading-text">Loading jobs...</p>}
      {error && <p className="error-text">Error loading jobs: {error}</p>}
      {filteredJobs.length === 0 && !loading && <p className="no-jobs-message">No jobs match your criteria.</p>}

      <div className="job-cards-grid">
        {filteredJobs.map((job) => (
          <div key={job._id} className="job-card">
            {/* Company Logo + Active Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
               
              {job.isActive ? (
                <span style={{
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>Active</span>
              ) : (
                <span style={{
                  backgroundColor: '#f44336',
                  color: '#fff',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>Inactive</span>
              )}
            </div>

            <h3 className="job-card-title">{job.title}</h3>
            <p className="job-card-company">{job.companyName}</p>

            <p className="job-card-location"><span className="icon">📍</span> {job.location || 'N/A'}</p>
            <p className="job-card-salary"><span className="icon">💰</span> {job.salaryPackage || 'Negotiable'}</p>
            <p className="job-card-deadline"><span className="icon">📅</span> Apply by: {new Date(job.last_date_to_apply).toLocaleDateString()}</p>

            <div className="job-card-eligibility">
              <strong>Eligibility:</strong>
              <ul>
                {job.eligibility?.minCGPA > 0 && <li>Min CGPA: {job.eligibility.minCGPA}</li>}
                {job.eligibility?.requiredBranches?.length > 0 && <li>Branches: {job.eligibility.requiredBranches.join(', ')}</li>}
                {job.eligibility?.maxBacklogs > 0 && <li>Max Backlogs: {job.eligibility.maxBacklogs}</li>}
                {job.eligibility?.requiredSkills?.length > 0 && <li>Skills: {job.eligibility.requiredSkills.join(', ')}</li>}
                {job.eligibility?.yearSem?.length > 0 && <li>Year/Sem: {job.eligibility.yearSem.join(', ')}</li>}
              </ul>
            </div>

            <p className="job-card-description">{(job.description || '').substring(0, 120)}...</p>

            
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
