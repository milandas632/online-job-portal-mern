import User from '../models/User.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import Category from '../models/Category.js';
import SavedJob from '../models/SavedJob.js';
import { ApiError } from '../utils/ApiError.js';

export async function stats(_req, res) {
  const [users, candidates, recruiters, jobs, openJobs, applications, categories] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: 'candidate' }),
    User.countDocuments({ role: 'recruiter' }),
    Job.countDocuments(),
    Job.countDocuments({ status: 'open' }),
    Application.countDocuments(),
    Category.countDocuments()
  ]);
  res.json({ success: true, stats: { users, candidates, recruiters, jobs, openJobs, applications, categories } });
}

export async function users(req, res) {
  const page = Math.max(Number(req.query.page || 1), 1);
  const limit = 20;
  const filter = req.query.role ? { role: req.query.role } : {};
  const [items, total] = await Promise.all([
    User.find(filter).select('-password').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    User.countDocuments(filter)
  ]);
  res.json({ success: true, users: items, pagination: { page, total, pages: Math.ceil(total / limit) } });
}

export async function changeUserStatus(req, res) {
  const target = await User.findById(req.params.id);
  if (!target) throw new ApiError(404, 'User not found');
  if (target.role === 'admin') throw new ApiError(400, 'Administrator accounts cannot be deactivated here');
  target.active = Boolean(req.body.active);
  await target.save({ validateBeforeSave: false });
  res.json({ success: true, user: target });
}

export async function jobs(req, res) {
  const page = Math.max(Number(req.query.page || 1), 1);
  const limit = 20;
  const [items, total] = await Promise.all([
    Job.find().populate('recruiter', 'name email').populate('category', 'name').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Job.countDocuments()
  ]);
  res.json({ success: true, jobs: items, pagination: { page, total, pages: Math.ceil(total / limit) } });
}

export async function removeJob(req, res) {
  const job = await Job.findById(req.params.id);
  if (!job) throw new ApiError(404, 'Job not found');
  await Promise.all([Application.deleteMany({ job: job._id }), SavedJob.deleteMany({ job: job._id }), job.deleteOne()]);
  res.json({ success: true, message: 'Job removed by administrator' });
}
