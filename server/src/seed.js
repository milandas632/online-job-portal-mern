import mongoose from 'mongoose';
import { connectDatabase } from './config/db.js';
import User from './models/User.js';
import CandidateProfile from './models/CandidateProfile.js';
import RecruiterProfile from './models/RecruiterProfile.js';
import Category from './models/Category.js';
import Job from './models/Job.js';
import Application from './models/Application.js';
import SavedJob from './models/SavedJob.js';
import RefreshSession from './models/RefreshSession.js';

async function upsertUser({ name, email, password, role }) {
  let user = await User.findOne({ email }).select('+password');
  if (!user) user = await User.create({ name, email, password, role });
  return user;
}

async function seed() {
  await connectDatabase();
  await Promise.all([
    Application.deleteMany({}),
    SavedJob.deleteMany({}),
    Job.deleteMany({}),
    RefreshSession.deleteMany({})
  ]);

  const categoriesData = ['Software Development', 'Data & Analytics', 'Design', 'Marketing', 'Finance', 'Human Resources'];
  const categories = {};
  for (const name of categoriesData) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    categories[name] = await Category.findOneAndUpdate({ slug }, { name, slug }, { upsert: true, new: true });
  }

  const admin = await upsertUser({ name: 'System Administrator', email: 'admin@jobportal.test', password: 'Admin@123', role: 'admin' });
  const recruiter = await upsertUser({ name: 'Demo Recruiter', email: 'recruiter@jobportal.test', password: 'Recruiter@123', role: 'recruiter' });
  const candidate = await upsertUser({ name: 'Demo Candidate', email: 'candidate@jobportal.test', password: 'Candidate@123', role: 'candidate' });

  await RecruiterProfile.findOneAndUpdate(
    { user: recruiter._id },
    {
      user: recruiter._id,
      companyName: 'TechNova Solutions',
      website: 'https://example.com',
      location: 'Kolkata, West Bengal',
      description: 'A demonstration technology company used for the BCA project live demo.',
      verified: true
    },
    { upsert: true, new: true }
  );

  await CandidateProfile.findOneAndUpdate(
    { user: candidate._id },
    {
      user: candidate._id,
      location: 'Howrah, West Bengal',
      headline: 'BCA Graduate and Full-Stack Web Developer',
      bio: 'Interested in web development, databases, and software engineering.',
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
      education: [{ institution: 'Chandigarh University', qualification: 'Bachelor of Computer Applications', startYear: 2023, endYear: 2026 }]
    },
    { upsert: true, new: true }
  );

  const sampleJobs = [
    {
      title: 'Junior React Developer',
      description: 'Build responsive React interfaces, integrate REST APIs, and collaborate with backend developers. Basic knowledge of JavaScript, CSS, Git, and component-based design is required.',
      location: 'Kolkata, West Bengal',
      category: categories['Software Development']._id,
      employmentType: 'Full-time',
      experienceLevel: 'Entry',
      salaryMin: 300000,
      salaryMax: 500000,
      skills: ['React', 'JavaScript', 'CSS', 'Git']
    },
    {
      title: 'Node.js Backend Intern',
      description: 'Assist in developing Express APIs, MongoDB models, validation rules, and automated tests for business applications. Suitable for final-year students and recent graduates.',
      location: 'Remote',
      category: categories['Software Development']._id,
      employmentType: 'Internship',
      experienceLevel: 'Entry',
      salaryMin: 120000,
      salaryMax: 180000,
      skills: ['Node.js', 'Express', 'MongoDB', 'REST API']
    },
    {
      title: 'Data Analyst Trainee',
      description: 'Clean business data, prepare dashboards, write SQL queries, and communicate insights to stakeholders. Knowledge of spreadsheets, SQL, and basic Python is preferred.',
      location: 'Bengaluru, Karnataka',
      category: categories['Data & Analytics']._id,
      employmentType: 'Full-time',
      experienceLevel: 'Entry',
      salaryMin: 350000,
      salaryMax: 550000,
      skills: ['SQL', 'Excel', 'Python', 'Data Visualization']
    }
  ];

  for (const data of sampleJobs) {
    await Job.create({
      recruiter: recruiter._id,
      companyName: 'TechNova Solutions',
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      status: 'open',
      ...data
    });
  }

  console.log('Seed completed.');
  console.log('Admin: admin@jobportal.test / Admin@123');
  console.log('Recruiter: recruiter@jobportal.test / Recruiter@123');
  console.log('Candidate: candidate@jobportal.test / Candidate@123');
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
