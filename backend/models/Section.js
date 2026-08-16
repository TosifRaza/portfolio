const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  sectionId: { type: String, required: [true, 'Section ID is required'], unique: true, trim: true },
  title: { type: String, required: true, trim: true, maxlength: 100 },
  enabled: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  visibility: { type: String, enum: ['all', 'logged_in', 'admin'], default: 'all' },
  customClass: { type: String, default: '' },
}, { timestamps: true });

sectionSchema.index({ order: 1 });

module.exports = mongoose.model('Section', sectionSchema);