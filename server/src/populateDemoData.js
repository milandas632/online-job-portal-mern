import crypto from 'crypto';

import User from './models/User.js';
import CandidateProfile from './models/CandidateProfile.js';
import RecruiterProfile from './models/RecruiterProfile.js';
import Category from './models/Category.js';
import Job from './models/Job.js';
import Application from './models/Application.js';

const candidateData = [
  ['Aarav Sharma', 'candidate01@example.com', 'Kolkata, West Bengal', 'Entry-Level Frontend Developer', ['HTML', 'CSS', 'JavaScript', 'React']],
  ['Ananya Singh', 'candidate02@example.com', 'Bengaluru, Karnataka', 'Junior Data Analyst', ['Excel', 'SQL', 'Python', 'Data Visualization']],
  ['Rohan Das', 'candidate03@example.com', 'Howrah, West Bengal', 'Technical Content Writer', ['Technical Writing', 'Web Research', 'WordPress', 'SEO']],
  ['Priya Patel', 'candidate04@example.com', 'Ahmedabad, Gujarat', 'UI/UX Design Trainee', ['Figma', 'UI Design', 'Wireframing', 'User Research']],
  ['Arjun Mehta', 'candidate05@example.com', 'Pune, Maharashtra', 'Node.js Backend Intern', ['Node.js', 'Express', 'MongoDB', 'REST API']],
  ['Sneha Roy', 'candidate06@example.com', 'Kolkata, West Bengal', 'Digital Marketing Associate', ['Digital Marketing', 'Social Media', 'SEO', 'Analytics']],
  ['Vikram Kumar', 'candidate07@example.com', 'Patna, Bihar', 'IT Support Executive', ['Windows', 'Networking', 'Hardware', 'Troubleshooting']],
  ['Neha Gupta', 'candidate08@example.com', 'Delhi, India', 'Human Resources Trainee', ['Recruitment', 'Communication', 'Microsoft Office', 'Documentation']],
  ['Sourav Mondal', 'candidate09@example.com', 'Durgapur, West Bengal', 'Junior Software Tester', ['Manual Testing', 'Test Cases', 'Bug Reporting', 'Postman']],
  ['Ishita Verma', 'candidate10@example.com', 'Jaipur, Rajasthan', 'Finance Operations Associate', ['Excel', 'Accounting', 'Reporting', 'Data Entry']]
];

const recruiterData = [
  ['Rahul Sen', 'recruiter01@example.com', 'TechNova Solutions', 'Kolkata, West Bengal'],
  ['Meera Kapoor', 'recruiter02@example.com', 'DataWorks Analytics', 'Bengaluru, Karnataka'],
  ['Sanjay Iyer', 'recruiter03@example.com', 'PixelCraft Studio', 'Mumbai, Maharashtra'],
  ['Kavita Rao', 'recruiter04@example.com', 'CloudPeak Systems', 'Hyderabad, Telangana'],
  ['Amit Joshi', 'recruiter05@example.com', 'BrightReach Media', 'Delhi, India'],
  ['Pooja Nair', 'recruiter06@example.com', 'PeopleFirst Consulting', 'Pune, Maharashtra'],
  ['Debasish Ghosh', 'recruiter07@example.com', 'Eastern IT Support', 'Howrah, West Bengal'],
  ['Ritika Malhotra', 'recruiter08@example.com', 'QualityCore Labs', 'Noida, Uttar Pradesh'],
  ['Nitin Bansal', 'recruiter09@example.com', 'FinEdge Services', 'Gurugram, Haryana'],
  ['Shreya Banerjee', 'recruiter10@example.com', 'LearnSphere EdTech', 'Remote']
];

const jobTemplates = [
  ['Junior React Developer', 'Software Development', 'Kolkata, West Bengal', 'Full-time', 300000, 500000, ['React', 'JavaScript', 'CSS', 'Git']],
  ['Frontend Developer Intern', 'Software Development', 'Remote', 'Internship', 120000, 180000, ['HTML', 'CSS', 'JavaScript', 'React']],
  ['Data Analyst Trainee', 'Data & Analytics', 'Bengaluru, Karnataka', 'Full-time', 350000, 550000, ['SQL', 'Excel', 'Python', 'Data Visualization']],
  ['Business Reporting Intern', 'Data & Analytics', 'Remote', 'Internship', 120000, 200000, ['Excel', 'Reporting', 'SQL', 'PowerPoint']],
  ['Junior UI Designer', 'Design', 'Mumbai, Maharashtra', 'Full-time', 280000, 450000, ['Figma', 'UI Design', 'Wireframing', 'Prototyping']],
  ['Graphic Design Intern', 'Design', 'Remote', 'Internship', 100000, 180000, ['Canva', 'Photoshop', 'Branding', 'Social Media']],
  ['Node.js Backend Developer', 'Software Development', 'Hyderabad, Telangana', 'Full-time', 400000, 650000, ['Node.js', 'Express', 'MongoDB', 'REST API']],
  ['API Development Intern', 'Software Development', 'Remote', 'Internship', 150000, 220000, ['JavaScript', 'Node.js', 'Postman', 'Git']],
  ['Digital Marketing Associate', 'Marketing', 'Delhi, India', 'Full-time', 250000, 420000, ['Digital Marketing', 'SEO', 'Social Media', 'Analytics']],
  ['Content Marketing Intern', 'Marketing', 'Remote', 'Internship', 100000, 180000, ['Content Writing', 'SEO', 'Research', 'WordPress']],
  ['HR Operations Trainee', 'Human Resources', 'Pune, Maharashtra', 'Full-time', 240000, 380000, ['Recruitment', 'Communication', 'Excel', 'Documentation']],
  ['Recruitment Coordinator Intern', 'Human Resources', 'Remote', 'Internship', 100000, 160000, ['Recruitment', 'Communication', 'Scheduling', 'Microsoft Office']],
  ['IT Support Executive', 'Software Development', 'Howrah, West Bengal', 'Full-time', 240000, 400000, ['Windows', 'Networking', 'Hardware', 'Troubleshooting']],
  ['Desktop Support Intern', 'Software Development', 'Kolkata, West Bengal', 'Internship', 100000, 160000, ['Windows', 'Hardware', 'Networking', 'Customer Support']],
  ['Junior Software Tester', 'Software Development', 'Noida, Uttar Pradesh', 'Full-time', 300000, 480000, ['Manual Testing', 'Test Cases', 'Bug Reporting', 'Postman']],
  ['QA Intern', 'Software Development', 'Remote', 'Internship', 120000, 180000, ['Testing', 'Bug Tracking', 'Documentation', 'Web Applications']],
  ['Finance Operations Associate', 'Finance', 'Gurugram, Haryana', 'Full-time', 280000, 450000, ['Excel', 'Accounting', 'Reporting', 'Data Entry']],
  ['Accounts Intern', 'Finance', 'Delhi, India', 'Internship', 100000, 170000, ['Accounting', 'Excel', 'Invoices', 'Documentation']],
  ['Technical Content Writer', 'Marketing', 'Remote', 'Full-time', 260000, 420000, ['Technical Writing', 'Web Research', 'SEO', 'Documentation']],
  ['Online Course Support Intern', 'Human Resources', 'Remote', 'Internship', 100000, 180000, ['Communication', 'Microsoft Office', 'Content Management', 'Student Support']]
];

