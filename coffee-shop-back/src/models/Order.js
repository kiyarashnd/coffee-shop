// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String, // یا از مدل Product بگیریم
      price: Number, // یا از مدل Product بگیریم
      quantity: Number, // تعداد سفارش‌شده از هر محصول
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    fullName: {
      // نام و نام خانوادگی کاربر
      type: String,
      required: true,
    },
    addressLine: {
      // آدرس کامل
      type: String,
      required: true,
    },
    city: {
      // شهر
      type: String,
      required: true,
    },
    postalCode: {
      // کد پستی
      type: String,
      required: true,
    },
  },
  trackingCode: {
    type: String,
    // unique: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'canceled', 'failed'],
    default: 'pending',
  },
  zarinpalAuthority: String, // Authority برگشتی از زرین‌پال
  refId: String, // refId برگشتی در صورت پرداخت موفق
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
