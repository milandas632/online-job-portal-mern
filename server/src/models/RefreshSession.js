import mongoose from 'mongoose';

const refreshSessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
    revokedAt: Date,
    userAgent: String,
    ipAddress: String
  },
  { timestamps: true }
);

export default mongoose.model('RefreshSession', refreshSessionSchema);
