const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: [true, 'Company name is required'], trim: true, maxlength: 200 },
  position: { type: String, required: [true, 'Position is required'], trim: true, maxlength: 200 },
  location: { type: String, trim: true, maxlength: 100 },
  description: { type: String, required: [true, 'Description is required'], maxlength: 3000 },
  startDate: { type: Date, required: [true, 'Start date is required'] },
  endDate: { type: Date, default: null },
  current: { type: Boolean, default: false },
  companyLogo: { type: String, default: '' },
  highlights: [{ type: String }],
  technologies: [{ type: String, trim: true }],
  order: { type: Number, default: 0 },
}, { timestamps: true });

experienceSchema.index({ order: 1 });

module.exports = mongoose.model('Experience', experienceSchema);