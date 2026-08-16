// const express = require('express');
// const router = express.Router();
// const { register, login, getMe, updatePassword, updateProfile } = require('../controllers/authController');
// const auth = require('../middleware/auth');
// const { authLimiter } = require('../middleware/rateLimiter');

// router.post('/register', authLimiter, register);
// router.post('/login', authLimiter, login);
// router.get('/me', auth, getMe);
// router.put('/update-password', auth, updatePassword);
// router.put('/update-profile', auth, updateProfile);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { register, login, getMe, updatePassword, updateProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.get('/me', auth, getMe);
router.put('/update-password', auth, updatePassword);
router.put('/update-profile', auth, updateProfile);
// Alias for admin frontend
router.put('/profile', auth, updateProfile);

module.exports = router;
