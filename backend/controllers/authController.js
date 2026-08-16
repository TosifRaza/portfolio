// const jwt = require('jsonwebtoken');
// const Admin = require('../models/Admin');
// const { validateRegister, validateLogin, validateUpdatePassword } = require('../validators/authValidator');

// generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN || '7d',
//   });
// };

// const register = async (req, res, next) => {
//   try {
//     // Only allow first admin registration
//     const adminCount = await Admin.countDocuments();
//     if (adminCount > 0) {
//       return res.status(403).json({
//         success: false,
//         message: 'Registration is disabled. An admin already exists.',
//       });
//     }

//     const { valid, errors } = validateRegister(req.body);
//     if (!valid) {
//       return res.status(400).json({ success: false, message: 'Validation failed', errors });
//     }

//     const { name, email, password } = req.body;

//     const admin = await Admin.create({ name, email, password });
//     const token = generateToken(admin._id);

//     res.status(201).json({
//       success: true,
//       message: 'Admin registered successfully',
//       data: { admin, token },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const login = async (req, res, next) => {
//   try {
//     const { valid, errors } = validateLogin(req.body);
//     if (!valid) {
//       return res.status(400).json({ success: false, message: 'Validation failed', errors });
//     }

//     const { email, password } = req.body;

//     const admin = await Admin.findOne({ email }).select('+password');
//     if (!admin) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid email or password',
//       });
//     }

//     if (!admin.isActive) {
//       return res.status(403).json({
//         success: false,
//         message: 'Account has been deactivated',
//       });
//     }

//     const isMatch = await admin.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid email or password',
//       });
//     }

//     admin.lastLogin = new Date();
//     await admin.save({ validateBeforeSave: false });

//     const token = generateToken(admin._id);

//     res.json({
//       success: true,
//       message: 'Login successful',
//       data: { admin, token },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const getMe = async (req, res, next) => {
//   try {
//     const admin = await Admin.findById(req.admin._id);
//     if (!admin) {
//       return res.status(404).json({
//         success: false,
//         message: 'Admin not found',
//       });
//     }
//     res.json({ success: true, data: admin });
//   } catch (error) {
//     next(error);
//   }
// };

// const updatePassword = async (req, res, next) => {
//   try {
//     const { valid, errors } = validateUpdatePassword(req.body);
//     if (!valid) {
//       return res.status(400).json({ success: false, message: 'Validation failed', errors });
//     }

//     const { currentPassword, newPassword } = req.body;

//     const admin = await Admin.findById(req.admin._id).select('+password');
//     if (!admin) {
//       return res.status(404).json({
//         success: false,
//         message: 'Admin not found',
//       });
//     }

//     const isMatch = await admin.comparePassword(currentPassword);
//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: 'Current password is incorrect',
//       });
//     }

//     admin.password = newPassword;
//     await admin.save();

//     const token = generateToken(admin._id);

//     res.json({
//       success: true,
//       message: 'Password updated successfully',
//       data: { token },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const updateProfile = async (req, res, next) => {
//   try {
//     const { name, avatar } = req.body;
//     const updateData = {};
//     if (name) updateData.name = name;
//     if (avatar !== undefined) updateData.avatar = avatar;

//     const admin = await Admin.findByIdAndUpdate(
//       req.admin._id,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     if (!admin) {
//       return res.status(404).json({
//         success: false,
//         message: 'Admin not found',
//       });
//     }

//     res.json({
//       success: true,
//       message: 'Profile updated',
//       data: admin,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { register, login, getMe, updatePassword, updateProfile };
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { validateRegister, validateLogin, validateUpdatePassword } = require('../validators/authValidator');

generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const register = async (req, res, next) => {
  try {
    // Only allow first admin registration
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return res.status(403).json({
        success: false,
        message: 'Registration is disabled. An admin already exists.',
      });
    }

    const { valid, errors } = validateRegister(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    const { name, email, password } = req.body;

    const admin = await Admin.create({ name, email, password });
    const token = generateToken(admin._id);

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: { admin, token },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { valid, errors } = validateLogin(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    const token = generateToken(admin._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: { admin, token },
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }
    res.json({ success: true, data: admin });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { valid, errors } = validateUpdatePassword(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.admin._id).select('+password');
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    admin.password = newPassword;
    await admin.save();

    const token = generateToken(admin._id);

    res.json({
      success: true,
      message: 'Password updated successfully',
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (avatar !== undefined) updateData.avatar = avatar;

    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    res.json({
      success: true,
      message: 'Profile updated',
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe, updatePassword, updateProfile };
