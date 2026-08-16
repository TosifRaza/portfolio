// const mongoose = require('mongoose');

// const projectSchema = new mongoose.Schema({
//   title: { type: String, required: [true, 'Project title is required'], trim: true, maxlength: 200 },
//   slug: { type: String, unique: true, lowercase: true, index: true },
//   shortDescription: { type: String, maxlength: 300, default: '' },
//   description: { type: String, required: [true, 'Description is required'], maxlength: 5000 },
//   images: [{ type: String }],
//   thumbnail: { type: String, default: '' },
//   techStack: [{ type: String, trim: true }],
//   liveUrl: { type: String, trim: true },
//   githubUrl: { type: String, trim: true },
//   category: { type: String, trim: true, default: 'Web' },
//   featured: { type: Boolean, default: false },
//   status: { type: String, enum: ['completed', 'in_progress', 'planned'], default: 'completed' },
//   startDate: { type: Date },
//   endDate: { type: Date },
//   client: { type: String, trim: true },
//   order: { type: Number, default: 0 },
//   metaTitle: { type: String, trim: true },
//   metaDescription: { type: String, trim: true },
// }, { timestamps: true });

// projectSchema.index({ featured: -1, order: 1 });
// projectSchema.index({ category: 1 });

// module.exports = mongoose.model('Project', projectSchema);
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Project title is required'], trim: true, maxlength: 200 },
  slug: { type: String, unique: true, lowercase: true, index: true },
  shortDescription: { type: String, maxlength: 300, default: '' },
  description: { type: String, maxlength: 5000, default: '' },
  images: [{ type: String }],
  thumbnail: { type: String, default: '' },
  techStack: [{ type: String, trim: true }],
  liveUrl: { type: String, trim: true },
  githubUrl: { type: String, trim: true },
  category: { type: String, trim: true, default: 'Web' },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['completed', 'in_progress', 'planned'], default: 'completed' },
  startDate: { type: Date },
  endDate: { type: Date },
  client: { type: String, trim: true },
  order: { type: Number, default: 0 },
  metaTitle: { type: String, trim: true },
  metaDescription: { type: String, trim: true },
}, { timestamps: true });

projectSchema.index({ featured: -1, order: 1 });
projectSchema.index({ category: 1 });

module.exports = mongoose.model('Project', projectSchema);