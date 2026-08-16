const Message = require('../models/Message');

// ------------------------------------------------------------------
// Helper: strip HTML tags
// ------------------------------------------------------------------
function sanitize(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/<[^>]*>/g, '');
}

function sanitizeObject(obj) {
  const sanitized = {};
  for (const key of Object.keys(obj)) {
    sanitized[key] = sanitize(obj[key]);
  }
  return sanitized;
}

// ------------------------------------------------------------------
// Public contact form submission (rate limited at route level)
// ------------------------------------------------------------------
const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = sanitizeObject(req.body);

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, subject, and message are required',
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    const msg = await Message.create({ name, email, subject, message, status: 'unread' });

    return res.status(201).json({
      success: true,
      data: msg,
      message: 'Message sent successfully. We\'ll get back to you soon!',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  submitContact,
};
