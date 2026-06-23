import { Bookmark, Briefcase, IndianRupee, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const money = (value) => value ? new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value) : 'Not disclosed';

export default function JobCard({ job, onSave }) {
  return (
    <article className="job-card">
      <div className="job-card-top">
        <div className="company-avatar">{job.companyName?.slice(0, 1)}</div>
        {onSave && <button className="icon-button" onClick={() => onSave(job._id)} aria-label="Save job"><Bookmark size={19} /></button>}
      </div>
      <p className="eyebrow">{job.companyName}</p>
      <h3><Link to={`/jobs/${job._id}`}>{job.title}</Link></h3>
      <div className="job-meta">
        <span><MapPin size={16} /> {job.location}</span>
        <span><Briefcase size={16} /> {job.employmentType}</span>
        <span><IndianRupee size={16} /> {job.salaryMin || job.salaryMax ? `${money(job.salaryMin)}–${money(job.salaryMax)}` : 'Not disclosed'}</span>
      </div>
      <div className="tag-row">
        {job.category?.name && <span className="tag primary">{job.category.name}</span>}
        {job.skills?.slice(0, 3).map((skill) => <span className="tag" key={skill}>{skill}</span>)}
      </div>
      <Link className="text-link" to={`/jobs/${job._id}`}>View details →</Link>
    </article>
  );
}
