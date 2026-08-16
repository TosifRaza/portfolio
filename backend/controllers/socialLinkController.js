const SocialLink = require('../models/SocialLink');
const { validateSocialLink } = require('../validators/contentValidator');

const getAllSocialLinks = async (req, res, next) => {
  try {
    const query = { isVisible: true };
    const links = await SocialLink.find(query).sort({ order: 1 });
    res.json({ success: true, data: links });
  } catch (error) {
    next(error);
  }
};

const getSocialLinkById = async (req, res, next) => {
  try {
    const link = await SocialLink.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ success: false, message: 'Social link not found' });
    }
    res.json({ success: true, data: link });
  } catch (error) {
    next(error);
  }
};

const createSocialLink = async (req, res, next) => {
  try {
    const { valid, errors } = validateSocialLink(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    const link = await SocialLink.create(req.body);
    res.status(201).json({ success: true, data: link });
  } catch (error) {
    next(error);
  }
};

const updateSocialLink = async (req, res, next) => {
  try {
    const link = await SocialLink.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ success: false, message: 'Social link not found' });
    }

    const updated = await SocialLink.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

const deleteSocialLink = async (req, res, next) => {
  try {
    const link = await SocialLink.findByIdAndDelete(req.params.id);
    if (!link) {
      return res.status(404).json({ success: false, message: 'Social link not found' });
    }
    res.json({ success: true, message: 'Social link deleted', data: link });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSocialLinks,
  getSocialLinkById,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
};
