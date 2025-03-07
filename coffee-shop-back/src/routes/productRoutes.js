const express = require('express');
const multer = require('multer');

const router = express.Router();
const {
  getProducts,
  addProduct,
  deleteProduct,
  findProductById,
} = require('../controllers/productController');

const storage = multer.memoryStorage(); // حتما memoryStorage استفاده کن برای Minio
const upload = multer({ storage });

router.get('/', getProducts); // گرفتن همه محصولات
router.post('/', upload.single('image'), addProduct); // افزودن محصول با تصویر
router.delete('/:id', deleteProduct); // حذف محصول
router.get('/:id', findProductById);

module.exports = router;
