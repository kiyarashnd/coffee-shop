const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

// تنظیمات Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// تنظیمات Multer برای آپلود به Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  //   params: {
  //     folder: 'coffee-shop', // فولدری که تصاویر در آن ذخیره می‌شوند
  //     allowed_formats: ['jpg', 'png', 'jpeg'],
  //     // transformation: [{ width: 500, height: 500, crop: 'limit' }],
  //     public_id: (req, file) => file.originalname.split('.')[0], // 👈 نام فایل در Cloudinary
  //   },
});

const upload = multer({ storage });

module.exports = upload;
