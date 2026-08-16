const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: [true, 'Page is required'],
      trim: true,
      index: true,
    },
    referrer: {
      type: String,
      default: '',
    },
    ipAddress: {
      type: String,
      default: '',
    },
    userAgent: {
      type: String,
      default: '',
    },
    browser: {
      type: String,
      default: '',
      index: true,
    },
    os: {
      type: String,
      default: '',
      index: true,
    },
    device: {
      type: String,
      enum: ['desktop', 'mobile', 'tablet', 'unknown'],
      default: 'unknown',
      index: true,
    },
    country: {
      type: String,
      default: '',
      index: true,
    },
    sessionId: {
      type: String,
      default: '',
      index: true,
    },
  },
  { timestamps: true }
);

analyticsSchema.index({ createdAt: -1 });
analyticsSchema.index({ page: 1, createdAt: -1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
