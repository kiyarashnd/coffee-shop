// controllers/otpController.js
const axios = require('axios');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const OTPModel = require('../models/OTP');
dotenv.config();

// ******************  اضافه کردن از فایل .env  ******************
const SMSIR_API_KEY = process.env.SMSIR_API_KEY;
const SMSIR_SENDER_NUMBER = process.env.SMSIR_SENDER_NUMBER || 3000;
// **************************************************************

exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    console.log('req.body is : ', req.body);
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    // ساخت یک کد تصادفی شش‌رقمی
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    // زمان انقضای OTP
    const expiration = new Date(Date.now() + process.env.OTP_EXPIRATION * 1000);

    // ذخیره/به‌روزرسانی OTP در دیتابیس
    await OTPModel.findOneAndUpdate(
      { phone },
      { code: otpCode, expiresAt: expiration },
      { upsert: true }
    );

    const url = 'https://api.sms.ir/v1/send/bulk';

    // بدنه درخواست
    const data = {
      lineNumber: Number(SMSIR_SENDER_NUMBER), // حتماً عدد باشد
      messageText: `کد ورود شما: ${otpCode}`, // متن پیامک
      mobiles: [phone], // آرایه‌ای از شماره‌ها
      sendDateTime: null, // برای ارسال فوری
    };

    // تنظیمات درخواست axios
    const config = {
      method: 'post',
      url,
      headers: {
        'X-API-KEY': SMSIR_API_KEY,
        'Content-Type': 'application/json',
      },
      data,
    };

    // ارسال
    await axios(config);

    res.status(200).json({ message: 'OTP sent successfully via sms.ir' });
  } catch (error) {
    console.error('OTP Error:', error?.response?.data || error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { phone, code } = req.body;
    if (!phone || !code) {
      return res.status(400).json({ message: 'Phone and OTP are required' });
    }

    const otpRecord = await OTPModel.findOne({ phone });
    if (!otpRecord || otpRecord.code !== code) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    // پاک‌کردن OTP پس از تأیید موفق
    await OTPModel.deleteOne({ phone });

    // ایجاد توکن‌ها
    const accessToken = jwt.sign({ phone }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign({ phone }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // ذخیره refreshToken در کوکی
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// exports.refreshToken = (req, res) => {
//   // همان منطق قبلی، تغییر نیاز ندارد
// };
