// // const validator = require('validator');

// // const validateProfile = (data) => {
// //   const errors = [];
// //   if (!data.name || !data.name.trim()) errors.push('Name is required');
// //   if (!data.title || !data.title.trim()) errors.push('Title is required');
// //   if (!data.bio || !data.bio.trim()) errors.push('Bio is required');
// //   if (data.email && !validator.isEmail(data.email)) errors.push('Invalid email format');
// //   if (data.website && !validator.isURL(data.website, { require_protocol: true })) errors.push('Invalid website URL');
// //   return { valid: errors.length === 0, errors };
// // };

// // const validateSkill = (data) => {
// //   const errors = [];
// //   if (!data.name || !data.name.trim()) errors.push('Skill name is required');
// //   if (!data.category || !data.category.trim()) errors.push('Category is required');
// //   if (data.proficiency === undefined || data.proficiency === null) {
// //     errors.push('Proficiency is required');
// //   } else if (typeof data.proficiency !== 'number' || data.proficiency < 0 || data.proficiency > 100) {
// //     errors.push('Proficiency must be a number between 0 and 100');
// //   }
// //   return { valid: errors.length === 0, errors };
// // };

// // const validateProject = (data) => {
// //   const errors = [];
// //   if (!data.title || !data.title.trim()) errors.push('Title is required');
// //   // if (!data.description || !data.description.trim()) errors.push('Description is required');
// //   if (data.links) {
// //     if (data.links.liveUrl && !validator.isURL(data.links.liveUrl, { require_protocol: false })) {
// //       errors.push('Invalid live URL');
// //     }
// //     if (data.links.githubUrl && !validator.isURL(data.links.githubUrl, { require_protocol: false })) {
// //       errors.push('Invalid GitHub URL');
// //     }
// //   }
// //   return { valid: errors.length === 0, errors };
// // };

// // const validateExperience = (data) => {
// //   const errors = [];
// //   if (!data.company || !data.company.trim()) errors.push('Company is required');
// //   if (!data.position || !data.position.trim()) errors.push('Position is required');
// //   if (!data.description || !data.description.trim()) errors.push('Description is required');
// //   if (!data.startDate) errors.push('Start date is required');
// //   return { valid: errors.length === 0, errors };
// // };

// // const validateEducation = (data) => {
// //   const errors = [];
// //   if (!data.institution || !data.institution.trim()) errors.push('Institution is required');
// //   if (!data.degree || !data.degree.trim()) errors.push('Degree is required');
// //   if (!data.fieldOfStudy || !data.fieldOfStudy.trim()) errors.push('Field of study is required');
// //   if (!data.startDate) errors.push('Start date is required');
// //   return { valid: errors.length === 0, errors };
// // };

// // const validateService = (data) => {
// //   const errors = [];
// //   if (!data.title || !data.title.trim()) errors.push('Title is required');
// //   if (!data.description || !data.description.trim()) errors.push('Description is required');
// //   return { valid: errors.length === 0, errors };
// // };

// // const validateTestimonial = (data) => {
// //   const errors = [];
// //   if (!data.name || !data.name.trim()) errors.push('Client name is required');
// //   if (!data.content || !data.content.trim()) errors.push('Testimonial content is required');
// //   if (data.rating !== undefined && (data.rating < 1 || data.rating > 5)) {
// //     errors.push('Rating must be between 1 and 5');
// //   }
// //   return { valid: errors.length === 0, errors };
// // };

// // const validateBlogPost = (data) => {
// //   const errors = [];
// //   if (!data.title || !data.title.trim()) errors.push('Title is required');
// //   if (!data.content || !data.content.trim()) errors.push('Content is required');
// //   if (!data.category || !data.category.trim()) errors.push('Category is required');
// //   if (data.status && !['draft', 'published', 'scheduled'].includes(data.status)) {
// //     errors.push('Status must be draft, published, or scheduled');
// //   }
// //   return { valid: errors.length === 0, errors };
// // };

// // const validateMessage = (data) => {
// //   const errors = [];
// //   if (!data.name || !data.name.trim()) errors.push('Name is required');
// //   if (!data.email || !data.email.trim()) errors.push('Email is required');
// //   else if (!validator.isEmail(data.email)) errors.push('Invalid email format');
// //   if (!data.message || !data.message.trim()) errors.push('Message is required');
// //   return { valid: errors.length === 0, errors };
// // };

