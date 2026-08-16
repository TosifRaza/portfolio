// const Project = require('../models/Project');
// const { validateProject } = require('../validators/contentValidator');
// const { parsePaginationParams, buildPagination, escapeRegex, slugify } = require('../utils/helpers');

// const getAllProjects = async (req, res, next) => {
//   try {
//     const query = { isVisible: true };
//     const { category, featured } = req.query;

//     if (category) query.category = category;
//     if (featured === 'true') query.featured = true;

//     const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
//     res.json({ success: true, data: projects });
//   } catch (error) {
//     next(error);
//   }
// };

// const getProjectsPaginated = async (req, res, next) => {
//   try {
//     const { page, limit, sort, skip } = parsePaginationParams(req.query);
//     const { search, category, featured } = req.query;
//     const query = {};

//     if (search) {
//       query.$or = [
//         { title: { $regex: escapeRegex(search), $options: 'i' } },
//         { description: { $regex: escapeRegex(search), $options: 'i' } },
//       ];
//     }
//     if (category) query.category = category;
//     if (featured === 'true') query.featured = true;
//     if (featured === 'false') query.featured = false;

//     const [projects, total] = await Promise.all([
//       Project.find(query).sort(sort).skip(skip).limit(limit),
//       Project.countDocuments(query),
//     ]);

//     res.json({
//       success: true,
//       data: projects,
//       pagination: buildPagination(page, limit, total),
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const getProjectById = async (req, res, next) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) {
//       return res.status(404).json({ success: false, message: 'Project not found' });
//     }
//     res.json({ success: true, data: project });
//   } catch (error) {
//     next(error);
//   }
// };

// const createProject = async (req, res, next) => {
//   try {
//     const { valid, errors } = validateProject(req.body);
//     if (!valid) {
//       return res.status(400).json({ success: false, message: 'Validation failed', errors });
//     }

//     const slug = slugify(req.body.title) || `project-${Date.now()}`;
//     const project = await Project.create({ ...req.body, slug });
//     res.status(201).json({ success: true, data: project });
//   } catch (error) {
//     next(error);
//   }
// };

// const updateProject = async (req, res, next) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) {
//       return res.status(404).json({ success: false, message: 'Project not found' });
//     }

//     const updateData = { ...req.body };
//     if (req.body.title && req.body.title !== project.title) {
//       updateData.slug = slugify(req.body.title) || `project-${Date.now()}`;
//     }

//     const updated = await Project.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//       runValidators: true,
//     });

//     res.json({ success: true, data: updated });
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteProject = async (req, res, next) => {
//   try {
//     const project = await Project.findByIdAndDelete(req.params.id);
//     if (!project) {
//       return res.status(404).json({ success: false, message: 'Project not found' });
//     }
//     res.json({ success: true, message: 'Project deleted', data: project });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   getAllProjects,
//   getProjectsPaginated,
//   getProjectById,
//   createProject,
//   updateProject,
//   deleteProject,
// };
const Project = require('../models/Project');
const { validateProject } = require('../validators/contentValidator');
const { parsePaginationParams, buildPagination, escapeRegex, slugify } = require('../utils/helpers');

const getAllProjects = async (req, res, next) => {
  try {
    const query = {};
    const { category, featured } = req.query;

    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

const getProjectsPaginated = async (req, res, next) => {
  try {
    const { page, limit, sort, skip } = parsePaginationParams(req.query);
    const { search, category, featured } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: escapeRegex(search), $options: 'i' } },
        { description: { $regex: escapeRegex(search), $options: 'i' } },
      ];
    }
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    if (featured === 'false') query.featured = false;

    const [projects, total] = await Promise.all([
      Project.find(query).sort(sort).skip(skip).limit(limit),
      Project.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: projects,
      pagination: buildPagination(page, limit, total),
    });
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const { valid, errors } = validateProject(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    const slug = slugify(req.body.title) || `project-${Date.now()}`;
    const project = await Project.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const updateData = { ...req.body };
    if (req.body.title && req.body.title !== project.title) {
      updateData.slug = slugify(req.body.title) || `project-${Date.now()}`;
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, message: 'Project deleted', data: project });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProjects,
  getProjectsPaginated,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
