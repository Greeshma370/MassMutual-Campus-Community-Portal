import React, { useEffect, useState, useMemo } from 'react';
import './analysis.css';
import { getApplications } from '../../services/applicationsAPI';

// Chart.js imports
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Analysis() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [companyFilter, setCompanyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getApplications();
        const data = res?.data ?? res;
        const arr = Array.isArray(data) ? data : (data.data || data.applications || []);
        if (mounted) setApplications(arr);
      } catch (err) {
        console.error('Failed to load applications for analysis', err);
        if (mounted) setError(err?.message || 'Failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetch();
    return () => { mounted = false; };
  }, []);

  // Filter options
  const deptOptions = useMemo(
    () => Array.from(new Set(applications.map(a => a.studentId?.department).filter(Boolean))).sort(),
    [applications]
  );
  const yearOptions = useMemo(
    () => Array.from(new Set(applications.map(a => a.studentId?.yearSem).filter(Boolean))).sort(),
    [applications]
  );
  const companyOptions = useMemo(
    () => Array.from(new Set(applications.map(a => a.jobId?.companyName).filter(Boolean))).sort(),
    [applications]
  );
  const statusOptions = useMemo(
    () => Array.from(new Set(applications.map(a => a.status).filter(Boolean))).sort(),
    [applications]
  );
  const roleOptions = useMemo(
    () => Array.from(new Set(applications.map(a => a.jobId?.title).filter(Boolean))).sort(),
    [applications]
  );

  // Filtered applications
  const filteredApps = useMemo(() => {
    const term = search.toLowerCase();
    return applications.filter(app => {
      if (deptFilter !== 'All' && (app.studentId?.department || '') !== deptFilter) return false;
      if (yearFilter !== 'All' && (app.studentId?.yearSem || '') !== yearFilter) return false;
      if (companyFilter !== 'All' && (app.jobId?.companyName || '') !== companyFilter) return false;
      if (statusFilter !== 'All' && (app.status || '') !== statusFilter) return false;
      if (roleFilter !== 'All' && (app.jobId?.title || '') !== roleFilter) return false;
      if (search) {
        const s = (app.studentId?.name || '') + ' ' +
          (app.studentId?.department || '') + ' ' +
          (app.jobId?.companyName || '') + ' ' +
          (app.jobId?.title || '');
        if (!s.toLowerCase().includes(term)) return false;
      }
      return true;
    });
  }, [applications, deptFilter, yearFilter, companyFilter, statusFilter, roleFilter, search]);

  // Aggregated data (dept, company, role)
  const aggregatedData = useMemo(() => {
    const agg = {};
    filteredApps.forEach(app => {
      const dept = app.studentId?.department || 'Unknown';
      const comp = app.jobId?.companyName || 'Unknown';
      const role = app.jobId?.title || 'Unknown';
      const status = app.status || 'pending';
      const key = `${dept}|${comp}|${role}`;

      if (!agg[key]) {
        agg[key] = { dept, comp, role, accepted: 0, rejected: 0, pending: 0 };
      }
      if (status === 'accepted') agg[key].accepted++;
      else if (status === 'rejected') agg[key].rejected++;
      else agg[key].pending++;
    });

    return Object.values(agg).filter(item => {
      if (deptFilter !== 'All' && item.dept !== deptFilter) return false;
      if (companyFilter !== 'All' && item.comp !== companyFilter) return false;
      if (roleFilter !== 'All' && item.role !== roleFilter) return false;
      return true;
    });
  }, [filteredApps, deptFilter, companyFilter, roleFilter]);

  // Totals (for charts/cards)
  const totals = useMemo(() => {
    const byDept = {};
    const byYear = {};
    const byCompany = {};
    const byStatus = {};

    filteredApps.forEach(app => {
      const dept = app.studentId?.department || 'Unknown';
      const year = app.studentId?.yearSem || 'Unknown';
      const comp = app.jobId?.companyName || 'Unknown';
      const status = app.status || 'pending';

      byDept[dept] = (byDept[dept] || 0) + 1;
      byYear[year] = (byYear[year] || 0) + 1;
      byCompany[comp] = (byCompany[comp] || 0) + 1;
      byStatus[status] = (byStatus[status] || 0) + 1;
    });

    return { byDept, byYear, byCompany, byStatus, total: filteredApps.length };
  }, [filteredApps]);

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const pageCount = Math.max(1, Math.ceil(filteredApps.length / pageSize));
  useEffect(() => { if (page > pageCount) setPage(1); }, [pageCount]);
  const paged = filteredApps.slice((page - 1) * pageSize, page * pageSize);

  // Chart colors
  const statusColors = {
    accepted: "#32ba7c",
    rejected: "#ff4c51",
    pending: "#f7ca43",
  };
  const makeBarData = (obj) => ({
    labels: Object.keys(obj),
    datasets: [{
      label: 'Applications',
      data: Object.values(obj),
      backgroundColor: Object.keys(obj).map(
        (k, i) => statusColors[k.toLowerCase()] || `hsl(${(i * 38) % 360} 84% 71%)`
      ),
    }]
  });
  const statusPieData = useMemo(() => {
    const labels = Object.keys(totals.byStatus || {});
    const data = Object.values(totals.byStatus || {});
    return {
      labels,
      datasets: [{
        data,
        backgroundColor: labels.map(l => statusColors[l.toLowerCase()] || "#b3c6f7"),
      }]
    };
  }, [totals]);

  // Reset filters
  const resetFilters = () => {
    setDeptFilter('All');
    setYearFilter('All');
    setCompanyFilter('All');
    setStatusFilter('All');
    setRoleFilter('All');
    setSearch('');
  };

  return (
    <div className="analysis-root">
      <h2 >Applications Analysis</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          <div className="analysis-controls">
            <div className="filter-row">
              <input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search applications"
              />
              <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} aria-label="Filter by Department">
                <option value="All">All Departments</option>
                {deptOptions.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} aria-label="Filter by Year">
                <option value="All">All Years</option>
                {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)} aria-label="Filter by Company">
                <option value="All">All Companies</option>
                {companyOptions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} aria-label="Filter by Role">
                <option value="All">All Roles</option>
                {roleOptions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by Status">
                <option value="All">All Statuses</option>
                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <button onClick={resetFilters}>Reset</button>
            </div>

            <div className="summary-cards">
              <div className="card">
                <h3>Total Applications</h3>
                <p>{totals.total}</p>
              </div>
              {['accepted', 'rejected', 'pending'].map(status => (
                <div className="card" key={status}>
                  <h3>{status.charAt(0).toUpperCase() + status.slice(1)}</h3>
                  <p>
                    {totals.byStatus?.[status] || 0} (
                    {totals.total ? ((totals.byStatus?.[status] || 0) / totals.total * 100).toFixed(1) : 0}%
                    )
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Aggregated Table */}
          <div className="agg-table-container">
            <h3>Applications Summary by Department, Company, and Role</h3>
            <table className="agg-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Accepted</th>
                  <th>Rejected</th>
                  <th>Pending</th>
                </tr>
              </thead>
              <tbody>
                {aggregatedData.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.dept}</td>
                    <td>{item.comp}</td>
                    <td>{item.role}</td>
                    <td style={{ color: '#32ba7c', fontWeight: 600 }}>{item.accepted}</td>
                    <td style={{ color: '#ff4c51', fontWeight: 600 }}>{item.rejected}</td>
                    <td style={{ color: '#f7ca43', fontWeight: 600 }}>{item.pending}</td>
                  </tr>
                ))}
                {aggregatedData.length === 0 && (
                  <tr><td colSpan="6" style={{ textAlign: 'center', color: '#aaa' }}>No data found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table of filtered applications */}
          <div className="table-container">
            <h3>Detailed Applications</h3>
            <table className="apps-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Dept</th>
                  <th>Year</th>
                  <th>Company</th>
                  <th>Job Title</th>
                  <th>Status</th>
                  <th>Applied</th>
                </tr>
              </thead>
              <tbody>
                {paged.map(app => (
                  <tr key={app._id}>
                    <td>{app.studentId?.name || 'Unknown'}</td>
                    <td>{app.studentId?.department || 'Unknown'}</td>
                    <td>{app.studentId?.yearSem || 'Unknown'}</td>
                    <td>{app.jobId?.companyName || 'Unknown'}</td>
                    <td>{app.jobId?.title || 'Unknown'}</td>
                    <td>{app.status || 'pending'}</td>
                    <td>{app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
              <span>Page {page} / {pageCount}</span>
              <button disabled={page >= pageCount} onClick={() => setPage(p => Math.min(pageCount, p + 1))}>Next</button>
            </div>
          </div>

          {/* Charts */}
          <div className="charts-grid">
            <div className="chart-card">
              <h4>Status Distribution</h4>
              {Pie ? <Pie data={statusPieData} /> : (
                <pre>{JSON.stringify(totals.byStatus, null, 2)}</pre>
              )}
            </div>

            <div className="chart-card">
              <h4>Applications by Department</h4>
              {Bar ? <Bar data={makeBarData(totals.byDept)} /> : (
                <pre>{JSON.stringify(totals.byDept, null, 2)}</pre>
              )}
            </div>

            <div className="chart-card">
              <h4>Applications by Company</h4>
              {Bar ? <Bar data={makeBarData(totals.byCompany)} /> : (
                <pre>{JSON.stringify(totals.byCompany, null, 2)}</pre>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
