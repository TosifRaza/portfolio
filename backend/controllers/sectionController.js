const Section = require('../models/Section');

// Public: get enabled sections in order
const getSections = async (req, res, next) => {
  try {
    const sections = await Section.find({ enabled: true })
      .sort({ order: 1 })
      // .select('sectionId label enabled order visibility settings');
      .select('sectionId title enabled order visibility customClass');
    res.json({ success: true, data: sections });
  } catch (error) {
    next(error);
  }
};

// Admin: get all sections
const getAllSections = async (req, res, next) => {
  try {
    const sections = await Section.find().sort({ order: 1 });
    res.json({ success: true, data: sections });
  } catch (error) {
    next(error);
  }
};

// Admin: update single section
const updateSection = async (req, res, next) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }

    const updated = await Section.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// Admin: bulk update sections (order and enabled state)
const bulkUpdateSections = async (req, res, next) => {
  try {
    const { sections } = req.body;
    if (!sections || !Array.isArray(sections)) {
      return res.status(400).json({ success: false, message: 'sections array is required' });
    }

    const operations = sections.map((section) => {
      if (!section.sectionId) return null;
      return {
        updateOne: {
          filter: { sectionId: section.sectionId },
          update: {
            $set: {
              ...(section.enabled !== undefined && { enabled: section.enabled }),
              ...(section.order !== undefined && { order: section.order }),
              ...(section.visibility !== undefined && { visibility: section.visibility }),
              ...(section.label !== undefined && { label: section.label }),
              ...(section.settings !== undefined && { settings: section.settings }),
            },
          },
          upsert: true,
        },
      };
    }).filter(Boolean);

    if (operations.length === 0) {
      return res.status(400).json({ success: false, message: 'No valid sections provided' });
    }

    await Section.bulkWrite(operations);

    const updated = await Section.find().sort({ order: 1 });
    res.json({
      success: true,
      message: `${operations.length} sections updated`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSections, getAllSections, updateSection, bulkUpdateSections };
