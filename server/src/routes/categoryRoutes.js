import { Router } from 'express';
import { createCategory, deleteCategory, listCategories } from '../controllers/categoryController.js';
import { allowRoles, protect } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();
router.get('/', asyncHandler(listCategories));
router.post('/', protect, allowRoles('admin'), asyncHandler(createCategory));
router.delete('/:id', protect, allowRoles('admin'), asyncHandler(deleteCategory));
export default router;
