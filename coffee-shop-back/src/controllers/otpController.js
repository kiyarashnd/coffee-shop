const Kavenegar = require('kavenegar');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const OTPModel = require('../models/OTP');
dotenv.config();

const api = Kavenegar.KavenegarApi({ key: process.env.KAVENEGAR_API_KEY });

exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000);
    const expiration = new Date(Date.now() + process.env.OTP_EXPIRATION * 1000);

    await OTPModel.findOneAndUpdate(
      { phone },
      { code: otpCode, expiresAt: expiration },
      { upsert: true }
    );

    api.Send(
      {
        message: `کد ورود شما: ${otpCode}`,
        sender: '10004346',
        receptor: phone,
      },
      (response, status) => {
        console.log(response, status);
      }
    );

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('OTP Error:', error);
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

    await OTPModel.deleteOne({ phone });

    // ایجاد توکن‌ها
    const accessToken = jwt.sign({ phone }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign({ phone }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // ذخیره Refresh Token در کوکی HttpOnly
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 روز
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.refreshToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });

      const newAccessToken = jwt.sign(
        { phone: user.phone },
        process.env.JWT_SECRET,
        {
          expiresIn: '15m',
        }
      );

      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error('Refresh Token Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
