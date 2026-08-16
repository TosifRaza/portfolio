const Skill = require('../models/Skill');
const { validateSkill } = require('../validators/contentValidator');
const { parsePaginationParams, buildPagination, escapeRegex } = require('../utils/helpers');

const getAllSkills = async (req, res, next) => {
  try {
    const { category, visible } = req.query;
    const query = {};

    if (category) query.category = category;
    if (visible === 'true') query.isVisible = true;

    const skills = await Skill.find(query).sort({ order: 1, name: 1 });
    res.json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
};

const getSkillsPaginated = async (req, res, next) => {
  try {
    const { page, limit, sort, skip } = parsePaginationParams(req.query);
    const { search, category } = req.query;
    const query = {};

    if (search) {
      query.name = { $regex: escapeRegex(search), $options: 'i' };
    }
    if (category) query.category = category;

    const [skills, total] = await Promise.all([
      Skill.find(query).sort(sort).skip(skip).limit(limit),
      Skill.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: skills,
      pagination: buildPagination(page, limit, total),
    });
  } catch (error) {
    next(error);
  }
};

const getSkillById = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
};

const createSkill = async (req, res, next) => {
  try {
    const { valid, errors } = validateSkill(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
};

const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    const updateData = { ...req.body };
    if (updateData.proficiency !== undefined) {
      updateData.proficiency = Math.max(0, Math.min(100, Number(updateData.proficiency)));
    }

    const updated = await Skill.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.json({ success: true, message: 'Skill deleted', data: skill });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSkills,
  getSkillsPaginated,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};
