import { ArrowRight, BriefcaseBusiness, CheckCircle2, Search, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="pill"><CheckCircle2 size={16} /> Full-stack BCA major project</span>
            <h1>Find the right opportunity. <span>Build your career.</span></h1>
            <p>CareerBridge connects job seekers and verified recruiters through searchable vacancies, profile management, secure applications, and transparent status tracking.</p>
            <div className="hero-actions">
              <Link className="button" to="/jobs"><Search size={19} /> Browse jobs</Link>
              <Link className="button secondary" to="/register">Post a vacancy <ArrowRight size={19} /></Link>
            </div>
            <div className="hero-stats">
              <div><strong>3</strong><span>User roles</span></div>
              <div><strong>100%</strong><span>Responsive</span></div>
              <div><strong>JWT</strong><span>Secure access</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-card large">
              <div className="fake-search"><Search size={18} /><span>Search “React developer”</span></div>
              <div className="mini-job"><span className="mini-logo">T</span><div><strong>Frontend Developer</strong><small>TechNova · Kolkata</small></div><span className="status-dot">Open</span></div>
              <div className="mini-job"><span className="mini-logo alt">D</span><div><strong>Data Analyst Trainee</strong><small>DataWorks · Bengaluru</small></div><span className="status-dot">Open</span></div>
              <div className="mini-job"><span className="mini-logo third">N</span><div><strong>Node.js Intern</strong><small>Remote</small></div><span className="status-dot">Open</span></div>
            </div>
            <div className="visual-card floating"><ShieldCheck size={24} /><div><strong>Role-based access</strong><small>Candidate · Recruiter · Admin</small></div></div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-heading"><p className="eyebrow">How it works</p><h2>A focused recruitment workflow</h2></div>
          <div className="feature-grid">
            <article className="feature-card"><Search /><h3>Discover</h3><p>Search vacancies by keyword, location, category, and employment type.</p></article>
            <article className="feature-card"><Users /><h3>Connect</h3><p>Candidates apply with a profile and PDF resume while recruiters review each applicant.</p></article>
            <article className="feature-card"><BriefcaseBusiness /><h3>Track</h3><p>Application states remain visible from submission through review, shortlist, and hiring.</p></article>
          </div>
        </div>
      </section>
      <section className="cta-section"><div className="container cta-card"><div><p className="eyebrow light">Ready to begin?</p><h2>Create your project demo account</h2><p>Choose candidate or recruiter registration and test the complete workflow.</p></div><Link className="button light" to="/register">Get started <ArrowRight size={19} /></Link></div></section>
    </>
  );
}
