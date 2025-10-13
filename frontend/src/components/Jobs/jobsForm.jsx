import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from '../../services/jobsAPI';
import "./jobsForm.css";
import { useAuth } from "../../context/AuthContext";

const initialForm = {
  companyName: "",
  title: "",
  description: "",
  location: "",
  salaryPackage: "",
  minCGPA: "",
  requiredBranches: "",
  maxBacklogs: "",
  requiredSkills: "",
  yearSem: "",
  rounds: "",
  last_date_to_apply: "",
  isActive: true,
};

export default function JobForm() {
  const navigate = useNavigate();
  const Auth = useAuth();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const validateForm = () => {
    if (!form.companyName.trim() || !form.title.trim() || !form.description.trim() || !form.last_date_to_apply) {
      return "Company Name, Job Title, Description, and Last Date are required.";
    }
    if (form.minCGPA && (isNaN(parseFloat(form.minCGPA)) || parseFloat(form.minCGPA) < 0 || parseFloat(form.minCGPA) > 10)) {
      return "Min CGPA must be a number between 0 and 10.";
    }
    if (form.maxBacklogs && (isNaN(parseInt(form.maxBacklogs, 10)) || parseInt(form.maxBacklogs, 10) < 0)) {
      return "Max Backlogs must be a positive integer.";
    }
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = {
      companyName: form.companyName.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      location: form.location.trim() || undefined,
      salaryPackage: form.salaryPackage.trim() || undefined,
      eligibility: {
        minCGPA: form.minCGPA ? parseFloat(form.minCGPA) : undefined,
        requiredBranches: form.requiredBranches
          ? form.requiredBranches.split(",").map(s => s.trim()).filter(Boolean)
          : [],
        maxBacklogs: form.maxBacklogs ? parseInt(form.maxBacklogs, 10) : undefined,
        requiredSkills: form.requiredSkills
          ? form.requiredSkills.split(",").map(s => s.trim()).filter(Boolean)
          : [],
        yearSem: form.yearSem
          ? form.yearSem.split(",").map(s => s.trim()).filter(Boolean)
          : [],
      },
      rounds: form.rounds ? form.rounds.split(",").map(s => s.trim()).filter(Boolean) : [],
      last_date_to_apply: form.last_date_to_apply,
      isActive: !!form.isActive,
    };

    setLoading(true);
    try {
      await createJob(payload);
      setSuccess("Job posted successfully.");

      // Auto-dismiss success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);

      if (Auth?.role === 'faculty') navigate("/dashboard/faculty");
      else navigate("/dashboard/management");
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to post job.';
      setError(msg);
      // Auto-dismiss error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setError(null);
    setSuccess(null);
  };

  return (
    <form className="job-form" onSubmit={submit}>
      <button type="button" className="btn outline close-btn" onClick={()=>navigate("/faculty/jobs")}> 
        X
      </button>
      <h3>Create Job Posting</h3>
      {error && <div className="jf-error">{error}</div>}
      {success && <div className="jf-success">{success}</div>}

      <label>
        Company Name *
        <input name="companyName" value={form.companyName} onChange={handleChange} />
      </label>

      <label>
        Job Title *
        <input name="title" value={form.title} onChange={handleChange} />
      </label>

      <label>
        Description *
        <textarea name="description" value={form.description} onChange={handleChange} rows={6} />
      </label>

      <label>
        Location
        <input name="location" value={form.location} onChange={handleChange} />
      </label>

      <label>
        Salary Package
        <input name="salaryPackage" value={form.salaryPackage} onChange={handleChange} />
      </label>

      <div className="jf-grid">
        <label>
          Min CGPA
          <input name="minCGPA" value={form.minCGPA} onChange={handleChange} type="number" step="0.01" min="0" max="10" />
        </label>

        <label>
          Max Backlogs
          <input name="maxBacklogs" value={form.maxBacklogs} onChange={handleChange} type="number" min="0" />
        </label>
      </div>

      <label>
        Required Branches (comma separated)
        <input name="requiredBranches" value={form.requiredBranches} onChange={handleChange} placeholder="CSE, IT, ECE" />
      </label>

      <label>
        Required Skills (comma separated)
        <input name="requiredSkills" value={form.requiredSkills} onChange={handleChange} placeholder="React, Node.js" />
      </label>

      <label>
        Eligible Year/Sem (comma separated)
        <input name="yearSem" value={form.yearSem} onChange={handleChange} placeholder="3rd Year, 4th Year" />
      </label>

      <label>
        Rounds (comma separated)
        <input name="rounds" value={form.rounds} onChange={handleChange} placeholder="Aptitude, Technical, HR" />
      </label>

      <label>
        Last Date to Apply *
        <input name="last_date_to_apply" value={form.last_date_to_apply} onChange={handleChange} type="date" />
      </label>

      <label className="jf-checkbox">
        <input name="isActive" type="checkbox" checked={form.isActive} onChange={handleChange} />
        Active
      </label>

      <div className="jf-actions">
        <button className="btn primary" type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Job"}
        </button>
        <button type="button" className="btn outline" onClick={resetForm}>
          Reset
        </button>
      </div>
    </form>
  );
}
