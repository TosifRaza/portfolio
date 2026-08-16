const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Blog title is required'], trim: true, maxlength: 300 },
  slug: { type: String, unique: true, lowercase: true, index: true, required: true },
  excerpt: { type: String, maxlength: 500, default: '' },
  content: { type: String, required: [true, 'Content is required'] },
  featuredImage: { type: String, default: '' },
  category: { type: String, required: [true, 'Category is required'], trim: true, maxlength: 50 },
  tags: [{ type: String, trim: true }],
  status: { type: String, enum: ['draft', 'published', 'scheduled'], default: 'draft' },
  publishedAt: { type: Date, default: null },
  scheduledAt: { type: Date, default: null },
  author: { type: String, trim: true, default: 'Admin' },
  metaTitle: { type: String, trim: true },
  metaDescription: { type: String, trim: true },
  readingTime: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

blogPostSchema.index({ status: 1, publishedAt: -1 });
blogPostSchema.index({ category: 1 });
blogPostSchema.index({ tags: 1 });

blogPostSchema.pre('save', function (next) {
  if (this.isModified('content')) {
    const words = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    this.readingTime = Math.max(1, Math.ceil(words / 200));
  }
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('BlogPost', blogPostSchema);