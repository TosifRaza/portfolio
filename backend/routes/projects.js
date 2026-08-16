// const express = require('express');
// const router = express.Router();
// const { getAllProjects, getProjectsPaginated, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectController');
// const auth = require('../middleware/auth');

// router.get('/', getAllProjects);
// router.get('/admin', auth, getProjectsPaginated);
// router.get('/:id', auth, getProjectById);
// router.post('/', auth, createProject);
// router.put('/:id', auth, updateProject);
// router.delete('/:id', auth, deleteProject);

// module.exports = router;
const express = require('express');
const router = express.Router();
const {
  getAllProjects, getProjectsPaginated, getProjectById,
  createProject, updateProject, deleteProject,
} = require('../controllers/projectController');
const auth = require('../middleware/auth');
const Project = require('../models/Project');

// Public
router.get('/', getAllProjects);

// Admin
router.get('/admin', auth, getProjectsPaginated);
router.get('/:id', auth, getProjectById);
router.post('/', auth, createProject);
// Reorder MUST come before /:id to avoid 'reorder' being captured as :id
router.put('/reorder', auth, async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ success: false, message: 'Items array required' });
    const bulkOps = items.map((item) => ({
      updateOne: { filter: { _id: item.id }, update: { $set: { order: item.order } } },
    }));
    await Project.bulkWrite(bulkOps);
    res.json({ success: true, message: 'Reordered' });
  } catch (error) { next(error); }
});
router.put('/:id', auth, updateProject);
router.patch('/:id/publish', auth, async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    project.status = project.status === 'planned' ? 'completed' : 'planned';
    await project.save();
    res.json({ success: true, data: project, message: `Project ${project.status === 'completed' ? 'published' : 'unpublished'}` });
  } catch (error) { next(error); }
});
router.patch('/:id/feature', auth, async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    project.featured = !project.featured;
    await project.save();
    res.json({ success: true, data: project, message: `Project ${project.featured ? 'featured' : 'unfeatured'}` });
  } catch (error) { next(error); }
});
router.delete('/:id', auth, deleteProject);

module.exports = router;
