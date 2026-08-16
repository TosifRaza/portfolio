// const express = require('express');
// const router = express.Router();
// const { trackPageView, getAnalytics } = require('../controllers/analyticsController');
// const auth = require('../middleware/auth');
// const { analyticsLimiter } = require('../middleware/rateLimiter');

// // Public: track page view
// router.post('/track', analyticsLimiter, trackPageView);

// // Admin: get analytics stats
// router.get('/', auth, getAnalytics);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { trackPageView, getAnalytics } = require('../controllers/analyticsController');
const auth = require('../middleware/auth');
const { analyticsLimiter } = require('../middleware/rateLimiter');
const Dashboard = require('../controllers/dashboardController');

// Public: track page view
router.post('/track', analyticsLimiter, trackPageView);

// Admin: get analytics stats
router.get('/', auth, getAnalytics);
router.get('/dashboard', auth, Dashboard.getStats);

module.exports = router;
