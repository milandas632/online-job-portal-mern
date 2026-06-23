import { Router } from 'express';
import {
  createJob,
  deleteJob,
  getJob,
  listJobs,
  recruiterJobs,
  savedJobs,
  saveJob,
  unsaveJob,
  updateJob,
  updateJobStatus
} from '../controllers/jobController.js';
import { allowRoles, protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { jobSchema, jobStatusSchema } from '../validators/schemas.js';

const router = Router();
router.get('/', asyncHandler(listJobs));
router.get('/recruiter/mine', protect, allowRoles('recruiter'), asyncHandler(recruiterJobs));
router.get('/candidate/saved', protect, allowRoles('candidate'), asyncHandler(savedJobs));
router.get('/:id', asyncHandler(getJob));
router.post('/', protect, allowRoles('recruiter'), validate(jobSchema), asyncHandler(createJob));
router.put('/:id', protect, allowRoles('recruiter', 'admin'), asyncHandler(updateJob));
router.patch('/:id/status', protect, allowRoles('recruiter', 'admin'), validate(jobStatusSchema), asyncHandler(updateJobStatus));
router.delete('/:id', protect, allowRoles('recruiter', 'admin'), asyncHandler(deleteJob));
router.post('/:id/save', protect, allowRoles('candidate'), asyncHandler(saveJob));
router.delete('/:id/save', protect, allowRoles('candidate'), asyncHandler(unsaveJob));
export default router;
