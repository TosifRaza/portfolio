const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'Portfolio', trim: true, maxlength: 100 },
  siteDescription: { type: String, default: '', maxlength: 500 },
  siteUrl: { type: String, default: '' },
  logo: { type: String, default: '' },
  favicon: { type: String, default: '' },
  primaryColor: { type: String, default: '#6366f1' },
  accentColor: { type: String, default: '#06b6d4' },
  darkMode: { type: Boolean, default: true },
  seo: {
    defaultTitle: { type: String, default: 'Portfolio' },
    titleTemplate: { type: String, default: '%s | Portfolio' },
    defaultDescription: { type: String, default: '' },
    defaultKeywords: { type: String, default: '' },
    ogImage: { type: String, default: '' },
  },
  contact: {
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    mapEmbedUrl: { type: String, default: '' },
  },
  social: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
  },
  footer: {
    text: { type: String, default: '' },
    copyrightText: { type: String, default: '' },
    showSocial: { type: Boolean, default: true },
  },
  hero: {
    greeting: { type: String, default: 'Hello, I\'m' },
    ctaText: { type: String, default: 'View My Work' },
    ctaLink: { type: String, default: '#projects' },
    secondaryCtaText: { type: String, default: 'Get In Touch' },
    secondaryCtaLink: { type: String, default: '#contact' },
    showResumeButton: { type: Boolean, default: true },
  },
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);