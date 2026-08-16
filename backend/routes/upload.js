const express = require('express');
const router = express.Router();
const { uploadFile, uploadSingleFile, deleteFile } = require('../controllers/uploadController');
const auth = require('../middleware/auth');
const { uploadLimiter } = require('../middleware/rateLimiter');

router.post('/', auth, uploadLimiter, uploadFile);
router.post('/single', auth, uploadLimiter, uploadSingleFile);
router.delete('/', auth, deleteFile);

module.exports = router;
