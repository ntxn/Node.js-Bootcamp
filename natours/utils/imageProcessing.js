const multer = require('multer');
const sharp = require('sharp');
const AppError = require('./appError');

exports.multerUpload = multer({
  storage: multer.memoryStorage(), // image will be stored in a buffer. That buffer will be available at req.file.buffer
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) cb(null, true);
    else
      cb(new AppError('Not an image! Please upload only images', 400), false);
  },
});

exports.resizeImage = async (file, width, length, collection, filename) => {
  await sharp(file)
    .resize(width, length)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/${collection}/${filename}`);
};
