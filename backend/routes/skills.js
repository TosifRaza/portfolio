// const express = require('express');
// const router = express.Router();
// const { getAllSkills, getSkillsPaginated, getSkillById, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
// const auth = require('../middleware/auth');

// router.get('/', getAllSkills);
// router.get('/admin', auth, getSkillsPaginated);
// router.get('/:id', auth, getSkillById);
// router.post('/', auth, createSkill);
// router.put('/:id', auth, updateSkill);
// router.delete('/:id', auth, deleteSkill);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { getAllSkills, getSkillsPaginated, getSkillById, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
const auth = require('../middleware/auth');
const Skill = require('../models/Skill');

router.get('/', getAllSkills);
router.get('/admin', auth, getSkillsPaginated);
router.get('/:id', auth, getSkillById);
router.post('/', auth, createSkill);
router.put('/reorder', auth, async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ success: false, message: 'Items array required' });
    const bulkOps = items.map((item) => ({
      updateOne: { filter: { _id: item.id }, update: { $set: { order: item.order } } },
    }));
    await Skill.bulkWrite(bulkOps);
    res.json({ success: true, message: 'Reordered' });
  } catch (error) { next(error); }
});
router.put('/:id', auth, updateSkill);
router.delete('/:id', auth, deleteSkill);

module.exports = router;
