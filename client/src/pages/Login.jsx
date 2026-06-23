import { BriefcaseBusiness, LockKeyhole, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [busy, setBusy] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (event) => {
    event.preventDefault(); setBusy(true);
    try {
      await login(form);
      toast.success('Welcome back');
      navigate(location.state?.from || '/');
    } catch (error) { toast.error(error.response?.data?.message || 'Sign in failed'); }
    finally { setBusy(false); }
  };

  return (
    <section className="auth-page"><div className="auth-card">
      <div className="auth-brand"><span className="brand-icon"><BriefcaseBusiness /></span><h1>Sign in</h1><p>Access your secure CareerBridge workspace.</p></div>
      <form onSubmit={submit} className="form-stack">
        <label>Email address<div className="input-icon"><Mail size={18} /><input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></div></label>
        <label>Password<div className="input-icon"><LockKeyhole size={18} /><input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Minimum 8 characters" /></div></label>
        <button className="button full" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
      <div className="demo-box"><strong>Demo accounts</strong><small>Candidate: candidate@jobportal.test / Candidate@123</small><small>Recruiter: recruiter@jobportal.test / Recruiter@123</small><small>Admin: admin@jobportal.test / Admin@123</small></div>
      <p className="auth-switch">New user? <Link to="/register">Create an account</Link></p>
    </div></section>
  );
}
