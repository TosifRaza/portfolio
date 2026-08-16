// const express = require('express');
// const router = express.Router();
// const { getAllServices, getServicesPaginated, getServiceById, createService, updateService, deleteService } = require('../controllers/serviceController');
// const auth = require('../middleware/auth');

// router.get('/', getAllServices);
// router.get('/admin', auth, getServicesPaginated);
// router.get('/:id', auth, getServiceById);
// router.post('/', auth, createService);
// router.put('/:id', auth, updateService);
// router.delete('/:id', auth, deleteService);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { getAllServices, getServicesPaginated, getServiceById, createService, updateService, deleteService } = require('../controllers/serviceController');
const auth = require('../middleware/auth');
const Service = require('../models/Service');

router.get('/', getAllServices);
router.get('/admin', auth, getServicesPaginated);
router.get('/:id', auth, getServiceById);
router.post('/', auth, createService);
router.put('/reorder', auth, async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ success: false, message: 'Items array required' });
    const bulkOps = items.map((item) => ({
      updateOne: { filter: { _id: item.id }, update: { $set: { order: item.order } } },
    }));
    await Service.bulkWrite(bulkOps);
    res.json({ success: true, message: 'Reordered' });
  } catch (error) { next(error); }
});
router.put('/:id', auth, updateService);
router.delete('/:id', auth, deleteService);

module.exports = router;
