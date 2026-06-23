import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    companyName: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    location: { type: String, required: true, trim: true, maxlength: 120, index: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    employmentType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
      required: true,
      index: true
    },
    experienceLevel: {
      type: String,
      enum: ['Entry', 'Mid', 'Senior', 'Lead'],
      default: 'Entry'
    },
    salaryMin: { type: Number, min: 0, default: 0 },
    salaryMax: { type: Number, min: 0, default: 0 },
    skills: [{ type: String, trim: true, maxlength: 50 }],
    deadline: { type: Date, required: true },
    status: { type: String, enum: ['open', 'closed'], default: 'open', index: true }
  },
  { timestamps: true }
);

jobSchema.index({ title: 'text', companyName: 'text', description: 'text', skills: 'text' });

export default mongoose.model('Job', jobSchema);
