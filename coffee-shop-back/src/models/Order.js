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
    // اطلاعات آدرس، کد پستی و ...
    addressLine: String,
    city: String,
    postalCode: String,
    // فیلدهای دیگر در صورت نیاز...
  },
  // کد رهگیری (سفارش) که می‌توانی بر اساس نیاز سفارشی تولید کنی
  trackingCode: {
    type: String,
    unique: true,
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
  // هر فیلد دلخواه دیگر...
});

module.exports = mongoose.model('Order', orderSchema);
