import { Router } from 'express';
import {
  downloadResume,
  getCandidateProfile,
  getRecruiterProfile,
  updateCandidateProfile,
  updateRecruiterProfile,
  uploadResume
} from '../controllers/profileController.js';
import { allowRoles, protect } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();
router.use(protect);
router.get('/candidate', allowRoles('candidate'), asyncHandler(getCandidateProfile));
router.put('/candidate', allowRoles('candidate'), asyncHandler(updateCandidateProfile));
router.post('/candidate/resume', allowRoles('candidate'), asyncHandler(uploadResume));
router.get('/candidate/:userId/resume', allowRoles('recruiter', 'admin'), asyncHandler(downloadResume));
router.get('/recruiter', allowRoles('recruiter'), asyncHandler(getRecruiterProfile));
router.put('/recruiter', allowRoles('recruiter'), asyncHandler(updateRecruiterProfile));
export default router;