const categoryNames = ['Software Development', 'Data & Analytics', 'Design', 'Marketing', 'Finance', 'Human Resources'];

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function findOrCreateUser(name, email, role) {
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      name,
      email,
      password: crypto.randomBytes(24).toString('hex'),
      role
    });
  }
  return user;
}

export async function populateDemoData() {
  console.log('Checking demo population data...');

  const categories = {};
  for (const name of categoryNames) {
    const slug = slugify(name);
    categories[name] = await Category.findOneAndUpdate(
      { slug },
      { $setOnInsert: { name, slug } },
      { upsert: true, new: true }
    );
  }

  const candidates = [];
  for (const [name, email, location, headline, skills] of candidateData) {
    const user = await findOrCreateUser(name, email, 'candidate');
    candidates.push(user);
    await CandidateProfile.findOneAndUpdate(
      { user: user._id },
      {
        $setOnInsert: {
          user: user._id,
          phone: '',
          location,
          headline,
          bio: `${headline} with an interest in technology, professional development, and entry-level opportunities.`,
          skills,
          education: [{ institution: 'Demo Institute of Technology', qualification: 'Bachelor Degree', startYear: 2022, endYear: 2025 }]
        }
      },
      { upsert: true, new: true }
    );
  }

  const recruiters = [];
  for (const [name, email, companyName, location] of recruiterData) {
    const user = await findOrCreateUser(name, email, 'recruiter');
    recruiters.push(user);
    await RecruiterProfile.findOneAndUpdate(
      { user: user._id },
      {
        $setOnInsert: {
          user: user._id,
          companyName,
          website: 'https://example.com',
          location,
          description: `${companyName} is a demonstration company created to populate the academic job portal project.`,
          verified: true
        }
      },
      { upsert: true, new: true }
    );
  }

  const createdJobs = [];
  for (let index = 0; index < jobTemplates.length; index += 1) {
    const [title, categoryName, location, employmentType, salaryMin, salaryMax, skills] = jobTemplates[index];
    const recruiterIndex = Math.floor(index / 2);
    const recruiter = recruiters[recruiterIndex];
    const companyName = recruiterData[recruiterIndex][2];

    let job = await Job.findOne({ recruiter: recruiter._id, title });
    if (!job) {
      job = await Job.create({
        recruiter: recruiter._id,
        title,
        companyName,
        description: `${companyName} is inviting applications for the position of ${title}. Freshers and entry-level candidates with relevant skills are encouraged to apply.`,
        location,
        category: categories[categoryName]._id,
        employmentType,
        experienceLevel: 'Entry',
        salaryMin,
        salaryMax,
        skills,
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        status: 'open'
      });
    }
    createdJobs.push(job);
  }

  const statuses = ['applied', 'reviewing', 'shortlisted', 'rejected', 'hired'];
  for (let candidateIndex = 0; candidateIndex < candidates.length; candidateIndex += 1) {
    for (let offset = 0; offset < 2; offset += 1) {
      const candidate = candidates[candidateIndex];
      const job = createdJobs[(candidateIndex * 2 + offset) % createdJobs.length];
      const exists = await Application.findOne({ job: job._id, candidate: candidate._id });
      if (!exists) {
        const status = statuses[(candidateIndex + offset) % statuses.length];
        await Application.create({
          job: job._id,
          candidate: candidate._id,
          coverLetter: 'I am interested in this opportunity and believe my skills and willingness to learn make me a suitable entry-level candidate.',
          status,
          statusHistory: [
            { status: 'applied', changedAt: new Date(), changedBy: candidate._id },
            ...(status === 'applied' ? [] : [{ status, changedAt: new Date(), changedBy: job.recruiter }])
          ]
        });
      }
    }
  }

  console.log('Demo population completed: 10 candidates, 10 recruiters, 20 jobs, and 20 applications.');
}
