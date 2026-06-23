import CandidateProfile from '../models/CandidateProfile.js';
import RecruiterProfile from '../models/RecruiterProfile.js';
import { ApiError } from '../utils/ApiError.js';

export async function getCandidateProfile(req, res) {
  const profile = await CandidateProfile.findOne({ user: req.user._id });
  res.json({ success: true, profile });
}

export async function updateCandidateProfile(req, res) {
  const allowed = ['phone', 'location', 'headline', 'bio', 'skills', 'education', 'experience'];
  const update = Object.fromEntries(allowed.filter((key) => key in req.body).map((key) => [key, req.body[key]]));
  const profile = await CandidateProfile.findOneAndUpdate({ user: req.user._id }, update, {
    new: true,
    runValidators: true
  });
  res.json({ success: true, profile });
}

export async function uploadResume(req, res) {
  const { fileName, mimeType, base64 } = req.body;
  if (!fileName || mimeType !== 'application/pdf' || !base64) {
    throw new ApiError(400, 'A PDF resume is required');
  }
  const approximateBytes = Buffer.byteLength(base64, 'base64');
  if (approximateBytes > 2 * 1024 * 1024) throw new ApiError(413, 'Resume must not exceed 2 MB');

  const profile = await CandidateProfile.findOneAndUpdate(
    { user: req.user._id },
    { resume: { fileName, mimeType, base64, uploadedAt: new Date() } },
    { new: true, runValidators: true }
  );
  res.json({ success: true, resume: { fileName, mimeType, uploadedAt: profile.resume.uploadedAt } });
}

export async function downloadResume(req, res) {
  const profile = await CandidateProfile.findOne({ user: req.params.userId }).select('+resume.base64');
  if (!profile?.resume?.base64) throw new ApiError(404, 'Resume not found');

  const buffer = Buffer.from(profile.resume.base64, 'base64');
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="${profile.resume.fileName || 'resume.pdf'}"`);
  res.send(buffer);
}

export async function getRecruiterProfile(req, res) {
  const profile = await RecruiterProfile.findOne({ user: req.user._id });
  res.json({ success: true, profile });
}

export async function updateRecruiterProfile(req, res) {
  const allowed = ['companyName', 'website', 'location', 'description'];
  const update = Object.fromEntries(allowed.filter((key) => key in req.body).map((key) => [key, req.body[key]]));
  const profile = await RecruiterProfile.findOneAndUpdate({ user: req.user._id }, update, {
    new: true,
    runValidators: true
  });
  res.json({ success: true, profile });
}
