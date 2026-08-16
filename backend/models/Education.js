const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: [true, 'Institution name is required'], trim: true, maxlength: 200 },
  degree: { type: String, required: [true, 'Degree is required'], trim: true, maxlength: 200 },
  field: { type: String, required: [true, 'Field of study is required'], trim: true, maxlength: 200 },
  location: { type: String, trim: true, maxlength: 100 },
  description: { type: String, maxlength: 2000, default: '' },
  startDate: { type: Date, required: [true, 'Start date is required'] },
  endDate: { type: Date, default: null },
  current: { type: Boolean, default: false },
  grade: { type: String, trim: true, maxlength: 50 },
  logo: { type: String, default: '' },
  highlights: [{ type: String }],
  order: { type: Number, default: 0 },
}, { timestamps: true });

educationSchema.index({ order: 1 });

module.exports = mongoose.model('Education', educationSchema);