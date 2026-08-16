// ------------------------------------------------------------------
// Central application configuration — all values sourced from env
// with sensible defaults for a portfolio project.
// ------------------------------------------------------------------

const config = {
  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // CORS — allow comma-separated origins in production
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',

  // MongoDB
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'change-me-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
};

// Derived helpers
config.isDev = config.NODE_ENV === 'development';
config.isProd = config.NODE_ENV === 'production';
config.corsOrigins = config.isProd
  ? config.CLIENT_ORIGIN.split(',').map((o) => o.trim())
  : [config.CLIENT_ORIGIN];

module.exports = config;
