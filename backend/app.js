// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const path = require('path');
// const { apiLimiter } = require('./middleware/rateLimiter');
// const errorHandler = require('./middleware/errorHandler');

// const authRoutes = require('./routes/auth');
// const profileRoutes = require('./routes/profile');
// const skillRoutes = require('./routes/skills');
// const projectRoutes = require('./routes/projects');
// const experienceRoutes = require('./routes/experience');
// const educationRoutes = require('./routes/education');
// const serviceRoutes = require('./routes/services');
// const testimonialRoutes = require('./routes/testimonials');
// const blogRoutes = require('./routes/blog');
// const messageRoutes = require('./routes/messages');
// const socialLinkRoutes = require('./routes/socialLinks');
// const settingsRoutes = require('./routes/settings');
// const sectionRoutes = require('./routes/sections');
// const resumeRoutes = require('./routes/resume');
// const uploadRoutes = require('./routes/upload');
// const analyticsRoutes = require('./routes/analytics');
// const dashboardRoutes = require('./routes/dashboard');
// const contactRoutes = require('./routes/contact');

// const app = express();

// // Security headers
// app.use(helmet({
//   crossOriginResourcePolicy: false,
//   contentSecurityPolicy: process.env.NODE_ENV === 'production'
//     ? undefined
//     : false,
// }));

// // CORS
// app.use(cors({
//   origin: process.env.CORS_ORIGIN
//     ? process.env.CORS_ORIGIN.split(',')
//     : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
// }));

// // Body parsing
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Rate limiter — only for public contact/analytics (admin is exempt via auth)

// // Static files for uploads
// const uploadDir = process.env.UPLOAD_DEST || './uploads';
// app.use('/uploads', express.static(path.join(__dirname, uploadDir)));

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Portfolio CMS API is running',
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV || 'development',
//   });
// });

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/profile', profileRoutes);
// app.use('/api/skills', skillRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/experience', experienceRoutes);
// app.use('/api/education', educationRoutes);
// app.use('/api/services', serviceRoutes);
// app.use('/api/testimonials', testimonialRoutes);
// app.use('/api/blog', blogRoutes);
// app.use('/api/messages', messageRoutes);
// app.use('/api/social-links', socialLinkRoutes);
// app.use('/api/settings', settingsRoutes);
// app.use('/api/sections', sectionRoutes);
// app.use('/api/resume', resumeRoutes);
// app.use('/api/upload', uploadRoutes);
// app.use('/api/analytics', analyticsRoutes);
// app.use('/api/dashboard', dashboardRoutes);
// app.use('/api/contact', contactRoutes);

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route ${req.originalUrl} not found`,
//   });
// });

// // Global error handler
// app.use(errorHandler);

// module.exports = app;
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { apiLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const skillRoutes = require('./routes/skills');
const projectRoutes = require('./routes/projects');
const experienceRoutes = require('./routes/experience');
const educationRoutes = require('./routes/education');
const serviceRoutes = require('./routes/services');
const testimonialRoutes = require('./routes/testimonials');
const blogRoutes = require('./routes/blog');
const messageRoutes = require('./routes/messages');
const socialLinkRoutes = require('./routes/socialLinks');
const settingsRoutes = require('./routes/settings');
const sectionRoutes = require('./routes/sections');
const resumeRoutes = require('./routes/resume');
const uploadRoutes = require('./routes/upload');
const analyticsRoutes = require('./routes/analytics');
const dashboardRoutes = require('./routes/dashboard');
const contactRoutes = require('./routes/contact');

const app = express();

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: process.env.NODE_ENV === 'production'
    ? undefined
    : false,
}));

// CORS — allow all origins in production; localhost in development
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? true // reflect requesting origin
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiter — only for public contact/analytics (admin is exempt via auth)

// Static files for uploads
const uploadDir = process.env.UPLOAD_DEST || './uploads';
app.use('/uploads', express.static(path.join(__dirname, uploadDir)));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio CMS API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/social-links', socialLinkRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/contact', contactRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use(errorHandler);

module.exports = app;
