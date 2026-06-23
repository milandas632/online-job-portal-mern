import Application from '../models/Application.js';
import Job from '../models/Job.js';
import CandidateProfile from '../models/CandidateProfile.js';
import { ApiError } from '../utils/ApiError.js';

export async function applyToJob(req, res) {
  const job = await Job.findById(req.params.jobId);
  if (!job || job.status !== 'open' || job.deadline < new Date()) throw new ApiError(400, 'This job is not accepting applications');

  const profile = await CandidateProfile.findOne({ user: req.user._id });
  if (!profile?.resume?.fileName) throw new ApiError(400, 'Upload a PDF resume before applying');

  const application = await Application.create({
    job: job._id,
    candidate: req.user._id,
    coverLetter: req.validated.body.coverLetter,
    statusHistory: [{ status: 'applied', changedBy: req.user._id }]
  });
  res.status(201).json({ success: true, application });
}

export async function myApplications(req, res) {
  const applications = await Application.find({ candidate: req.user._id })
    .populate({ path: 'job', populate: { path: 'category', select: 'name' } })
    .sort({ createdAt: -1 });
  res.json({ success: true, applications });
}

export async function withdrawApplication(req, res) {
  const application = await Application.findOne({ _id: req.params.id, candidate: req.user._id });
  if (!application) throw new ApiError(404, 'Application not found');
  if (['hired', 'rejected', 'withdrawn'].includes(application.status)) {
    throw new ApiError(400, 'This application cannot be withdrawn');
  }
  application.status = 'withdrawn';
  application.statusHistory.push({ status: 'withdrawn', changedBy: req.user._id });
  await application.save();
  res.json({ success: true, application });
}

export async function recruiterApplications(req, res) {
  const recruiterJobs = await Job.find({ recruiter: req.user._id }).select('_id');
  const jobIds = recruiterJobs.map((job) => job._id);
  const filter = { job: { $in: jobIds } };
  if (req.query.jobId) filter.job = req.query.jobId;

  const applications = await Application.find(filter)
    .populate('job', 'title companyName')
    .populate('candidate', 'name email')
    .sort({ createdAt: -1 });
  res.json({ success: true, applications });
}

export async function updateApplicationStatus(req, res) {
  const application = await Application.findById(req.params.id).populate('job');
  if (!application) throw new ApiError(404, 'Application not found');
  if (application.job.recruiter.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'This application belongs to another recruiter');
  }
  if (application.status === 'withdrawn') throw new ApiError(400, 'A withdrawn application cannot be updated');

  application.status = req.validated.body.status;
  application.statusHistory.push({ status: application.status, changedBy: req.user._id });
  await application.save();
  res.json({ success: true, application });
}
