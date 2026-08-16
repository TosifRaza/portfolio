const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { nanoid } = require('../utils/helpers');

const uploadDir = process.env.UPLOAD_DEST || './uploads';

// Ensure upload directories exist
const ensureDirs = () => {
  const dirs = ['images', 'documents', 'avatars', 'projects', 'blog', 'misc'];
  dirs.forEach((dir) => {
    const fullPath = path.join(uploadDir, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });
};
ensureDirs();

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let subDir = 'misc';
    const mimeType = file.mimetype;

    if (mimeType.startsWith('image/')) {
      subDir = 'images';
    } else if (
      mimeType === 'application/pdf' ||
      mimeType.includes('document') ||
      mimeType.includes('sheet')
    ) {
      subDir = 'documents';
    }

    // Allow override via field name
    if (file.fieldname === 'avatar') subDir = 'avatars';
    if (file.fieldname === 'projectImages') subDir = 'projects';
    if (file.fieldname === 'blogImage') subDir = 'blog';

    const dir = path.join(uploadDir, subDir);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${nanoid(16)}${ext}`;
    cb(null, uniqueName);
  },
});

// Allowed MIME types
const ALLOWED_MIME_TYPES = new Set([
  // Images
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/bmp',
  'image/tiff',
  // Documents
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  // Videos
  'video/mp4',
  'video/webm',
]);

// File filter
const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.has(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file type: ${file.mimetype}. Allowed types: images, PDFs, documents.`
      ),
      false
    );
  }
};

// Max file size (5MB default)
const MAX_SIZE = parseInt(process.env.MAX_FILE_SIZE, 10) || 5 * 1024 * 1024;

// Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_SIZE,
    files: 10, // max 10 files at once
  },
});

// Convenience methods
const uploadSingle = (fieldName) => upload.single(fieldName);
const uploadMultiple = (fieldName, maxCount = 5) => upload.array(fieldName, maxCount);
const uploadFields = (fields) => upload.fields(fields);

module.exports = {
  upload,
  uploadSingle,
  uploadMultiple,
  uploadFields,
  ALLOWED_MIME_TYPES,
  MAX_SIZE,
};
