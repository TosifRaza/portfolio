const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Service title is required'], trim: true, maxlength: 100 },
  description: { type: String, required: [true, 'Description is required'], maxlength: 1000 },
  icon: { type: String, default: '' },
  image: { type: String, default: '' },
  features: [{ type: String }],
  pricing: { type: String, trim: true, default: '' },
  order: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

serviceSchema.index({ order: 1 });

module.exports = mongoose.model('Service', serviceSchema);