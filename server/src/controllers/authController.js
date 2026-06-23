import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import CandidateProfile from '../models/CandidateProfile.js';
import RecruiterProfile from '../models/RecruiterProfile.js';
import RefreshSession from '../models/RefreshSession.js';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import {
  cookieOptions,
  hashToken,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from '../utils/tokens.js';

const accessCookieMs = () => env.accessMinutes * 60 * 1000;
const refreshCookieMs = () => env.refreshDays * 24 * 60 * 60 * 1000;

async function createSession(user, req, res) {
  const session = await RefreshSession.create({
    user: user._id,
    tokenHash: 'temporary',
    expiresAt: new Date(Date.now() + refreshCookieMs()),
    userAgent: req.get('user-agent') || '',
    ipAddress: req.ip
  });

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user, session._id);
  session.tokenHash = hashToken(refreshToken);
  await session.save();

  res.cookie('accessToken', accessToken, cookieOptions(accessCookieMs()));
  res.cookie('refreshToken', refreshToken, cookieOptions(refreshCookieMs()));
}

function safeUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role, active: user.active };
}

export async function register(req, res) {
  const { name, email, password, role, companyName } = req.validated.body;
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, 'Email is already registered');

  const user = await User.create({ name, email, password, role });
  if (role === 'candidate') {
    await CandidateProfile.create({ user: user._id });
  } else {
    await RecruiterProfile.create({ user: user._id, companyName });
  }

  await createSession(user, req, res);
  res.status(201).json({ success: true, user: safeUser(user) });
}

export async function login(req, res) {
  const email = req.validated.body.email.toLowerCase();
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(req.validated.body.password))) {
    throw new ApiError(401, 'Invalid email or password');
  }
  if (!user.active) throw new ApiError(403, 'This account has been deactivated');

  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });
  await createSession(user, req, res);
  res.json({ success: true, user: safeUser(user) });
}

export async function refresh(req, res) {
  const token = req.cookies.refreshToken;
  if (!token) throw new ApiError(401, 'Refresh session is unavailable');

  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch {
    throw new ApiError(401, 'Refresh session is invalid or expired');
  }

  const session = await RefreshSession.findById(payload.sid);
  if (!session || session.revokedAt || session.tokenHash !== hashToken(token) || session.expiresAt < new Date()) {
    throw new ApiError(401, 'Refresh session has been revoked');
  }

  const user = await User.findById(payload.sub);
  if (!user || !user.active) throw new ApiError(401, 'User account is unavailable');

  session.revokedAt = new Date();
  await session.save();
  await createSession(user, req, res);
  res.json({ success: true, user: safeUser(user) });
}

export async function logout(req, res) {
  const token = req.cookies.refreshToken;
  if (token) {
    try {
      const payload = verifyRefreshToken(token);
      await RefreshSession.findByIdAndUpdate(payload.sid, { revokedAt: new Date() });
    } catch {
      // Clear cookies even when token is already invalid.
    }
  }

  res.clearCookie('accessToken', { path: '/' });
  res.clearCookie('refreshToken', { path: '/' });
  res.json({ success: true, message: 'Signed out successfully' });
}

export async function me(req, res) {
  let profile = null;
  if (req.user.role === 'candidate') profile = await CandidateProfile.findOne({ user: req.user._id });
  if (req.user.role === 'recruiter') profile = await RecruiterProfile.findOne({ user: req.user._id });
  res.json({ success: true, user: safeUser(req.user), profile });
}

export async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.validated.body;
  const user = await User.findById(req.user._id).select('+password');
  if (!(await user.comparePassword(currentPassword))) throw new ApiError(400, 'Current password is incorrect');

  user.password = newPassword;
  await user.save();
  await RefreshSession.updateMany({ user: user._id, revokedAt: null }, { revokedAt: new Date() });
  res.clearCookie('accessToken', { path: '/' });
  res.clearCookie('refreshToken', { path: '/' });
  res.json({ success: true, message: 'Password changed. Please sign in again.' });
}
