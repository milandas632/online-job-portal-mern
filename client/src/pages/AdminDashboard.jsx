import { BriefcaseBusiness, Tags, UserCheck, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import http from '../api/http.js';
import DashboardLayout from '../components/DashboardLayout.jsx';

const tabs = [{ id: 'overview', label: 'Overview' }, { id: 'users', label: 'Users' }, { id: 'jobs', label: 'Jobs' }, { id: 'categories', label: 'Categories' }];

export default function AdminDashboard() {
  const [active, setActive] = useState('overview');
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  const load = async () => {
    const [s, u, j, c] = await Promise.all([http.get('/admin/stats'), http.get('/admin/users'), http.get('/admin/jobs'), http.get('/categories')]);
    setStats(s.data.stats); setUsers(u.data.users); setJobs(j.data.jobs); setCategories(c.data.categories);
  };
  useEffect(() => { load().catch(() => toast.error('Could not load administrator data')); }, []);

  const userStatus = async (user) => { await http.patch(`/admin/users/${user._id}/status`, { active: !user.active }); toast.success('User status updated'); load(); };
  const removeJob = async (id) => { if (!confirm('Remove this job?')) return; await http.delete(`/admin/jobs/${id}`); toast.success('Job removed'); load(); };
  const addCategory = async () => { try { await http.post('/categories', { name: categoryName }); setCategoryName(''); toast.success('Category created'); load(); } catch (e) { toast.error(e.response?.data?.message || 'Could not create category'); } };
  const deleteCategory = async (id) => { try { await http.delete(`/categories/${id}`); toast.success('Category deleted'); load(); } catch (e) { toast.error(e.response?.data?.message || 'Could not delete category'); } };

  return (
    <DashboardLayout title="Administrator dashboard" subtitle="Monitor users, jobs, applications, and classification data." tabs={tabs} active={active} onChange={setActive}>
      {active === 'overview' && <div className="stat-grid admin-stats"><div className="stat-card"><Users /><strong>{stats.users || 0}</strong><span>Total users</span></div><div className="stat-card"><UserCheck /><strong>{stats.candidates || 0}</strong><span>Candidates</span></div><div className="stat-card"><BriefcaseBusiness /><strong>{stats.openJobs || 0}</strong><span>Open jobs</span></div><div className="stat-card"><Tags /><strong>{stats.categories || 0}</strong><span>Categories</span></div></div>}
      {active === 'users' && <div className="panel"><h2>User management</h2><div className="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th /></tr></thead><tbody>{users.map((u) => <tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td><span className={`status-badge ${u.active ? 'open' : 'closed'}`}>{u.active ? 'active' : 'inactive'}</span></td><td>{u.role !== 'admin' && <button className="text-button" onClick={() => userStatus(u)}>{u.active ? 'Deactivate' : 'Activate'}</button>}</td></tr>)}</tbody></table></div></div>}
      {active === 'jobs' && <div className="panel"><h2>Job moderation</h2><div className="table-wrap"><table><thead><tr><th>Title</th><th>Company</th><th>Recruiter</th><th>Status</th><th /></tr></thead><tbody>{jobs.map((job) => <tr key={job._id}><td>{job.title}</td><td>{job.companyName}</td><td>{job.recruiter?.email}</td><td><span className={`status-badge ${job.status}`}>{job.status}</span></td><td><button className="text-button danger" onClick={() => removeJob(job._id)}>Remove</button></td></tr>)}</tbody></table></div></div>}
      {active === 'categories' && <div className="panel"><h2>Job categories</h2><div className="inline-form"><input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="New category name" /><button className="button" onClick={addCategory}>Add category</button></div><div className="category-list">{categories.map((c) => <div key={c._id}><span>{c.name}</span><button className="text-button danger" onClick={() => deleteCategory(c._id)}>Delete</button></div>)}</div></div>}
    </DashboardLayout>
  );
}
