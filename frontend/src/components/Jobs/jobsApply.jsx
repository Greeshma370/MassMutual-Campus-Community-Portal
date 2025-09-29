import React, { useState, useEffect } from 'react';
import { getJobs } from '../../services/jobsAPI'; // Import the getJobs function
import './jobsList.css'; // Import the CSS file

const JobList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // 'latest', 'companyName', 'salary'
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getJobs(); // Use the getJobs function
        const jobsArray = Array.isArray(data) ? data : (data.data || data.jobs || []);
        setJobs(jobsArray);
      } catch (err) {
        console.warn('Jobs fetch failed, using dummy data. Reason:', err.message);
        setError(err.message);
        setJobs(dummyJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    let results = jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.eligibility?.requiredSkills || []).some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Filter by isActive
    results = results.filter(job => job.isActive);

    // Sort logic
    if (sortBy === 'companyName') {
      results.sort((a, b) => a.companyName.localeCompare(b.companyName));
    } else if (sortBy === 'salary') {
      results.sort((a, b) => {
        const salaryA = parseFloat(a.salaryPackage);
        const salaryB = parseFloat(b.salaryPackage);
        if (isNaN(salaryA) && isNaN(salaryB)) return 0;
        if (isNaN(salaryA)) return 1;
        if (isNaN(salaryB)) return -1;
        return salaryB - salaryA; // Descending for higher salary
      });
    } else { // 'latest' (default)
      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredJobs(results);
  }, [searchTerm, sortBy, jobs]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="job-list-container">
      <h2 className="job-list-title">Available Job Openings</h2>

      <div className="job-controls">
        <input
          type="text"
          placeholder="Search jobs..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="sort-by-container">
          <label htmlFor="sort-select" className="sort-label">Sort By:</label>
          <select id="sort-select" className="sort-select" value={sortBy} onChange={handleSortChange}>
            <option value="latest">Latest</option>
            <option value="companyName">Company Name</option>
            <option value="salary">Salary (High to Low)</option>
          </select>
        </div>
      </div>

      {loading && <p>Loading jobs...</p>}
      {error && <p className="error-text">Error loading jobs ({error}). Showing local sample data.</p>}

      {filteredJobs.length === 0 ? (
        <p className="no-jobs-message">No jobs match your criteria.</p>
      ) : (
        <div className="job-cards-grid">
          {filteredJobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3 className="job-card-title">{job.title}</h3>
              <p className="job-card-company">{job.companyName}</p>
              <p className="job-card-location">
                <span className="icon">📍</span> {job.location || 'N/A'}
              </p>
              <p className="job-card-salary">
                <span className="icon">💰</span> {job.salaryPackage || 'Negotiable'}
              </p>
              <div className="job-card-eligibility">
                <strong>Eligibility:</strong>
                <ul>
                  {job.eligibility?.minCGPA > 0 && <li>Min CGPA: {job.eligibility.minCGPA}</li>}
                  {job.eligibility?.requiredBranches?.length > 0 && (
                    <li>Branches: {job.eligibility.requiredBranches.join(', ')}</li>
                  )}
                  {job.eligibility?.maxBacklogs > 0 && <li>Max Backlogs: {job.eligibility.maxBacklogs}</li>}
                  {job.eligibility?.requiredSkills?.length > 0 && (
                    <li>Skills: {job.eligibility.requiredSkills.join(', ')}</li>
                  )}
                  {job.eligibility?.yearSem?.length > 0 && (
                    <li>Year/Sem: {job.eligibility.yearSem.join(', ')}</li>
                  )}
                </ul>
              </div>
              <p className="job-card-deadline">
                <span className="icon">📅</span> Apply by: {new Date(job.last_date_to_apply).toLocaleDateString()}
              </p>
              <p className="job-card-description">{(job.description || '').substring(0, 120)}...</p>

              {/* Action Buttons */}
              <div className="job-card-actions">
                <button className="job-card-button">View Details</button>
                <button className="apply-button">Apply</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
