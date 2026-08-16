// const { Router } = require('express');
// const { contactLimiter } = require('../middleware/rateLimiter');
// const contactController = require('../controllers/contactController');
// const { messageLimiter } = require('../middleware/rateLimiter');
// const router = Router();

// router.post('/', contactLimiter, contactController.submitContact);

// module.exports = router;
const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const contactController = require('../controllers/contactController');

const router = Router();

// Inline rate limiter — avoids import mismatches across versions
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many messages sent. Please try again after an hour.',
  },
});

router.post('/', contactLimiter, contactController.submitContact);

module.exports = router;
