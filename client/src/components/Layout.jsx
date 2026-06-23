import { BriefcaseBusiness, LogIn, LogOut, Menu, UserPlus, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const dashboardPath = user ? `/${user.role}` : '/login';
  const signOut = async () => {
    await logout();
    toast.success('Signed out');
    navigate('/');
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <Link className="brand" to="/">
            <span className="brand-icon"><BriefcaseBusiness size={24} /></span>
            <span>Career<span>Bridge</span></span>
          </Link>
          <button className="mobile-menu" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
            {open ? <X /> : <Menu />}
          </button>
          <nav className={open ? 'nav-links open' : 'nav-links'} onClick={() => setOpen(false)}>
            <NavLink to="/jobs">Find Jobs</NavLink>
            <NavLink to="/about">About</NavLink>
            {user ? (
              <>
                <NavLink to={dashboardPath}>Dashboard</NavLink>
                <button className="nav-button" onClick={signOut}><LogOut size={17} /> Sign out</button>
              </>
            ) : (
              <>
                <NavLink to="/login"><LogIn size={17} /> Sign in</NavLink>
                <Link className="button small" to="/register"><UserPlus size={17} /> Create account</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand"><span className="brand-icon"><BriefcaseBusiness size={20} /></span><span>Career<span>Bridge</span></span></div>
            <p>A secure full-stack job portal for candidates, recruiters, and administrators.</p>
          </div>
          <div className="academic-note">
            <img src="/chandigarh-university-logo.png" alt="Chandigarh University" />
            <p>BCA Major Project by Milan Das<br />UID: 023BCA110231</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
