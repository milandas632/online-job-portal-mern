import { Bookmark, Briefcase, CalendarDays, IndianRupee, MapPin, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import http from '../api/http.js';
import Loading from '../components/Loading.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const money = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value || 0);

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [showApply, setShowApply] = useState(false);

  useEffect(() => { http.get(`/jobs/${id}`).then(({ data }) => setJob(data.job)).catch(() => toast.error('Job not found')); }, [id]);
  if (!job) return <Loading />;

  const apply = async () => {
    try { await http.post(`/applications/jobs/${job._id}`, { coverLetter }); toast.success('Application submitted'); setShowApply(false); }
    catch (error) { toast.error(error.response?.data?.message || 'Application failed'); }
  };
  const save = async () => { try { await http.post(`/jobs/${job._id}/save`); toast.success('Job saved'); } catch (error) { toast.error(error.response?.data?.message || 'Could not save'); } };

  return (
    <section className="section page-top"><div className="container narrow">
      <Link className="text-link" to="/jobs">← Back to all jobs</Link>
      <article className="job-detail-card">
        <div className="detail-heading"><div className="company-avatar large">{job.companyName?.slice(0,1)}</div><div><p className="eyebrow">{job.companyName}</p><h1>{job.title}</h1><div className="job-meta inline"><span><MapPin size={17} /> {job.location}</span><span><Briefcase size={17} /> {job.employmentType}</span><span><CalendarDays size={17} /> Apply by {new Date(job.deadline).toLocaleDateString()}</span></div></div></div>
        <div className="detail-actions">
          {user?.role === 'candidate' ? <><button className="button secondary" onClick={save}><Bookmark size={18} /> Save</button><button className="button" onClick={() => setShowApply(true)}><Send size={18} /> Apply now</button></> : !user ? <Link className="button" to="/login">Sign in to apply</Link> : null}
        </div>
        <div className="detail-grid"><div><h2>Job description</h2><p className="pre-line">{job.description}</p><h2>Required skills</h2><div className="tag-row">{job.skills?.map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div></div><aside className="job-summary"><h3>Job summary</h3><p><strong>Category</strong><span>{job.category?.name}</span></p><p><strong>Experience</strong><span>{job.experienceLevel}</span></p><p><strong>Salary</strong><span>{job.salaryMin || job.salaryMax ? `${money(job.salaryMin)} – ${money(job.salaryMax)}` : 'Not disclosed'}</span></p><p><strong>Status</strong><span className="status-badge open">{job.status}</span></p></aside></div>
      </article>
      {showApply && <div className="modal-backdrop"><div className="modal"><button className="modal-close" onClick={() => setShowApply(false)}>×</button><h2>Apply for {job.title}</h2><p>Your current profile and uploaded PDF resume will be shared with the recruiter.</p><label>Cover letter (optional)<textarea rows="8" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} placeholder="Explain why you are suitable for this role." /></label><button className="button full" onClick={apply}>Submit application</button></div></div>}
    </div></section>
  );
}
