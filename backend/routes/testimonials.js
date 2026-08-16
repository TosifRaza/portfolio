// const express = require('express');
// const router = express.Router();
// const { getAllTestimonials, getTestimonialsPaginated, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialController');
// const auth = require('../middleware/auth');

// router.get('/', getAllTestimonials);
// router.get('/admin', auth, getTestimonialsPaginated);
// router.get('/:id', auth, getTestimonialById);
// router.post('/', auth, createTestimonial);
// router.put('/:id', auth, updateTestimonial);
// router.delete('/:id', auth, deleteTestimonial);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { getAllTestimonials, getTestimonialsPaginated, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialController');
const auth = require('../middleware/auth');
const Testimonial = require('../models/Testimonial');

router.get('/', getAllTestimonials);
router.get('/admin', auth, getTestimonialsPaginated);
router.get('/:id', auth, getTestimonialById);
router.post('/', auth, createTestimonial);
router.put('/reorder', auth, async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ success: false, message: 'Items array required' });
    const bulkOps = items.map((item) => ({
      updateOne: { filter: { _id: item.id }, update: { $set: { order: item.order } } },
    }));
    await Testimonial.bulkWrite(bulkOps);
    res.json({ success: true, message: 'Reordered' });
  } catch (error) { next(error); }
});
router.put('/:id', auth, updateTestimonial);
router.delete('/:id', auth, deleteTestimonial);

module.exports = router;
