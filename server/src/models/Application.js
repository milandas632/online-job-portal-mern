import mongoose from 'mongoose';

const statusHistorySchema = new mongoose.Schema(
  {
    status: String,
    changedAt: { type: Date, default: Date.now },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { _id: false }
);

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true, index: true },
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    coverLetter: { type: String, trim: true, maxlength: 2500, default: '' },
    status: {
      type: String,
      enum: ['applied', 'reviewing', 'shortlisted', 'rejected', 'hired', 'withdrawn'],
      default: 'applied',
      index: true
    },
    statusHistory: [statusHistorySchema]
  },
  { timestamps: true }
);

applicationSchema.index({ job: 1, candidate: 1 }, { unique: true });

export default mongoose.model('Application', applicationSchema);
