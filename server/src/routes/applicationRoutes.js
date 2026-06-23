import { Router } from 'express';
import {
  applyToJob,
  myApplications,
  recruiterApplications,
  updateApplicationStatus,
  withdrawApplication
} from '../controllers/applicationController.js';
import { allowRoles, protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { applicationSchema, applicationStatusSchema } from '../validators/schemas.js';

const router = Router();
router.use(protect);
router.post('/jobs/:jobId', allowRoles('candidate'), validate(applicationSchema), asyncHandler(applyToJob));
router.get('/mine', allowRoles('candidate'), asyncHandler(myApplications));
router.patch('/:id/withdraw', allowRoles('candidate'), asyncHandler(withdrawApplication));
router.get('/recruiter', allowRoles('recruiter'), asyncHandler(recruiterApplications));
router.patch('/:id/status', allowRoles('recruiter'), validate(applicationStatusSchema), asyncHandler(updateApplicationStatus));
export default router;
