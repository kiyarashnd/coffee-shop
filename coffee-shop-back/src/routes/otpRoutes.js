const express = require('express');
const rateLimit = require('express-rate-limit');
const {
  sendOTP,
  verifyOTP,
  refreshToken,
} = require('../controllers/otpController');

const router = express.Router();

// محدود کردن درخواست ارسال OTP به 1 بار در هر 2 دقیقه
const otpLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 دقیقه
  max: 1,
  message: { message: 'You can request an OTP only once every 2 minutes' },
});

router.post('/send-otp', otpLimiter, sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/refresh-token', refreshToken);

module.exports = router;
