import React, { useState, useEffect } from 'react';
import { getJobs } from '../../services/jobsAPI';
import { applyJob } from '../../services/applicationsAPI';
import './jobsList.css';

const JobList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applyingJobIds, setApplyingJobIds] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getJobs();
        const jobsArray = Array.isArray(data) ? data : (data.data || data.jobs || []);
        if (mounted) setJobs(jobsArray);
      } catch (err) {
        console.error('Jobs fetch failed', err);
        if (mounted) setError(err?.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchJobs();

    return () => {
      mounted = false;
      controller.abort();
    };
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
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className="sort-by-container">
          <label htmlFor="sort-select" className="sort-label">Sort By:</label>
          <select id="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-select">
            <option value="latest">Latest</option>
            <option value="companyName">Company Name</option>
            <option value="salary">Salary (High to Low)</option>
          </select>
        </div>
      </div>

      {loading && <p className="loading-text">Loading jobs...</p>}
      {error && <p className="error-text">Error loading jobs: {error}</p>}
      {filteredJobs.length === 0 && !loading ? (
        <p className="no-jobs-message">No jobs match your criteria.</p>
      ) : (
        <div className="job-cards-grid">
          {filteredJobs.map(job => (
            <div key={job._id} className="job-card">
              <div className="job-card-header">
                {job.companyLogo && <img src={job.companyLogo} alt={job.companyName} className="company-logo" />}
                <h3 className="job-card-title">{job.title}</h3>
                {job.type && <span className="job-type-badge">{job.type}</span>}
              </div>

              <p className="job-card-company">{job.companyName}</p>
              <p className="job-card-location">Location: {job.location || 'N/A'}</p>
              <p className="job-card-salary">Salary: {job.salaryPackage || 'Negotiable'}</p>

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

              <p className="job-card-deadline">📅 Apply by: {new Date(job.last_date_to_apply).toLocaleDateString()}</p>
              <p className="job-card-description">{(job.description || '').substring(0, 120)}...</p>

              <div className="job-card-actions">
                <button
                  className="apply-button"
                  onClick={async () => {
                    if (applyingJobIds.includes(job._id) || appliedJobIds.includes(job._id)) return;
                    setApplyingJobIds(prev => [...prev, job._id]);
                    try {
                      await applyJob({ jobId: job._id });
                      setAppliedJobIds(prev => [...prev, job._id]);
                    } catch (err) {
                      console.error('Apply failed', err);
                      alert(err?.response?.data?.message || err?.message || 'Failed to apply');
                    } finally {
                      setApplyingJobIds(prev => prev.filter(id => id !== job._id));
                    }
                  }}
                  disabled={applyingJobIds.includes(job._id) || appliedJobIds.includes(job._id)}
                >
                  {applyingJobIds.includes(job._id) ? 'Applying...' : appliedJobIds.includes(job._id) ? 'Applied' : 'Apply'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
