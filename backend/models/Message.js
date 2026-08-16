const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 100 },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
  },
  subject: { type: String, required: [true, 'Subject is required'], trim: true, maxlength: 300 },
  message: { type: String, required: [true, 'Message is required'], maxlength: 5000 },
  phone: { type: String, trim: true },
  status: { type: String, enum: ['unread', 'read', 'replied', 'archived'], default: 'unread' },
  notes: { type: String, default: '' },
  ip: { type: String, default: '' },
  userAgent: { type: String, default: '' },
}, { timestamps: true });

messageSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);