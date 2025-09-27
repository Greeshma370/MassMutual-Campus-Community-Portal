import React, { useState, useEffect } from 'react';
import './jobsList.css'; // Import the CSS file

const dummyJobs = [
  {
    _id: '1',
    companyName: 'Tech Innovators Inc.',
    title: 'Software Engineer Intern',
    description: 'Join our dynamic team and contribute to cutting-edge software development projects. Gain hands-on experience with modern tech stacks.',
    location: 'Bangalore',
    salaryPackage: '5 LPA',
    eligibility: {
      minCGPA: 7.0,
      requiredBranches: ['CSE', 'IT'],
      maxBacklogs: 0,
      requiredSkills: ['React', 'Node.js', 'MongoDB'],
      yearSem: ['3rd Year, 6th Sem'],
    },
    last_date_to_apply: '2023-11-30T00:00:00.000Z',
    postedBy: '652a2d4b6c9d0a0b1c2d3e4f', // Dummy Faculty ID
    isActive: true,
    createdAt: '2023-10-15T10:00:00.000Z',
  },
  {
    _id: '2',
    companyName: 'Global Solutions Ltd.',
    title: 'Data Analyst Trainee',
    description: 'Work with large datasets, create reports, and help us make data-driven decisions. Opportunity to learn various analytical tools.',
    location: 'Pune',
    salaryPackage: '4.5 LPA',
    eligibility: {
      minCGPA: 6.5,
      requiredBranches: ['CSE', 'IT', 'ECE'],
      maxBacklogs: 1,
      requiredSkills: ['Python', 'SQL', 'Excel'],
      yearSem: ['4th Year, 7th Sem'],
    },
    last_date_to_apply: '2023-12-15T00:00:00.000Z',
    postedBy: '652a2d4b6c9d0a0b1c2d3e4f',
    isActive: true,
    createdAt: '2023-10-20T11:30:00.000Z',
  },
  {
    _id: '3',
    companyName: 'Creative Minds Agency',
    title: 'UI/UX Designer Intern',
    description: 'Design intuitive and engaging user interfaces for our web and mobile applications. Collaborate with product and development teams.',
    location: 'Remote',
    salaryPackage: 'Negotiable',
    eligibility: {
      minCGPA: 6.0,
      requiredBranches: ['Any'],
      maxBacklogs: 0,
      requiredSkills: ['Figma', 'Adobe XD', 'Prototyping'],
      yearSem: ['3rd Year, 5th Sem', '4th Year, 7th Sem'],
    },
    last_date_to_apply: '2023-11-25T00:00:00.000Z',
    postedBy: '652a2d4b6c9d0a0b1c2d3e4f',
    isActive: true,
    createdAt: '2023-10-18T09:00:00.000Z',
  },
  {
    _id: '4',
    companyName: 'Fintech Innovations',
    title: 'Backend Developer',
    description: 'Develop and maintain robust backend services for our financial applications. Strong focus on scalability and security.',
    location: 'Hyderabad',
    salaryPackage: '8 LPA',
    eligibility: {
      minCGPA: 7.5,
      requiredBranches: ['CSE', 'IT'],
      maxBacklogs: 0,
      requiredSkills: ['Java', 'Spring Boot', 'REST APIs'],
      yearSem: ['4th Year, 8th Sem'],
    },
    last_date_to_apply: '2023-12-05T00:00:00.000Z',
    postedBy: '652a2d4b6c9d0a0b1c2d3e4f',
    isActive: true,
    createdAt: '2023-10-22T14:00:00.000Z',
  },
  {
    _id: '5',
    companyName: 'HealthTech Solutions',
    title: 'Mobile App Developer (Android)',
    description: 'Build high-performance Android applications for the healthcare sector. Work with a passionate team of developers.',
    location: 'Bangalore',
    salaryPackage: '6 LPA',
    eligibility: {
      minCGPA: 6.8,
      requiredBranches: ['CSE', 'ECE'],
      maxBacklogs: 0,
      requiredSkills: ['Kotlin', 'Android SDK', 'Firebase'],
      yearSem: ['3rd Year, 6th Sem', '4th Year, 7th Sem'],
    },
    last_date_to_apply: '2023-12-01T00:00:00.000Z',
    postedBy: '652a2d4b6c9d0a0b1c2d3e4f',
    isActive: true,
    createdAt: '2023-10-16T16:00:00.000Z',
  },
];

const JobList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // 'latest', 'companyName', 'salary'
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    let results = dummyJobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.eligibility.requiredSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Filter by isActive
    results = results.filter(job => job.isActive);

    // Sort logic
    if (sortBy === 'companyName') {
      results.sort((a, b) => a.companyName.localeCompare(b.companyName));
    } else if (sortBy === 'salary') {
      // Basic salary parsing for sorting, assuming "X LPA" format
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
  }, [searchTerm, sortBy]);

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
              <p className="job-card-description">{job.description.substring(0, 120)}...</p> {/* Truncate description */}
              <button className="job-card-button">View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;