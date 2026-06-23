import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { verifyAccessToken } from '../utils/tokens.js';

export const protect = asyncHandler(async (req, _res, next) => {
  const token = req.cookies.accessToken;
  if (!token) throw new ApiError(401, 'Authentication required');

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    throw new ApiError(401, 'Session expired');
  }

  const user = await User.findById(payload.sub).select('-password');
  if (!user || !user.active) throw new ApiError(401, 'User account is unavailable');
  req.user = user;
  next();
});

export const allowRoles = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError(403, 'You do not have permission to perform this action'));
  }
  next();
};
