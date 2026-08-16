const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Client name is required'], trim: true, maxlength: 100 },
  position: { type: String, trim: true, maxlength: 100 },
  company: { type: String, trim: true, maxlength: 100 },
  content: { type: String, required: [true, 'Testimonial content is required'], maxlength: 2000 },
  avatar: { type: String, default: '' },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  project: { type: String, trim: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

testimonialSchema.index({ featured: -1, order: 1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);