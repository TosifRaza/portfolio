const { Router } = require('express');
const { protect } = require('../middleware/auth');

const authRoutes = require('./auth');
const profileRoutes = require('./profile');
const skillsRoutes = require('./skills');
const projectsRoutes = require('./projects');
const experienceRoutes = require('./experience');
const educationRoutes = require('./education');
const servicesRoutes = require('./services');
const testimonialsRoutes = require('./testimonials');
const blogRoutes = require('./blog');
const messagesRoutes = require('./messages');
const contactRoutes = require('./contact');
const socialLinksRoutes = require('./socialLinks');
const settingsRoutes = require('./settings');
const sectionsRoutes = require('./sections');
const resumeRoutes = require('./resume');
const analyticsRoutes = require('./analytics');

const router = Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/skills', skillsRoutes);
router.use('/projects', projectsRoutes);
router.use('/experience', experienceRoutes);
router.use('/education', educationRoutes);
router.use('/services', servicesRoutes);
router.use('/testimonials', testimonialsRoutes);
router.use('/blog', blogRoutes);
router.use('/messages', protect, messagesRoutes);
router.use('/contact', contactRoutes);
router.use('/social-links', socialLinksRoutes);
router.use('/settings', settingsRoutes);
router.use('/sections', sectionsRoutes);
router.use('/resume', resumeRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;
