// controllers/orderController.js
const Order = require('../models/Order');

exports.getAllOrders = async (req, res) => {
  try {
    // ابتدا بررسی کنید کاربر ادمین باشد (Middleware isAdmin)
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطای سرور' });
  }
};

// controllers/orderController.js
exports.getMyOrders = async (req, res) => {
  try {
    // چون در verifyOTP یا refreshToken مربوط به OTPController
    // یک توکن که در payload آن phone ذخیره شده ایجاد کردید
    // اینجا phone رو از req.user (یا هر جایی که فرستادید) می‌گیرید
    const userPhone = req.user.phone;
    if (!userPhone) {
      return res
        .status(401)
        .json({ message: 'شماره تلفن کاربر در توکن یافت نشد' });
    }

    const orders = await Order.find({ phone: userPhone }).sort({
      createdAt: -1,
    });

    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error in getMyOrders', error);
    res.status(500).json({ success: false, message: 'خطای سرور' });
  }
};
