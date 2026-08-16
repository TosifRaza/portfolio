// // const express = require('express');
// // const router = express.Router();
// // const {
// //   submitMessage,
// //   getAllMessages,
// //   getMessageById,
// //   updateMessageStatus,
// //   deleteMessage,
// //   bulkDeleteMessages,
// // } = require('../controllers/messageController');
// // const auth = require('../middleware/auth');
// // const { messageLimiter } = require('../middleware/rateLimiter');

// // // Public
// // router.post('/', messageLimiter, submitMessage);

// // // Admin
// // router.get('/', auth, getAllMessages);
// // router.get('/:id', auth, getMessageById);
// // router.put('/:id/status', auth, updateMessageStatus);
// // router.delete('/:id', auth, deleteMessage);
// // router.post('/bulk/delete', auth, bulkDeleteMessages);

// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const Message = require('../models/Message');
// const {
//   submitMessage,
//   getAllMessages,
//   getMessageById,
//   updateMessageStatus,
//   deleteMessage,
//   bulkDeleteMessages,
// } = require('../controllers/messageController');
// const auth = require('../middleware/auth');
// const { messageLimiter } = require('../middleware/rateLimiter');

// // Public
// router.post('/', messageLimiter, submitMessage);

// // Admin
// router.get('/counts', auth, async (req, res) => {
//   try {
//     const unread = await Message.countDocuments({ status: 'unread' });
//     const total = await Message.countDocuments();
//     res.json({ success: true, data: { unread, total } });
//   } catch (e) {
//     res.status(500).json({ success: false, message: e.message });
//   }
// });
// router.get('/', auth, getAllMessages);
// router.get('/:id', auth, getMessageById);
// router.put('/:id/status', auth, updateMessageStatus);
// router.delete('/:id', auth, deleteMessage);
// router.post('/bulk/delete', auth, bulkDeleteMessages);

// module.exports = router;
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const {
  submitMessage,
  getAllMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage,
  bulkDeleteMessages,
} = require('../controllers/messageController');
const auth = require('../middleware/auth');
const { messageLimiter } = require('../middleware/rateLimiter');

// Public
router.post('/', messageLimiter, submitMessage);

// Admin
router.get('/counts', auth, async (req, res) => {
  try {
    const unread = await Message.countDocuments({ status: 'unread' });
    const total = await Message.countDocuments();
    res.json({ success: true, data: { unread, total } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});
router.get('/', auth, getAllMessages);
router.get('/:id', auth, getMessageById);
router.put('/:id/status', auth, updateMessageStatus);
router.put('/:id/reply', auth, async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
    message.reply = req.body.reply || '';
    message.status = 'replied';
    await message.save();
    res.json({ success: true, data: message });
  } catch (error) { next(error); }
});
router.delete('/:id', auth, deleteMessage);
router.post('/bulk/delete', auth, bulkDeleteMessages);

module.exports = router;