// // const validateSocialLink = (data) => {
// //   const errors = [];
// //   if (!data.platform || !data.platform.trim()) errors.push('Platform is required');
// //   if (!data.url || !data.url.trim()) errors.push('URL is required');
// //   else if (!validator.isURL(data.url, { require_protocol: false })) errors.push('Invalid URL');
// //   return { valid: errors.length === 0, errors };
// // };

// // module.exports = {
// //   validateProfile,
// //   validateSkill,
// //   validateProject,
// //   validateExperience,
// //   validateEducation,
// //   validateService,
// //   validateTestimonial,
// //   validateBlogPost,
// //   validateMessage,
// //   validateSocialLink,
// // };
// const validator = require('validator');

// const validateProfile = (data) => {
//   const errors = [];
//   if (!data.name || !data.name.trim()) errors.push('Name is required');
//   if (!data.title || !data.title.trim()) errors.push('Title is required');
//   if (!data.bio || !data.bio.trim()) errors.push('Bio is required');
//   if (data.email && !validator.isEmail(data.email)) errors.push('Invalid email format');
//   if (data.website && !validator.isURL(data.website, { require_protocol: true })) errors.push('Invalid website URL');
//   return { valid: errors.length === 0, errors };
// };

// const validateSkill = (data) => {
//   const errors = [];
//   if (!data.name || !data.name.trim()) errors.push('Skill name is required');
//   if (!data.category || !data.category.trim()) errors.push('Category is required');
//   if (data.proficiency === undefined || data.proficiency === null) {
//     errors.push('Proficiency is required');
//   } else if (typeof data.proficiency !== 'number' || data.proficiency < 0 || data.proficiency > 100) {
//     errors.push('Proficiency must be a number between 0 and 100');
//   }
//   return { valid: errors.length === 0, errors };
// };

// const validateProject = (data) => {
//   const errors = [];
//   if (!data.title || !data.title.trim()) errors.push('Title is required');
//   return { valid: errors.length === 0, errors };
// };

// const validateExperience = (data) => {
//   const errors = [];
//   if (!data.company || !data.company.trim()) errors.push('Company is required');
//   if (!data.position || !data.position.trim()) errors.push('Position is required');
//   if (!data.description || !data.description.trim()) errors.push('Description is required');
//   if (!data.startDate) errors.push('Start date is required');
//   return { valid: errors.length === 0, errors };
// };

// const validateEducation = (data) => {
//   const errors = [];
//   if (!data.institution || !data.institution.trim()) errors.push('Institution is required');
//   if (!data.degree || !data.degree.trim()) errors.push('Degree is required');
//   if (!data.fieldOfStudy || !data.fieldOfStudy.trim()) errors.push('Field of study is required');
//   if (!data.startDate) errors.push('Start date is required');
//   return { valid: errors.length === 0, errors };
// };

// const validateService = (data) => {
//   const errors = [];
//   if (!data.title || !data.title.trim()) errors.push('Title is required');
//   if (!data.description || !data.description.trim()) errors.push('Description is required');
//   return { valid: errors.length === 0, errors };
// };

// const validateTestimonial = (data) => {
//   const errors = [];
//   if (!data.name || !data.name.trim()) errors.push('Client name is required');
//   if (!data.content || !data.content.trim()) errors.push('Testimonial content is required');
//   if (data.rating !== undefined && (data.rating < 1 || data.rating > 5)) {
//     errors.push('Rating must be between 1 and 5');
//   }
//   return { valid: errors.length === 0, errors };
// };

// const validateBlogPost = (data) => {
//   const errors = [];
//   if (!data.title || !data.title.trim()) errors.push('Title is required');
//   if (!data.content || !data.content.trim()) errors.push('Content is required');
//   if (!data.category || !data.category.trim()) errors.push('Category is required');
//   if (data.status && !['draft', 'published', 'scheduled'].includes(data.status)) {
//     errors.push('Status must be draft, published, or scheduled');
//   }
//   return { valid: errors.length === 0, errors };
// };

// const validateMessage = (data) => {
//   const errors = [];
//   if (!data.name || !data.name.trim()) errors.push('Name is required');
//   if (!data.email || !data.email.trim()) errors.push('Email is required');
//   else if (!validator.isEmail(data.email)) errors.push('Invalid email format');
//   if (!data.message || !data.message.trim()) errors.push('Message is required');
//   return { valid: errors.length === 0, errors };
// };

// const validateSocialLink = (data) => {
//   const errors = [];
//   if (!data.platform || !data.platform.trim()) errors.push('Platform is required');
//   if (!data.url || !data.url.trim()) errors.push('URL is required');
//   else if (!validator.isURL(data.url, { require_protocol: false })) errors.push('Invalid URL');
//   return { valid: errors.length === 0, errors };
// };

