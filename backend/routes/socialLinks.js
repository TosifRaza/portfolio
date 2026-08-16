// const express = require('express');
// const router = express.Router();
// const {
//   getAllSocialLinks,
//   getSocialLinkById,
//   createSocialLink,
//   updateSocialLink,
//   deleteSocialLink,
// } = require('../controllers/socialLinkController');
// const auth = require('../middleware/auth');

// router.get('/', getAllSocialLinks);
// router.get('/:id', auth, getSocialLinkById);
// router.post('/', auth, createSocialLink);
// router.put('/:id', auth, updateSocialLink);
// router.delete('/:id', auth, deleteSocialLink);

// module.exports = router;
const express = require('express');
const router = express.Router();
const {
  getAllSocialLinks,
  getSocialLinkById,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} = require('../controllers/socialLinkController');
const auth = require('../middleware/auth');
const SocialLink = require('../models/SocialLink');

router.get('/', getAllSocialLinks);
router.get('/:id', auth, getSocialLinkById);
router.post('/', auth, createSocialLink);
router.put('/reorder', auth, async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ success: false, message: 'Items array required' });
    const bulkOps = items.map((item) => ({
      updateOne: { filter: { _id: item.id }, update: { $set: { order: item.order } } },
    }));
    await SocialLink.bulkWrite(bulkOps);
    res.json({ success: true, message: 'Reordered' });
  } catch (error) { next(error); }
});
router.put('/:id', auth, updateSocialLink);
router.delete('/:id', auth, deleteSocialLink);

module.exports = router;
