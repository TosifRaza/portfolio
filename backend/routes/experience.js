// const express = require('express');
// const router = express.Router();
// const { getAllExperience, getExperiencePaginated, getExperienceById, createExperience, updateExperience, deleteExperience } = require('../controllers/experienceController');
// const auth = require('../middleware/auth');

// router.get('/', getAllExperience);
// router.get('/admin', auth, getExperiencePaginated);
// router.get('/:id', auth, getExperienceById);
// router.post('/', auth, createExperience);
// router.put('/:id', auth, updateExperience);
// router.delete('/:id', auth, deleteExperience);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { getAllExperience, getExperiencePaginated, getExperienceById, createExperience, updateExperience, deleteExperience } = require('../controllers/experienceController');
const auth = require('../middleware/auth');
const Experience = require('../models/Experience');

router.get('/', getAllExperience);
router.get('/admin', auth, getExperiencePaginated);
router.get('/:id', auth, getExperienceById);
router.post('/', auth, createExperience);
router.put('/reorder', auth, async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ success: false, message: 'Items array required' });
    const bulkOps = items.map((item) => ({
      updateOne: { filter: { _id: item.id }, update: { $set: { order: item.order } } },
    }));
    await Experience.bulkWrite(bulkOps);
    res.json({ success: true, message: 'Reordered' });
  } catch (error) { next(error); }
});
router.put('/:id', auth, updateExperience);
router.delete('/:id', auth, deleteExperience);

module.exports = router;
