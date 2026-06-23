import { Database, Layers3, LockKeyhole, MonitorSmartphone } from 'lucide-react';

export default function About() {
  return (
    <section className="section page-top">
      <div className="container narrow">
        <p className="eyebrow">About this system</p>
        <h1>Online Job Portal System Using Full Stack Development Frameworks</h1>
        <p className="lead">This academic software project demonstrates the complete software development lifecycle: requirements, database design, responsive frontend development, REST API implementation, authentication, testing, and cloud deployment.</p>
        <div className="feature-grid two">
          <article className="feature-card"><MonitorSmartphone /><h3>React interface</h3><p>Responsive, reusable components for public pages and three role-specific dashboards.</p></article>
          <article className="feature-card"><Layers3 /><h3>Express API</h3><p>Layered routes, controllers, middleware, validation, and centralized error responses.</p></article>
          <article className="feature-card"><Database /><h3>MongoDB design</h3><p>Separate collections, references, unique indexes, search indexes, and validation.</p></article>
          <article className="feature-card"><LockKeyhole /><h3>Secure sessions</h3><p>Hashed passwords, short-lived access tokens, rotating refresh sessions, and RBAC.</p></article>
        </div>
        <div className="academic-card">
          <img src="/chandigarh-university-logo.png" alt="Chandigarh University" />
          <div><strong>Milan Das</strong><p>University ID: 023BCA110231 · BCA · Academic Session 2023–2026</p><p>Guide/Mentor: Dr. Vandana Sivaraj</p></div>
        </div>
      </div>
    </section>
  );
}
