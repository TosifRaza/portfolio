// const SiteSettings = require('../models/SiteSettings');

// const getSettings = async (req, res, next) => {
//   try {
//     const settings = await SiteSettings.getSettings();
//     res.json({ success: true, data: settings });
//   } catch (error) {
//     next(error);
//   }
// };

// const updateSettings = async (req, res, next) => {
//   try {
//     let settings = await SiteSettings.getSettings();

//     // Flatten nested objects for update
//     const updateData = {};
//     const topFields = ['siteName', 'siteDescription', 'logo', 'favicon'];
//     const nestedFields = {
//       seoDefaults: ['title', 'description', 'keywords', 'ogImage', 'twitterHandle'],
//       contactInfo: ['email', 'phone', 'address', 'mapEmbedUrl', 'workingHours'],
//       socialLinks: ['github', 'linkedin', 'twitter', 'facebook', 'instagram', 'dribbble', 'behance', 'youtube'],
//       theme: ['primaryColor', 'secondaryColor', 'accentColor', 'darkMode', 'font'],
//       footer: ['copyrightText', 'showPoweredBy'],
//     };

//     topFields.forEach((field) => {
//       if (req.body[field] !== undefined) updateData[field] = req.body[field];
//     });

//     Object.entries(nestedFields).forEach(([parent, children]) => {
//       children.forEach((child) => {
//         if (req.body[child] !== undefined) {
//           updateData[`${parent}.${child}`] = req.body[child];
//         }
//       });
//       // Also support nested object update
//       if (req.body[parent] && typeof req.body[parent] === 'object') {
//         Object.entries(req.body[parent]).forEach(([key, val]) => {
//           updateData[`${parent}.${key}`] = val;
//         });
//       }
//     });

//     // Merge arrays properly
//     if (req.body.seoDefaults && req.body.seoDefaults.keywords) {
//       updateData['seoDefaults.keywords'] = req.body.seoDefaults.keywords;
//     }

//     settings = await SiteSettings.findByIdAndUpdate(
//       settings._id,
//       { $set: updateData },
//       { new: true, runValidators: true }
//     );

//     res.json({ success: true, data: settings });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { getSettings, updateSettings };
const SiteSettings = require('../models/SiteSettings');

const getSettings = async (req, res, next) => {
  try {
    const settings = await SiteSettings.findOne();
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();

    // Build update data - support both flat and nested field updates
    const updateData = {};
    const topFields = ['siteName', 'siteDescription', 'siteUrl', 'logo', 'favicon', 'primaryColor', 'accentColor', 'darkMode'];
    const nestedFields = {
      seo: ['defaultTitle', 'titleTemplate', 'defaultDescription', 'defaultKeywords', 'ogImage'],
      contact: ['email', 'phone', 'address', 'mapEmbedUrl'],
      social: ['github', 'linkedin', 'twitter'],
      hero: ['greeting', 'ctaText', 'ctaLink', 'secondaryCtaText', 'secondaryCtaLink', 'showResumeButton'],
      footer: ['text', 'copyrightText', 'showSocial'],
    };

    topFields.forEach((field) => {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    });

    Object.entries(nestedFields).forEach(([parent, children]) => {
      // Support nested object update directly
      if (req.body[parent] && typeof req.body[parent] === 'object') {
        Object.entries(req.body[parent]).forEach(([key, val]) => {
          updateData[`${parent}.${key}`] = val;
        });
      }
    });

    // Also support flat keys that map to nested paths
    Object.keys(req.body).forEach((key) => {
      if (topFields.includes(key)) return;
      for (const [parent, children] of Object.entries(nestedFields)) {
        if (children.includes(key)) {
          updateData[`${parent}.${key}`] = req.body[key];
          break;
        }
      }
    });

    settings = await SiteSettings.findByIdAndUpdate(
      settings._id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSettings, updateSettings };
