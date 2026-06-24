import { Building2, BriefcaseBusiness, LockKeyhole, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'candidate', companyName: '' });
  const [busy, setBusy] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault(); setBusy(true);
    try {
      const payload =
  form.role === 'candidate'
    ? {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role
      }
    : form;

await register(payload);
      toast.success('Account created');
      navigate(`/${form.role}`);
    } catch (error) { toast.error(error.response?.data?.message || 'Registration failed'); }
    finally { setBusy(false); }
  };

  return (
    <section className="auth-page"><div className="auth-card wide">
      <div className="auth-brand"><span className="brand-icon"><BriefcaseBusiness /></span><h1>Create an account</h1><p>Register as a job seeker or recruiter.</p></div>
      <form onSubmit={submit} className="form-stack">
        <div className="role-switch"><button type="button" className={form.role === 'candidate' ? 'active' : ''} onClick={() => setForm({ ...form, role: 'candidate' })}>Job seeker</button><button type="button" className={form.role === 'recruiter' ? 'active' : ''} onClick={() => setForm({ ...form, role: 'recruiter' })}>Recruiter</button></div>
        <label>Full name<div className="input-icon"><User size={18} /><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div></label>
        <label>Email address<div className="input-icon"><Mail size={18} /><input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div></label>
        {form.role === 'recruiter' && <label>Company name<div className="input-icon"><Building2 size={18} /><input required value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} /></div></label>}
        <label>Password<div className="input-icon"><LockKeyhole size={18} /><input type="password" minLength="8" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div></label>
        <button className="button full" disabled={busy}>{busy ? 'Creating…' : 'Create account'}</button>
      </form>
      <p className="auth-switch">Already registered? <Link to="/login">Sign in</Link></p>
    </div></section>
  );
}
