import { Bookmark, FileText, Send, UserCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import http from '../api/http.js';
import DashboardLayout from '../components/DashboardLayout.jsx';
import JobCard from '../components/JobCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const tabs = [
  { id: 'overview', label: 'Overview' }, { id: 'profile', label: 'My profile' }, { id: 'applications', label: 'Applications' }, { id: 'saved', label: 'Saved jobs' }
];

export default function CandidateDashboard() {
  const { user, profile: initialProfile, reload } = useAuth();
  const [active, setActive] = useState('overview');
  const [profile, setProfile] = useState(initialProfile || {});
  const [applications, setApplications] = useState([]);
  const [saved, setSaved] = useState([]);

  const load = async () => {
    const [a, s] = await Promise.all([http.get('/applications/mine'), http.get('/jobs/candidate/saved')]);
    setApplications(a.data.applications); setSaved(s.data.jobs);
  };
  useEffect(() => { load().catch(() => toast.error('Could not load dashboard data')); }, []);
  useEffect(() => { setProfile(initialProfile || {}); }, [initialProfile]);

  const saveProfile = async () => {
    try {
      await http.put('/profiles/candidate', { ...profile, skills: typeof profile.skills === 'string' ? profile.skills.split(',').map((s) => s.trim()).filter(Boolean) : profile.skills });
      await reload(); toast.success('Profile updated');
    } catch (error) { toast.error(error.response?.data?.message || 'Profile update failed'); }
  };

  const uploadResume = async (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf' || file.size > 2 * 1024 * 1024) return toast.error('Choose a PDF under 2 MB');
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = String(reader.result).split(',')[1];
      try { await http.post('/profiles/candidate/resume', { fileName: file.name, mimeType: file.type, base64 }); await reload(); toast.success('Resume uploaded'); }
      catch (error) { toast.error(error.response?.data?.message || 'Upload failed'); }
    };
    reader.readAsDataURL(file);
  };

  const withdraw = async (id) => { try { await http.patch(`/applications/${id}/withdraw`); toast.success('Application withdrawn'); load(); } catch (error) { toast.error(error.response?.data?.message || 'Could not withdraw'); } };
  const unsave = async (id) => { await http.delete(`/jobs/${id}/save`); toast.success('Removed from saved jobs'); load(); };

  return (
    <DashboardLayout title={`Welcome, ${user.name}`} subtitle="Manage your profile, applications, and saved opportunities." tabs={tabs} active={active} onChange={setActive}>
      {active === 'overview' && <div><div className="stat-grid"><div className="stat-card"><Send /><strong>{applications.length}</strong><span>Total applications</span></div><div className="stat-card"><Bookmark /><strong>{saved.length}</strong><span>Saved jobs</span></div><div className="stat-card"><FileText /><strong>{initialProfile?.resume?.fileName ? 'Yes' : 'No'}</strong><span>Resume uploaded</span></div></div><div className="panel"><h2>Recent applications</h2>{applications.slice(0,5).map((a) => <div className="list-row" key={a._id}><div><strong>{a.job?.title || 'Removed job'}</strong><small>{a.job?.companyName}</small></div><span className={`status-badge ${a.status}`}>{a.status}</span></div>)}</div></div>}
      {active === 'profile' && <div className="panel"><div className="panel-title"><div><h2>Candidate profile</h2><p>Complete details improve recruiter confidence.</p></div><UserCircle size={30} /></div><div className="form-grid"><label>Headline<input value={profile.headline || ''} onChange={(e) => setProfile({ ...profile, headline: e.target.value })} /></label><label>Location<input value={profile.location || ''} onChange={(e) => setProfile({ ...profile, location: e.target.value })} /></label><label>Phone<input value={profile.phone || ''} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} /></label><label>Skills (comma separated)<input value={Array.isArray(profile.skills) ? profile.skills.join(', ') : profile.skills || ''} onChange={(e) => setProfile({ ...profile, skills: e.target.value })} /></label><label className="full-span">Professional summary<textarea rows="6" value={profile.bio || ''} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} /></label></div><div className="resume-row"><label className="file-button">Upload PDF resume<input type="file" accept="application/pdf" onChange={(e) => uploadResume(e.target.files[0])} /></label><span>{initialProfile?.resume?.fileName || 'No resume uploaded'}</span></div><button className="button" onClick={saveProfile}>Save profile</button></div>}
      {active === 'applications' && <div className="panel"><h2>My applications</h2>{applications.length ? <div className="table-wrap"><table><thead><tr><th>Job</th><th>Company</th><th>Applied</th><th>Status</th><th /></tr></thead><tbody>{applications.map((a) => <tr key={a._id}><td>{a.job?.title || 'Removed job'}</td><td>{a.job?.companyName || '—'}</td><td>{new Date(a.createdAt).toLocaleDateString()}</td><td><span className={`status-badge ${a.status}`}>{a.status}</span></td><td>{!['withdrawn','hired','rejected'].includes(a.status) && <button className="text-button danger" onClick={() => withdraw(a._id)}>Withdraw</button>}</td></tr>)}</tbody></table></div> : <div className="empty-state"><Send /><h3>No applications yet</h3></div>}</div>}
      {active === 'saved' && <div>{saved.length ? <div className="jobs-grid">{saved.map((job) => <div key={job._id}><JobCard job={job} /><button className="text-button danger" onClick={() => unsave(job._id)}>Remove saved job</button></div>)}</div> : <div className="empty-state"><Bookmark /><h3>No saved jobs</h3></div>}</div>}
    </DashboardLayout>
  );
}
