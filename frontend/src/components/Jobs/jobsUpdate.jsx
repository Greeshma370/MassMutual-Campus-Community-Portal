import React, { useState, useEffect } from 'react';
import './jobsList.css'; // Import the CSS file
import { getAllJobs, deleteJob } from '../../services/jobsAPI';
import { useNavigate } from 'react-router-dom';


const JobList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]); // Use state for data
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest'); 
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [hoveredCardId, setHoveredCardId] = useState(null); // State for hover control

  // --- HANDLERS FOR ADMIN ACTIONS ---
  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;
    try {
      await deleteJob(_id);
      // remove locally on success
      setJobs(prev => prev.filter(job => job._id !== _id));
      setHoveredCardId(null);
    } catch (err) {
      console.error('Failed to delete job:', err);
      alert('Unable to delete job. Please try again.');
    }
  };
  const handlePostNewJob = () => {
    // Functionality to open the Add News form/modal will go here
    navigate("/jobs/add");
  };
  // ---------------------------------

  useEffect(() => {
    let results = jobs.filter(job =>
      (job.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.companyName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      ((job.eligibility?.requiredSkills || []).some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())))
    );

    // Filter by isActive
    results = results.filter(job => job.isActive);

    // Sort logic (unchanged)
    if (sortBy === 'companyName') {
      results.sort((a, b) => a.companyName.localeCompare(b.companyName));
    } else if (sortBy === 'salary') {
      results.sort((a, b) => {
        const salaryA = parseFloat(a.salaryPackage);
        const salaryB = parseFloat(b.salaryPackage);
        if (isNaN(salaryA) && isNaN(salaryB)) return 0;
        if (isNaN(salaryA)) return 1;
        if (isNaN(salaryB)) return -1;
        return salaryB - salaryA; 
      });
    } else { // 'latest' (default)
      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredJobs(results);
  }, [searchTerm, sortBy, jobs]); // Depend on 'jobs' state now

  // Fetch all jobs from API on mount and merge/replace initial data
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchAll = async () => {
      try {
        const data = await getAllJobs();
        const jobsArray = Array.isArray(data) ? data : (data.data || data.jobs || []);
        if (mounted && jobsArray.length > 0) {
          setJobs(jobsArray);
        }
      } catch (err) {
        console.warn('Failed to load jobs from API, keeping initialJobsData. Reason:', err?.message || err);
      }
    };

    fetchAll();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="job-list-container">
      <h2 className="job-list-title">Available Job Openings</h2>
      
      {/* POST NEW JOB BUTTON */}
      <div className="post-job-btn-wrapper">
        <button 
          className="job-card-button post-job-btn"
          onClick={handlePostNewJob}
        >
          ➕ Post New Job
        </button>
      </div>

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

      {filteredJobs.length === 0 ? (
        <p className="no-jobs-message">No jobs match your criteria.</p>
      ) : (
        <div className="job-cards-grid">
          {filteredJobs.map((job) => (
            <div 
              key={job._id} 
              className="job-card"
              onMouseEnter={() => setHoveredCardId(job._id)}
              onMouseLeave={() => setHoveredCardId(null)}
            >
              <div className="job-header-actions">
                <h3 className="job-card-title">{job.title}</h3>

                {/* --- ACTIONS BUTTONS --- */}
                <div className="action-control-area">
                    <button 
                        className="dots-btn" 
                        onClick={() => setHoveredCardId(hoveredCardId === job._id ? null : job._id)}
                    >
                        •••
                    </button>
                    
          {(hoveredCardId === job._id) && (
            <div className="job-actions">
              <button className="action-btn delete-btn" onClick={() => handleDelete(job._id)}>
                Delete
              </button>
            </div>
          )}
                </div>
              </div>
              
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
                  {job.eligibility.minCGPA > 0 && <li>Min CGPA: {job.eligibility.minCGPA}</li>}
                  {job.eligibility.requiredBranches.length > 0 && (
                    <li>Branches: {job.eligibility.requiredBranches.join(', ')}</li>
                  )}
                  {job.eligibility.maxBacklogs > 0 && <li>Max Backlogs: {job.eligibility.maxBacklogs}</li>}
                  {job.eligibility.requiredSkills.length > 0 && (
                    <li>Skills: {job.eligibility.requiredSkills.join(', ')}</li>
                  )}
                  {job.eligibility.yearSem.length > 0 && (
                    <li>Year/Sem: {job.eligibility.yearSem.join(', ')}</li>
                  )}
                </ul>
              </div>
              <p className="job-card-deadline">
                <span className="icon">📅</span> Apply by: {new Date(job.last_date_to_apply).toLocaleDateString()}
              </p>
              <p className="job-card-description">{job.description.substring(0, 120)}...</p> 
              
              {/* This button is for the student to view details/apply */}
              <button className="job-card-button">View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;