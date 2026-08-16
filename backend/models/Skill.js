const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Skill name is required'], trim: true, maxlength: 50 },
  category: { type: String, required: [true, 'Category is required'], trim: true, maxlength: 50 },
  proficiency: { type: Number, required: true, min: 0, max: 100 },
  icon: { type: String, default: '' },
  color: { type: String, default: '#6366f1' },
  order: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  enabled: { type: Boolean, default: true },
}, { timestamps: true });

skillSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('Skill', skillSchema);