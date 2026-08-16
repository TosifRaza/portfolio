const validator = require('validator');

const validateRegister = (data) => {
  const errors = [];

  if (!data.name || !data.name.trim()) {
    errors.push('Name is required');
  } else if (data.name.trim().length > 100) {
    errors.push('Name cannot exceed 100 characters');
  }

  if (!data.email || !data.email.trim()) {
    errors.push('Email is required');
  } else if (!validator.isEmail(data.email)) {
    errors.push('Please provide a valid email');
  }

  if (!data.password) {
    errors.push('Password is required');
  } else if (data.password.length < 8) {
    errors.push('Password must be at least 8 characters');
  } else if (!/[A-Z]/.test(data.password)) {
    errors.push('Password must contain at least one uppercase letter');
  } else if (!/[a-z]/.test(data.password)) {
    errors.push('Password must contain at least one lowercase letter');
  } else if (!/[0-9]/.test(data.password)) {
    errors.push('Password must contain at least one number');
  }

  return { valid: errors.length === 0, errors };
};

const validateLogin = (data) => {
  const errors = [];

  if (!data.email || !data.email.trim()) {
    errors.push('Email is required');
  } else if (!validator.isEmail(data.email)) {
    errors.push('Please provide a valid email');
  }

  if (!data.password) {
    errors.push('Password is required');
  }

  return { valid: errors.length === 0, errors };
};

const validateUpdatePassword = (data) => {
  const errors = [];

  if (!data.currentPassword) {
    errors.push('Current password is required');
  }

  if (!data.newPassword) {
    errors.push('New password is required');
  } else if (data.newPassword.length < 8) {
    errors.push('New password must be at least 8 characters');
  } else if (!/[A-Z]/.test(data.newPassword)) {
    errors.push('New password must contain at least one uppercase letter');
  } else if (!/[a-z]/.test(data.newPassword)) {
    errors.push('New password must contain at least one lowercase letter');
  } else if (!/[0-9]/.test(data.newPassword)) {
    errors.push('New password must contain at least one number');
  }

  return { valid: errors.length === 0, errors };
};

module.exports = {
  validateRegister,
  validateLogin,
  validateUpdatePassword,
};
