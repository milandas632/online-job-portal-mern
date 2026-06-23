import { Router } from 'express';
import { changePassword, login, logout, me, refresh, register } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { changePasswordSchema, loginSchema, registerSchema } from '../validators/schemas.js';

const router = Router();
router.post('/register', validate(registerSchema), asyncHandler(register));
router.post('/login', validate(loginSchema), asyncHandler(login));
router.post('/refresh', asyncHandler(refresh));
router.post('/logout', asyncHandler(logout));
router.get('/me', protect, asyncHandler(me));
router.patch('/change-password', protect, validate(changePasswordSchema), asyncHandler(changePassword));
export default router;
