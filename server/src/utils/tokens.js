import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signAccessToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role, email: user.email },
    env.accessSecret,
    { expiresIn: `${env.accessMinutes}m` }
  );
}

export function signRefreshToken(user, sessionId) {
  return jwt.sign(
    { sub: user._id.toString(), sid: sessionId.toString() },
    env.refreshSecret,
    { expiresIn: `${env.refreshDays}d` }
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.accessSecret);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, env.refreshSecret);
}

export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function cookieOptions(maxAgeMs) {
  return {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: env.cookieSecure ? 'none' : 'lax',
    maxAge: maxAgeMs,
    path: '/'
  };
}
