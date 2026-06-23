import { LayoutDashboard, Search, UserCircle, BriefcaseBusiness, Users, Tags } from 'lucide-react';

const icons = { overview: LayoutDashboard, profile: UserCircle, jobs: BriefcaseBusiness, applications: Users, saved: Search, categories: Tags };

export default function DashboardLayout({ title, subtitle, tabs, active, onChange, children }) {
  return (
    <section className="dashboard-page">
      <div className="container">
        <div className="dashboard-heading">
          <div><p className="eyebrow">Secure workspace</p><h1>{title}</h1><p>{subtitle}</p></div>
        </div>
        <div className="dashboard-shell">
          <aside className="dashboard-nav">
            {tabs.map((tab) => {
              const Icon = icons[tab.id] || LayoutDashboard;
              return <button className={active === tab.id ? 'active' : ''} onClick={() => onChange(tab.id)} key={tab.id}><Icon size={18} /> {tab.label}</button>;
            })}
          </aside>
          <div className="dashboard-content">{children}</div>
        </div>
      </div>
    </section>
  );
}
