const express = require('express');
const multer = require('multer');

const router = express.Router();
const {
  getProducts,
  addProduct,
  deleteProduct,
  findProductById,
} = require('../controllers/productController');
const {
  authMiddleware,
  adminMiddleware,
} = require('../middleware/authMiddleware');

const storage = multer.memoryStorage(); // حتما memoryStorage استفاده کن برای Minio
const upload = multer({ storage });

router.get('/', getProducts); // گرفتن همه محصولات
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  upload.single('image'),
  addProduct
); // افزودن محصول با تصویر
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct); // حذف محصول
router.get('/:id', findProductById);

module.exports = router;
