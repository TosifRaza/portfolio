const crypto = require('crypto');

const nanoid = (size = 21) => {
  return crypto.randomBytes(size).toString('base64url').slice(0, size);
};

const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const truncate = (str, len = 100) => {
  if (!str || str.length <= len) return str || '';
  return str.slice(0, len).trim() + '...';
};

const escapeRegex = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const parseBoolean = (val) => {
  if (typeof val === 'boolean') return val;
  if (val === 'true' || val === '1' || val === 1) return true;
  return false;
};

const parseOrder = (val, defaultVal = 1) => {
  const order = parseInt(val, 10);
  if (isNaN(order) || order !== 1 || order !== -1) {
    return val === '-1' ? -1 : defaultVal;
  }
  return order;
};

const calcReadTime = (content, wordsPerMin = 200) => {
  if (!content) return 0;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMin));
};

const buildPagination = (page, limit, totalItems) => {
  const totalPages = Math.ceil(totalItems / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    page,
    limit,
    totalItems,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};

const parsePaginationParams = (query) => {
  let page = parseInt(query.page, 10) || 1;
  let limit = parseInt(query.limit, 10) || 10;
  let sort = query.sort || '-createdAt';

  if (page < 1) page = 1;
  if (limit < 1) limit = 10;
  if (limit > 100) limit = 100;

  // Validate sort parameter
  const allowedSortFields = [
    'createdAt', '-createdAt',
    'name', '-name',
    'title', '-title',
    'order', '-order',
    'publishedAt', '-publishedAt',
    'featured', '-featured',
  ];
  if (!allowedSortFields.includes(sort)) {
    sort = '-createdAt';
  }

  return { page, limit, sort, skip: (page - 1) * limit };
};

const logger = {
  info: (msg) => console.log(`[INFO] ${new Date().toISOString()} - ${msg}`),
  error: (msg) => console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`),
  warn: (msg) => console.warn(`[WARN] ${new Date().toISOString()} - ${msg}`),
};

const getDeviceInfo = (userAgent) => {
  const ua = userAgent || '';
  let device = 'unknown';
  let browser = 'unknown';
  let os = 'unknown';

  // Device
  if (/Mobile|Android.*Mobile|iPhone|iPod/i.test(ua)) {
    device = 'mobile';
  } else if (/iPad|Android(?!.*Mobile)|Tablet/i.test(ua)) {
    device = 'tablet';
  } else if (/Desktop/i.test(ua) || (!/Mobile|Tablet/i.test(ua))) {
    device = 'desktop';
  }

  // Browser
  if (/Firefox\//i.test(ua)) browser = 'Firefox';
  else if (/Edg\//i.test(ua)) browser = 'Edge';
  else if (/Chrome\//i.test(ua)) browser = 'Chrome';
  else if (/Safari\//i.test(ua)) browser = 'Safari';
  else if (/Opera|OPR\//i.test(ua)) browser = 'Opera';

  // OS
  if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Mac OS X/i.test(ua)) os = 'macOS';
  else if (/Linux/i.test(ua)) os = 'Linux';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';

  return { device, browser, os };
};

module.exports = {
  nanoid,
  slugify,
  truncate,
  escapeRegex,
  parseBoolean,
  parseOrder,
  calcReadTime,
  buildPagination,
  parsePaginationParams,
  logger,
  getDeviceInfo,
};
