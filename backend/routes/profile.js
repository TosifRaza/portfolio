// const express = require('express');
// const router = express.Router();
// const { getProfile, updateProfile } = require('../controllers/profileController');
// const auth = require('../middleware/auth');

// router.get('/', getProfile);
// router.put('/', auth, updateProfile);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');

router.get('/', getProfile);
router.put('/', auth, updateProfile);
router.put('/statistics', auth, async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
    if (req.body.statistics) profile.statistics = req.body.statistics;
    if (req.body.yearsOfExperience !== undefined) profile.yearsOfExperience = req.body.yearsOfExperience;
    if (req.body.projectsCompleted !== undefined) profile.projectsCompleted = req.body.projectsCompleted;
    if (req.body.clientsServed !== undefined) profile.clientsServed = req.body.clientsServed;
    await profile.save();
    res.json({ success: true, data: profile });
  } catch (error) { next(error); }
});
router.put('/highlights', auth, async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
    if (req.body.highlights) profile.highlights = req.body.highlights;
    await profile.save();
    res.json({ success: true, data: profile });
  } catch (error) { next(error); }
});

module.exports = router;
