import Job from '../models/Job.js';
import Category from '../models/Category.js';
import RecruiterProfile from '../models/RecruiterProfile.js';
import SavedJob from '../models/SavedJob.js';
import Application from '../models/Application.js';
import { ApiError } from '../utils/ApiError.js';

export async function listJobs(req, res) {
  const page = Math.max(Number(req.query.page || 1), 1);
  const limit = Math.min(Math.max(Number(req.query.limit || 9), 1), 30);
  const filter = { status: 'open', deadline: { $gte: new Date() } };

  if (req.query.q) filter.$text = { $search: req.query.q };
  if (req.query.location) filter.location = new RegExp(req.query.location, 'i');
  if (req.query.category) filter.category = req.query.category;
  if (req.query.type) filter.employmentType = req.query.type;

  const [jobs, total] = await Promise.all([
    Job.find(filter)
      .populate('category', 'name slug')
      .sort(req.query.q ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Job.countDocuments(filter)
  ]);

  res.json({ success: true, jobs, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}

export async function getJob(req, res) {
  const job = await Job.findById(req.params.id).populate('category', 'name slug').populate('recruiter', 'name email');
  if (!job) throw new ApiError(404, 'Job not found');
  res.json({ success: true, job });
}

export async function createJob(req, res) {
  const profile = await RecruiterProfile.findOne({ user: req.user._id });
  if (!profile) throw new ApiError(400, 'Recruiter profile is missing');
  const category = await Category.findById(req.validated.body.category);
  if (!category) throw new ApiError(400, 'Selected category does not exist');

  const job = await Job.create({
    ...req.validated.body,
    recruiter: req.user._id,
    companyName: profile.companyName
  });
  res.status(201).json({ success: true, job });
}

async function requireJobOwner(jobId, user) {
  const job = await Job.findById(jobId);
  if (!job) throw new ApiError(404, 'Job not found');
  if (user.role !== 'admin' && job.recruiter.toString() !== user._id.toString()) {
    throw new ApiError(403, 'Only the job owner can modify this job');
  }
  return job;
}

export async function updateJob(req, res) {
  const job = await requireJobOwner(req.params.id, req.user);
  const allowed = ['title', 'description', 'location', 'category', 'employmentType', 'experienceLevel', 'salaryMin', 'salaryMax', 'skills', 'deadline'];
  for (const key of allowed) if (key in req.body) job[key] = req.body[key];
  await job.save();
  res.json({ success: true, job });
}

export async function updateJobStatus(req, res) {
  const job = await requireJobOwner(req.params.id, req.user);
  job.status = req.validated.body.status;
  await job.save();
  res.json({ success: true, job });
}

export async function deleteJob(req, res) {
  const job = await requireJobOwner(req.params.id, req.user);
  await Promise.all([
    Application.deleteMany({ job: job._id }),
    SavedJob.deleteMany({ job: job._id }),
    job.deleteOne()
  ]);
  res.json({ success: true, message: 'Job deleted' });
}

export async function recruiterJobs(req, res) {
  const jobs = await Job.find({ recruiter: req.user._id }).populate('category', 'name').sort({ createdAt: -1 });
  const jobIds = jobs.map((job) => job._id);
  const counts = await Application.aggregate([
    { $match: { job: { $in: jobIds } } },
    { $group: { _id: '$job', count: { $sum: 1 } } }
  ]);
  const countMap = Object.fromEntries(counts.map((item) => [item._id.toString(), item.count]));
  res.json({
    success: true,
    jobs: jobs.map((job) => ({ ...job.toObject(), applicationCount: countMap[job._id.toString()] || 0 }))
  });
}

export async function saveJob(req, res) {
  const job = await Job.findById(req.params.id);
  if (!job || job.status !== 'open') throw new ApiError(404, 'Open job not found');
  await SavedJob.findOneAndUpdate(
    { candidate: req.user._id, job: job._id },
    { candidate: req.user._id, job: job._id },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.status(201).json({ success: true, message: 'Job saved' });
}

export async function unsaveJob(req, res) {
  await SavedJob.deleteOne({ candidate: req.user._id, job: req.params.id });
  res.json({ success: true, message: 'Saved job removed' });
}

export async function savedJobs(req, res) {
  const saved = await SavedJob.find({ candidate: req.user._id })
    .populate({ path: 'job', populate: { path: 'category', select: 'name' } })
    .sort({ createdAt: -1 });
  res.json({ success: true, jobs: saved.filter((item) => item.job).map((item) => item.job) });
}
