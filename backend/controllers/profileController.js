// const Profile = require('../models/Profile');
// const { validateProfile } = require('../validators/contentValidator');

// const getProfile = async (req, res, next) => {
//   try {
//     const profile = await Profile.findOne();
//     res.json({ success: true, data: profile });
//   } catch (error) {
//     next(error);
//   }
// };

// const updateProfile = async (req, res, next) => {
//   try {
//     const { valid, errors } = validateProfile(req.body);
//     if (!valid) {
//       return res.status(400).json({ success: false, message: 'Validation failed', errors });
//     }

//     let profile = await Profile.findOne();
//     if (!profile) {
//       profile = await Profile.create(req.body);
//       return res.status(201).json({ success: true, data: profile });
//     }

//     const allowedFields = [
//       'name', 'title', 'bio', 'shortBio', 'avatar', 'resumeUrl',
//       'email', 'phone', 'location', 'website', 'dateOfBirth',
//       'yearsOfExperience', 'availabilityStatus', 'tagline',
//     ];

//     allowedFields.forEach((field) => {
//       if (req.body[field] !== undefined) {
//         profile[field] = req.body[field];
//       }
//     });

//     await profile.save();
//     res.json({ success: true, data: profile });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { getProfile, updateProfile };
const Profile = require('../models/Profile');
const { validateProfile } = require('../validators/contentValidator');

const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { valid, errors } = validateProfile(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
      return res.status(201).json({ success: true, data: profile });
    }

    const allowedFields = [
      'name', 'title', 'subtitle', 'bio', 'shortBio', 'description', 'careerObjective',
      'avatar', 'profileImage', 'resumeUrl',
      'email', 'phone', 'location', 'website', 'dateOfBirth',
      'availability', 'availableForHire', 'yearsOfExperience',
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        profile[field] = req.body[field];
      }
    });

    await profile.save();
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile };
