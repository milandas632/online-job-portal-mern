import { Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import http from '../api/http.js';
import JobCard from '../components/JobCard.jsx';
import Loading from '../components/Loading.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Jobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ q: '', location: '', category: '', type: '' });
  const [submitted, setSubmitted] = useState(filters);

  useEffect(() => { http.get('/categories').then(({ data }) => setCategories(data.categories)); }, []);
  useEffect(() => {
    setLoading(true);
    http.get('/jobs', { params: submitted }).then(({ data }) => setJobs(data.jobs)).catch(() => toast.error('Could not load jobs')).finally(() => setLoading(false));
  }, [submitted]);

  const save = async (id) => {
    if (user?.role !== 'candidate') return toast.error('Sign in as a candidate to save jobs');
    try { await http.post(`/jobs/${id}/save`); toast.success('Job saved'); }
    catch (error) { toast.error(error.response?.data?.message || 'Could not save job'); }
  };

  return (
    <section className="section page-top jobs-page"><div className="container">
      <div className="section-heading left"><p className="eyebrow">Current opportunities</p><h1>Find a job that matches your goals</h1><p>Use the search and filters to narrow down vacancies.</p></div>
      <form className="filter-panel" onSubmit={(e) => { e.preventDefault(); setSubmitted(filters); }}>
        <div className="input-icon search-wide"><Search size={18} /><input value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} placeholder="Job title, company, or skill" /></div>
        <input value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} placeholder="Location" />
        <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}><option value="">All categories</option>{categories.map((c) => <option value={c._id} key={c._id}>{c.name}</option>)}</select>
        <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}><option value="">All types</option>{['Full-time','Part-time','Contract','Internship','Remote'].map((type) => <option key={type}>{type}</option>)}</select>
        <button className="button"><SlidersHorizontal size={18} /> Apply</button>
      </form>
      {loading ? <Loading /> : jobs.length ? <div className="jobs-grid">{jobs.map((job) => <JobCard key={job._id} job={job} onSave={save} />)}</div> : <div className="empty-state"><Search size={40} /><h3>No matching jobs</h3><p>Try removing one or more filters.</p></div>}
    </div></section>
  );
}
