const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    fileUrl: {
      type: String,
      default: '',
    },
    publicId: {
      type: String,
      default: '',
    },
    fileName: {
      type: String,
      default: '',
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    mimeType: {
      type: String,
      default: '',
    },
    summary: {
      type: String,
      maxlength: [5000, 'Summary cannot exceed 5000 characters'],
      default: '',
    },
    highlights: [
      {
        type: String,
        trim: true,
      },
    ],
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

resumeSchema.statics.getResume = async function () {
  let resume = await this.findOne();
  if (!resume) {
    resume = await this.create({});
  }
  return resume;
};

module.exports = mongoose.model('Resume', resumeSchema);
