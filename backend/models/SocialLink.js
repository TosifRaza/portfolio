const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
  platform: { type: String, required: [true, 'Platform is required'], trim: true, maxlength: 50 },
  url: { type: String, required: [true, 'URL is required'], trim: true },
  icon: { type: String, default: '' },
  username: { type: String, trim: true, default: '' },
  order: { type: Number, default: 0 },
  enabled: { type: Boolean, default: true },
}, { timestamps: true });

socialLinkSchema.index({ order: 1 });

module.exports = mongoose.model('SocialLink', socialLinkSchema);