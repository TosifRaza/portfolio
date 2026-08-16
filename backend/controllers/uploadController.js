const path = require('path');
const fs = require('fs');
const { uploadToCloudinary, isCloudinaryConfigured } = require('../config/cloudinary');
const { uploadSingle, uploadMultiple, MAX_SIZE } = require('../middleware/upload');
const { logger } = require('../utils/helpers');

const uploadFile = async (req, res, next) => {
  try {
    const upload = uploadMultiple('files', 10);
    upload(req, res, async (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({
            success: false,
            message: `File too large. Maximum size is ${MAX_SIZE} bytes.`,
          });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return res.status(400).json({
            success: false,
            message: `Unexpected file field: ${err.field}`,
          });
        }
        return next(err);
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No files uploaded',
        });
      }

      const results = [];

      for (const file of req.files) {
        try {
          let fileData = {
            originalName: file.originalname,
            filename: file.filename,
            size: file.size,
            mimetype: file.mimetype,
            url: `/uploads/${file.path.replace(/\\/g, '/').split('uploads/')[1]}`,
          };

          if (isCloudinaryConfigured()) {
            const cloudResult = await uploadToCloudinary(file.path, 'portfolio');
            if (cloudResult) {
              fileData.url = cloudResult.url;
              fileData.publicId = cloudResult.publicId;
              fileData.width = cloudResult.width;
              fileData.height = cloudResult.height;
              fileData.storage = 'cloudinary';
            } else {
              fileData.storage = 'local';
            }
          } else {
            fileData.storage = 'local';
          }

          results.push(fileData);
        } catch (fileErr) {
          logger.error(`Error uploading ${file.originalname}: ${fileErr.message}`);
          // Still include with local URL
          results.push({
            originalName: file.originalname,
            filename: file.filename,
            size: file.size,
            mimetype: file.mimetype,
            url: `/uploads/${file.path.replace(/\\/g, '/').split('uploads/')[1]}`,
            storage: 'local',
            error: 'Cloudinary upload failed, file saved locally',
          });
        }
      }

      res.status(201).json({
        success: true,
        message: `${results.length} file(s) uploaded successfully`,
        data: results,
      });
    });
  } catch (error) {
    next(error);
  }
};

const uploadSingleFile = async (req, res, next) => {
  try {
    const upload = uploadSingle('file');
    upload(req, res, async (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({
            success: false,
            message: `File too large. Maximum size is ${MAX_SIZE} bytes.`,
          });
        }
        return next(err);
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

      let fileData = {
        originalName: req.file.originalname,
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: `/uploads/${req.file.path.replace(/\\/g, '/').split('uploads/')[1]}`,
      };

      if (isCloudinaryConfigured()) {
        const cloudResult = await uploadToCloudinary(req.file.path, 'portfolio');
        if (cloudResult) {
          fileData.url = cloudResult.url;
          fileData.publicId = cloudResult.publicId;
          fileData.width = cloudResult.width;
          fileData.height = cloudResult.height;
          fileData.storage = 'cloudinary';
        } else {
          fileData.storage = 'local';
        }
      } else {
        fileData.storage = 'local';
      }

      res.status(201).json({
        success: true,
        message: 'File uploaded successfully',
        data: fileData,
      });
    });
  } catch (error) {
    next(error);
  }
};

const deleteFile = async (req, res, next) => {
  try {
    const { url, publicId } = req.body;

    if (publicId && isCloudinaryConfigured()) {
      const { deleteFromCloudinary } = require('../config/cloudinary');
      await deleteFromCloudinary(publicId);
    }

    if (url && url.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({ success: true, message: 'File deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadFile, uploadSingleFile, deleteFile };
