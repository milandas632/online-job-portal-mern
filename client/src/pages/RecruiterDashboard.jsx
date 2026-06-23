import { BriefcaseBusiness, PlusCircle, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import http from '../api/http.js';
import DashboardLayout from '../components/DashboardLayout.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const tabs = [{ id: 'overview', label: 'Overview' }, { id: 'profile', label: 'Company profile' }, { id: 'jobs', label: 'Manage jobs' }, { id: 'applications', label: 'Applicants' }];
const emptyJob = { title: '', description: '', location: '', category: '', employmentType: 'Full-time', experienceLevel: 'Entry', salaryMin: 0, salaryMax: 0, skills: '', deadline: '' };

export default function RecruiterDashboard() {
  const { user, profile: initialProfile, reload } = useAuth();
  const [active, setActive] = useState('overview');
  const [profile, setProfile] = useState(initialProfile || {});
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [categories, setCategories] = useState([]);
  const [jobForm, setJobForm] = useState(emptyJob);
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const [j, a, c] = await Promise.all([http.get('/jobs/recruiter/mine'), http.get('/applications/recruiter'), http.get('/categories')]);
    setJobs(j.data.jobs); setApplications(a.data.applications); setCategories(c.data.categories);
  };
  useEffect(() => { load().catch(() => toast.error('Could not load recruiter dashboard')); }, []);
  useEffect(() => { setProfile(initialProfile || {}); }, [initialProfile]);

  const saveProfile = async () => { try { await http.put('/profiles/recruiter', profile); await reload(); toast.success('Company profile updated'); } catch (e) { toast.error(e.response?.data?.message || 'Update failed'); } };
  const submitJob = async (event) => {
    event.preventDefault();
    const payload = { ...jobForm, salaryMin: Number(jobForm.salaryMin), salaryMax: Number(jobForm.salaryMax), skills: String(jobForm.skills).split(',').map((s) => s.trim()).filter(Boolean) };
    try {
      if (editingId) await http.put(`/jobs/${editingId}`, payload); else await http.post('/jobs', payload);
      toast.success(editingId ? 'Job updated' : 'Job posted'); setJobForm(emptyJob); setEditingId(null); load();
    } catch (e) { toast.error(e.response?.data?.message || 'Could not save job'); }
  };
  const editJob = (job) => { setEditingId(job._id); setJobForm({ ...job, category: job.category?._id || job.category, skills: job.skills?.join(', ') || '', deadline: job.deadline?.slice(0,10) }); setActive('jobs'); };
  const toggleJob = async (job) => { await http.patch(`/jobs/${job._id}/status`, { status: job.status === 'open' ? 'closed' : 'open' }); toast.success('Job status updated'); load(); };
  const removeJob = async (id) => { if (!confirm('Delete this job and its applications?')) return; await http.delete(`/jobs/${id}`); toast.success('Job deleted'); load(); };
  const setStatus = async (id, status) => { try { await http.patch(`/applications/${id}/status`, { status }); toast.success('Application status updated'); load(); } catch (e) { toast.error(e.response?.data?.message || 'Update failed'); } };

  return (
    <DashboardLayout title={`Recruiter workspace`} subtitle={`${initialProfile?.companyName || user.name} — publish vacancies and manage applicants.`} tabs={tabs} active={active} onChange={setActive}>
      {active === 'overview' && <div><div className="stat-grid"><div className="stat-card"><BriefcaseBusiness /><strong>{jobs.length}</strong><span>Jobs posted</span></div><div className="stat-card"><Users /><strong>{applications.length}</strong><span>Total applications</span></div><div className="stat-card"><PlusCircle /><strong>{jobs.filter((j) => j.status === 'open').length}</strong><span>Open jobs</span></div></div><div className="panel"><h2>Your latest jobs</h2>{jobs.slice(0,5).map((job) => <div className="list-row" key={job._id}><div><strong>{job.title}</strong><small>{job.location} · {job.applicationCount} applications</small></div><span className={`status-badge ${job.status}`}>{job.status}</span></div>)}</div></div>}
      {active === 'profile' && <div className="panel"><h2>Company profile</h2><div className="form-grid"><label>Company name<input value={profile.companyName || ''} onChange={(e) => setProfile({ ...profile, companyName: e.target.value })} /></label><label>Website<input value={profile.website || ''} onChange={(e) => setProfile({ ...profile, website: e.target.value })} /></label><label>Location<input value={profile.location || ''} onChange={(e) => setProfile({ ...profile, location: e.target.value })} /></label><label className="full-span">Description<textarea rows="6" value={profile.description || ''} onChange={(e) => setProfile({ ...profile, description: e.target.value })} /></label></div><button className="button" onClick={saveProfile}>Save profile</button></div>}
      {active === 'jobs' && <div><div className="panel"><h2>{editingId ? 'Edit vacancy' : 'Post a new vacancy'}</h2><form className="form-grid" onSubmit={submitJob}><label>Job title<input required value={jobForm.title} onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })} /></label><label>Location<input required value={jobForm.location} onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })} /></label><label>Category<select required value={jobForm.category} onChange={(e) => setJobForm({ ...jobForm, category: e.target.value })}><option value="">Select</option>{categories.map((c) => <option value={c._id} key={c._id}>{c.name}</option>)}</select></label><label>Employment type<select value={jobForm.employmentType} onChange={(e) => setJobForm({ ...jobForm, employmentType: e.target.value })}>{['Full-time','Part-time','Contract','Internship','Remote'].map((x) => <option key={x}>{x}</option>)}</select></label><label>Experience level<select value={jobForm.experienceLevel} onChange={(e) => setJobForm({ ...jobForm, experienceLevel: e.target.value })}>{['Entry','Mid','Senior','Lead'].map((x) => <option key={x}>{x}</option>)}</select></label><label>Application deadline<input type="date" required value={jobForm.deadline} onChange={(e) => setJobForm({ ...jobForm, deadline: e.target.value })} /></label><label>Minimum salary<input type="number" min="0" value={jobForm.salaryMin} onChange={(e) => setJobForm({ ...jobForm, salaryMin: e.target.value })} /></label><label>Maximum salary<input type="number" min="0" value={jobForm.salaryMax} onChange={(e) => setJobForm({ ...jobForm, salaryMax: e.target.value })} /></label><label className="full-span">Skills (comma separated)<input value={jobForm.skills} onChange={(e) => setJobForm({ ...jobForm, skills: e.target.value })} /></label><label className="full-span">Description<textarea rows="7" required minLength="30" value={jobForm.description} onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })} /></label><div className="form-actions full-span"><button className="button">{editingId ? 'Update job' : 'Publish job'}</button>{editingId && <button type="button" className="button secondary" onClick={() => { setEditingId(null); setJobForm(emptyJob); }}>Cancel</button>}</div></form></div><div className="panel"><h2>Published jobs</h2><div className="table-wrap"><table><thead><tr><th>Title</th><th>Type</th><th>Applications</th><th>Status</th><th>Actions</th></tr></thead><tbody>{jobs.map((job) => <tr key={job._id}><td>{job.title}</td><td>{job.employmentType}</td><td>{job.applicationCount}</td><td><span className={`status-badge ${job.status}`}>{job.status}</span></td><td className="table-actions"><button onClick={() => editJob(job)}>Edit</button><button onClick={() => toggleJob(job)}>{job.status === 'open' ? 'Close' : 'Open'}</button><button className="danger" onClick={() => removeJob(job._id)}>Delete</button></td></tr>)}</tbody></table></div></div></div>}
      {active === 'applications' && <div className="panel"><h2>Candidate applications</h2>{applications.length ? <div className="table-wrap"><table><thead><tr><th>Candidate</th><th>Job</th><th>Status</th><th>Resume</th><th>Update</th></tr></thead><tbody>{applications.map((a) => <tr key={a._id}><td><strong>{a.candidate?.name}</strong><small>{a.candidate?.email}</small></td><td>{a.job?.title}</td><td><span className={`status-badge ${a.status}`}>{a.status}</span></td><td><a className="text-link" href={`/api/profiles/candidate/${a.candidate?._id}/resume`} target="_blank" rel="noreferrer">View PDF</a></td><td><select value={a.status} disabled={a.status === 'withdrawn'} onChange={(e) => setStatus(a._id, e.target.value)}><option value="applied" disabled>Applied</option>{['reviewing','shortlisted','rejected','hired'].map((s) => <option key={s}>{s}</option>)}{a.status === 'withdrawn' && <option>withdrawn</option>}</select></td></tr>)}</tbody></table></div> : <div className="empty-state"><Users /><h3>No applications received</h3></div>}</div>}
    </DashboardLayout>
  );
}
