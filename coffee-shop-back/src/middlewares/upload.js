const multer = require('multer');
const path = require('path');

// تنظیمات ذخیره‌سازی فایل‌ها
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // ذخیره در پوشه uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // نام یکتا برای فایل
  },
});

// فیلتر کردن فایل‌ها (فقط تصاویر مجاز هستند)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error('Only images (JPG, JPEG, PNG) are allowed!'));
  }
};

// تنظیمات Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // محدودیت حجم (۵ مگابایت)
});

module.exports = upload;
