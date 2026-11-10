const path = require('path');

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const MAX_BYTES = 5 * 1024 * 1024;

function allowedExtension(filename) {
  const extension = path.extname(String(filename || '')).toLowerCase();
  return ALLOWED_EXTENSIONS.has(extension) ? extension : null;
}

function storedName(prefix, id, originalName) {
  const extension = allowedExtension(originalName);
  if (!extension) {
    const error = new Error('File type is not allowed');
    error.code = 'BAD_UPLOAD';
    throw error;
  }
  return prefix + id + extension;
}

function fileFilter(req, file, callback) {
  if (allowedExtension(file.originalname)) callback(null, true);
  else callback(new Error('File type is not allowed'));
}

module.exports = { ALLOWED_EXTENSIONS, MAX_BYTES, allowedExtension, storedName, fileFilter };
