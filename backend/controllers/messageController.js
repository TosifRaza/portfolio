const Message = require('../models/Message');
const { validateMessage } = require('../validators/contentValidator');
const { parsePaginationParams, buildPagination, escapeRegex } = require('../utils/helpers');

// Public: submit contact message
const submitMessage = async (req, res, next) => {
  try {
    const { valid, errors } = validateMessage(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    const messageData = {
      ...req.body,
      ipAddress: req.ip || req.connection.remoteAddress || '',
      userAgent: req.get('User-Agent') || '',
    };

    const message = await Message.create(messageData);
    res.status(201).json({
      success: true,
      message: 'Message sent successfully. We will get back to you soon!',
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: get all messages with filters
const getAllMessages = async (req, res, next) => {
  try {
    const { page, limit, sort, skip } = parsePaginationParams(req.query);
    const { status, search } = req.query;
    const query = {};

    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: escapeRegex(search), $options: 'i' } },
        { email: { $regex: escapeRegex(search), $options: 'i' } },
        { subject: { $regex: escapeRegex(search), $options: 'i' } },
        { message: { $regex: escapeRegex(search), $options: 'i' } },
      ];
    }

    const [messages, total] = await Promise.all([
      Message.find(query).sort(sort).skip(skip).limit(limit),
      Message.countDocuments(query),
    ]);

    // Count by status
    const statusCounts = await Message.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      data: messages,
      pagination: buildPagination(page, limit, total),
      statusCounts: statusCounts.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
    });
  } catch (error) {
    next(error);
  }
};

// Admin: get single message
const getMessageById = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};

// Admin: update message status
const updateMessageStatus = async (req, res, next) => {
  try {
    const { status, reply } = req.body;

    if (status && !['unread', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (reply !== undefined) {
      updateData.reply = reply;
      updateData.repliedAt = new Date();
      if (status === undefined) updateData.status = 'replied';
    }

    const updated = await Message.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// Admin: delete message
const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, message: 'Message deleted', data: message });
  } catch (error) {
    next(error);
  }
};

// Admin: bulk delete
const bulkDeleteMessages = async (req, res, next) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'ids array is required' });
    }

    const result = await Message.deleteMany({ _id: { $in: ids } });
    res.json({
      success: true,
      message: `${result.deletedCount} messages deleted`,
      data: { deletedCount: result.deletedCount },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitMessage,
  getAllMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage,
  bulkDeleteMessages,
};
