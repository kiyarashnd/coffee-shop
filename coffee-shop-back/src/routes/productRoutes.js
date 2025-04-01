const express = require('express');
const multer = require('multer');

const router = express.Router();
const {
  getProducts,
  addProduct,
  deleteProduct,
  findProductById,
  // updateProduct,
  patchProduct,
} = require('../controllers/productController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

const storage = multer.memoryStorage(); // حتما memoryStorage استفاده کن برای Minio
const upload = multer({ storage });

router.get('/', getProducts); // گرفتن همه محصولات
router.post(
  '/',
  authenticateToken,
  isAdmin,
  upload.single('image'),
  addProduct
);
// router.put(
//   '/:id',
//   authenticateToken,
//   isAdmin,
//   upload.single('image'),
//   updateProduct
// ); // ✨ ویرایش محصول

router.patch(
  '/:id',
  authenticateToken,
  isAdmin,
  upload.single('image'),
  patchProduct
);
router.delete('/:id', authenticateToken, isAdmin, deleteProduct); // حذف محصول
router.get('/:id', findProductById);

module.exports = router;