// module.exports = {
//   validateProfile,
//   validateSkill,
//   validateProject,
//   validateExperience,
//   validateEducation,
//   validateService,
//   validateTestimonial,
//   validateBlogPost,
//   validateMessage,
//   validateSocialLink,
// };
const validator = require('validator');

const validateProfile = (data) => {
  const errors = [];
  if (!data.name || !data.name.trim()) errors.push('Name is required');
  if (!data.title || !data.title.trim()) errors.push('Title is required');
  if (!data.bio || !data.bio.trim()) errors.push('Bio is required');
  if (data.email && !validator.isEmail(data.email)) errors.push('Invalid email format');
  if (data.website && !validator.isURL(data.website, { require_protocol: true })) errors.push('Invalid website URL');
  return { valid: errors.length === 0, errors };
};

const validateSkill = (data) => {
  const errors = [];
  if (!data.name || !data.name.trim()) errors.push('Skill name is required');
  if (!data.category || !data.category.trim()) errors.push('Category is required');
  if (data.proficiency === undefined || data.proficiency === null) {
    errors.push('Proficiency is required');
  } else if (typeof data.proficiency !== 'number' || data.proficiency < 0 || data.proficiency > 100) {
    errors.push('Proficiency must be a number between 0 and 100');
  }
  return { valid: errors.length === 0, errors };
};

const validateProject = (data) => {
  const errors = [];
  if (!data.title || !data.title.trim()) errors.push('Title is required');
  return { valid: errors.length === 0, errors };
};

const validateExperience = (data) => {
  const errors = [];
  if (!data.company || !data.company.trim()) errors.push('Company is required');
  if (!data.position || !data.position.trim()) errors.push('Position is required');
  if (!data.description || !data.description.trim()) errors.push('Description is required');
  if (!data.startDate) errors.push('Start date is required');
  return { valid: errors.length === 0, errors };
};

const validateEducation = (data) => {
  const errors = [];
  if (!data.institution || !data.institution.trim()) errors.push('Institution is required');
  if (!data.degree || !data.degree.trim()) errors.push('Degree is required');
  if (!data.field || !data.field.trim()) errors.push('Field of study is required');
  if (!data.startDate) errors.push('Start date is required');
  return { valid: errors.length === 0, errors };
};

const validateService = (data) => {
  const errors = [];
  if (!data.title || !data.title.trim()) errors.push('Title is required');
  if (!data.description || !data.description.trim()) errors.push('Description is required');
  return { valid: errors.length === 0, errors };
};

const validateTestimonial = (data) => {
  const errors = [];
  if (!data.name || !data.name.trim()) errors.push('Client name is required');
  if (!data.content || !data.content.trim()) errors.push('Testimonial content is required');
  if (data.rating !== undefined && (data.rating < 1 || data.rating > 5)) {
    errors.push('Rating must be between 1 and 5');
  }
  return { valid: errors.length === 0, errors };
};

const validateBlogPost = (data) => {
  const errors = [];
  if (!data.title || !data.title.trim()) errors.push('Title is required');
  if (!data.content || !data.content.trim()) errors.push('Content is required');
  if (!data.category || !data.category.trim()) errors.push('Category is required');
  if (data.status && !['draft', 'published', 'scheduled'].includes(data.status)) {
    errors.push('Status must be draft, published, or scheduled');
  }
  return { valid: errors.length === 0, errors };
};

const validateMessage = (data) => {
  const errors = [];
  if (!data.name || !data.name.trim()) errors.push('Name is required');
  if (!data.email || !data.email.trim()) errors.push('Email is required');
  else if (!validator.isEmail(data.email)) errors.push('Invalid email format');
  if (!data.message || !data.message.trim()) errors.push('Message is required');
  return { valid: errors.length === 0, errors };
};

const validateSocialLink = (data) => {
  const errors = [];
  if (!data.platform || !data.platform.trim()) errors.push('Platform is required');
  if (!data.url || !data.url.trim()) errors.push('URL is required');
  else if (!validator.isURL(data.url, { require_protocol: false })) errors.push('Invalid URL');
  return { valid: errors.length === 0, errors };
};

module.exports = {
  validateProfile,
  validateSkill,
  validateProject,
  validateExperience,
  validateEducation,
  validateService,
  validateTestimonial,
  validateBlogPost,
  validateMessage,
  validateSocialLink,
};
