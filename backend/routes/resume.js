const express = require('express');
const router = express.Router();
const { getResume, updateResume } = require('../controllers/resumeController');
const auth = require('../middleware/auth');

router.get('/', getResume);
router.put('/', auth, updateResume);

module.exports = router;
