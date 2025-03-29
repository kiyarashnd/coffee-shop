// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const {
  createPayment,
  verifyPayment,
} = require('../controllers/paymentController');

// این روت سفارش جدید + ایجاد PaymentRequest در زرین‌پال
router.post('/pay', createPayment);

// این روت کال‌بک پس از پرداخت موفق/ناموفق زرین‌پال
router.get('/verify', verifyPayment);

module.exports = router;
