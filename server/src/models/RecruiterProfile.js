import mongoose from 'mongoose';

const recruiterProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    companyName: { type: String, required: true, trim: true, maxlength: 150 },
    website: { type: String, trim: true, maxlength: 200, default: '' },
    location: { type: String, trim: true, maxlength: 120, default: '' },
    description: { type: String, trim: true, maxlength: 1500, default: '' },
    verified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('RecruiterProfile', recruiterProfileSchema);
