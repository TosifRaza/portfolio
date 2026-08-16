// const express = require('express');
// const router = express.Router();
// const { getSections, getAllSections, updateSection, bulkUpdateSections } = require('../controllers/sectionController');
// const auth = require('../middleware/auth');

// // Public: get enabled sections in order
// router.get('/', getSections);

// // Admin
// router.get('/admin/all', auth, getAllSections);
// router.put('/:id', auth, updateSection);
// router.put('/bulk', auth, bulkUpdateSections);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { getSections, getAllSections, updateSection, bulkUpdateSections } = require('../controllers/sectionController');
const auth = require('../middleware/auth');
const Section = require('../models/Section');

// Public: get enabled sections in order
router.get('/', getSections);

// Admin
router.get('/admin/all', auth, getAllSections);
router.put('/', auth, async (req, res, next) => {
  try {
    // Admin sends an array of section objects to replace all sections
    const sections = req.body;
    if (!Array.isArray(sections)) return res.status(400).json({ success: false, message: 'Array of sections required' });
    await Section.deleteMany({});
    await Section.insertMany(sections);
    res.json({ success: true, message: 'Sections updated' });
  } catch (error) { next(error); }
});
router.put('/reorder', auth, async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ success: false, message: 'Items array required' });
    const bulkOps = items.map((item) => ({
      updateOne: { filter: { _id: item.id }, update: { $set: { order: item.order } } },
    }));
    await Section.bulkWrite(bulkOps);
    res.json({ success: true, message: 'Reordered' });
  } catch (error) { next(error); }
});
router.put('/:id', auth, updateSection);
router.put('/bulk', auth, bulkUpdateSections);

module.exports = router;
