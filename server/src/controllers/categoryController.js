import Category from '../models/Category.js';
import Job from '../models/Job.js';
import { ApiError } from '../utils/ApiError.js';

const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export async function listCategories(_req, res) {
  const categories = await Category.find().sort({ name: 1 });
  res.json({ success: true, categories });
}

export async function createCategory(req, res) {
  const name = String(req.body.name || '').trim();
  if (name.length < 2 || name.length > 80) throw new ApiError(400, 'Category name must contain 2–80 characters');
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ success: true, category });
}

export async function deleteCategory(req, res) {
  const used = await Job.exists({ category: req.params.id });
  if (used) throw new ApiError(409, 'Category cannot be deleted while jobs use it');
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) throw new ApiError(404, 'Category not found');
  res.json({ success: true, message: 'Category deleted' });
}
