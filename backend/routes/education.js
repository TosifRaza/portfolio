// const express = require('express');
// const router = express.Router();
// const { getAllEducation, getEducationPaginated, getEducationById, createEducation, updateEducation, deleteEducation } = require('../controllers/educationController');
// const auth = require('../middleware/auth');

// router.get('/', getAllEducation);
// router.get('/admin', auth, getEducationPaginated);
// router.get('/:id', auth, getEducationById);
// router.post('/', auth, createEducation);
// router.put('/:id', auth, updateEducation);
// router.delete('/:id', auth, deleteEducation);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { getAllEducation, getEducationPaginated, getEducationById, createEducation, updateEducation, deleteEducation } = require('../controllers/educationController');
const auth = require('../middleware/auth');
const Education = require('../models/Education');

router.get('/', getAllEducation);
router.get('/admin', auth, getEducationPaginated);
router.get('/:id', auth, getEducationById);
router.post('/', auth, createEducation);
router.put('/reorder', auth, async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ success: false, message: 'Items array required' });
    const bulkOps = items.map((item) => ({
      updateOne: { filter: { _id: item.id }, update: { $set: { order: item.order } } },
    }));
    await Education.bulkWrite(bulkOps);
    res.json({ success: true, message: 'Reordered' });
  } catch (error) { next(error); }
});
router.put('/:id', auth, updateEducation);
router.delete('/:id', auth, deleteEducation);

module.exports = router;
