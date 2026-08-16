// const mongoose = require('mongoose');

// const profileSchema = new mongoose.Schema({
//   firstName: { type: String, required: [true, 'First name is required'], trim: true, maxlength: 50 },
//   lastName: { type: String, required: [true, 'Last name is required'], trim: true, maxlength: 50 },
//   title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 100 },
//   bio: { type: String, required: [true, 'Bio is required'], maxlength: 2000 },
//   shortBio: { type: String, maxlength: 300, default: '' },
//   avatar: { type: String, default: '' },
//   resumeUrl: { type: String, default: '' },
//   dateOfBirth: { type: Date },
//   location: { type: String, trim: true, maxlength: 100 },
//   phone: { type: String, trim: true },
//   email: { type: String, lowercase: true, trim: true },
//   website: { type: String, trim: true },
//   yearsOfExperience: { type: Number, default: 0, min: 0 },
//   availableForHire: { type: Boolean, default: true },
//   languages: [{ type: String, trim: true }],
//   interests: [{ type: String, trim: true }],
// }, { timestamps: true });

// module.exports = mongoose.model('Profile', profileSchema);
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 100 },
  title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 100 },
  subtitle: { type: String, trim: true, maxlength: 150, default: '' },
  bio: { type: String, required: [true, 'Bio is required'], maxlength: 2000 },
  shortBio: { type: String, maxlength: 300, default: '' },
  description: { type: String, maxlength: 1000, default: '' },
  careerObjective: { type: String, maxlength: 500, default: '' },
  location: { type: String, trim: true, maxlength: 100, default: '' },
  availability: { type: String, enum: ['available', 'unavailable', 'busy'], default: 'available' },
  avatar: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  dateOfBirth: { type: Date },
  phone: { type: String, trim: true },
  email: { type: String, lowercase: true, trim: true },
  website: { type: String, trim: true },
  yearsOfExperience: { type: Number, default: 0, min: 0 },
  availableForHire: { type: Boolean, default: true },
  highlights: [{ text: String, icon: String }],
  statistics: [{ label: String, value: String, icon: String }],
  languages: [{ type: String, trim: true }],
  interests: [{ type: String, trim: true }],
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
