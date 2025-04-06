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
    const userPhone = req.query.phone;
    if (!userPhone) {
      return res.status(401).json({ message: 'شماره تلفن کاربر یافت نشد' });
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

// controllers/adminController.js
exports.getPaidOrders = async (req, res) => {
  try {
    const orders = await Order.find({ paymentStatus: 'paid' });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
