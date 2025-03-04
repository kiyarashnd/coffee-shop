const express = require('express');
const router = express.Router();
const {
  getProducts,
  addProduct,
  deleteProduct,
} = require('../controllers/productController');
// const upload = require('../middlewares/upload');
const upload = require('../config/cloudinary');

router.get('/', getProducts); // گرفتن همه محصولات
// router.post('/', addProduct); // افزودن محصول جدید
router.post('/', upload.single('image'), addProduct); // افزودن محصول با تصویر
router.delete('/:id', deleteProduct); // حذف محصول

module.exports = router;
