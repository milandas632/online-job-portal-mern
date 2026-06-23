import { Router } from 'express';
import { changeUserStatus, jobs, removeJob, stats, users } from '../controllers/adminController.js';
import { allowRoles, protect } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();
router.use(protect, allowRoles('admin'));
router.get('/stats', asyncHandler(stats));
router.get('/users', asyncHandler(users));
router.patch('/users/:id/status', asyncHandler(changeUserStatus));
router.get('/jobs', asyncHandler(jobs));
router.delete('/jobs/:id', asyncHandler(removeJob));
export default router;
