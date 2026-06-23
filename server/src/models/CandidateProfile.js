import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, trim: true, maxlength: 120 },
    qualification: { type: String, trim: true, maxlength: 100 },
    startYear: Number,
    endYear: Number
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, trim: true, maxlength: 120 },
    title: { type: String, trim: true, maxlength: 100 },
    startDate: Date,
    endDate: Date,
    description: { type: String, trim: true, maxlength: 800 }
  },
  { _id: false }
);

const candidateProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    phone: { type: String, trim: true, maxlength: 20, default: '' },
    location: { type: String, trim: true, maxlength: 120, default: '' },
    headline: { type: String, trim: true, maxlength: 160, default: '' },
    bio: { type: String, trim: true, maxlength: 1200, default: '' },
    skills: [{ type: String, trim: true, maxlength: 50 }],
    education: [educationSchema],
    experience: [experienceSchema],
    resume: {
      fileName: String,
      mimeType: String,
      base64: { type: String, select: false },
      uploadedAt: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model('CandidateProfile', candidateProfileSchema);
