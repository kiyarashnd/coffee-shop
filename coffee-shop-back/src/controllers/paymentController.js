// controllers/paymentController.js
const ZarinPal = require('../lib/zarinpal'); // یا فایلی که کتابخانه خودتان را دارد
const Order = require('../models/Order'); // اگر دارید
const dotenv = require('dotenv');
dotenv.config();

const MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID; // 36 کاراکتری
const SANDBOX = process.env.ZARINPAL_SANDBOX === 'true';
const CURRENCY = 'IRT'; // می‌تواند IRR یا IRT باشد (در سندباکس معمولاً IRT)

const zarinpal = ZarinPal.create(MERCHANT_ID, SANDBOX, CURRENCY);

exports.createPayment = async (req, res) => {
  try {
    const { items, totalAmount, phone } = req.body;
    const trackingCode = Date.now() + '-' + Math.floor(Math.random() * 99999);

    // 1) ساخت سفارش در دیتابیس (در حالت pending) - اختیاری
    const order = await Order.create({
      phone,
      items,
      totalAmount,
      trackingCode,
      paymentStatus: 'pending',
    });

    // 2) فراخوانی متد PaymentRequest از زرین‌پال
    const paymentRequest = await zarinpal.PaymentRequest({
      Amount: totalAmount,
      CallbackURL: process.env.ZARINPAL_CALLBACK_URL,
      Description: 'خرید محصولات کافی‌شاپ',
      Mobile: phone,
    });

    if (paymentRequest.status === 100) {
      order.zarinpalAuthority = paymentRequest.authority;
      await order.save();

      // برگرداندن paymentUrl به فرانت
      return res.json({
        success: true,
        paymentUrl: paymentRequest.url,
        orderId: order._id,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'در ساخت درخواست پرداخت زرین‌پال مشکلی رخ داد',
      });
    }
  } catch (error) {
    console.error('Payment Error => ', error);
    return res.status(500).json({
      success: false,
      message: 'خطای سرور در ساخت پرداخت',
      error,
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    // زرین‌پال معمولا Authority و Status را به صورت query برمی‌گرداند
    const { Authority, Status } = req.query;

    // 1) جستجوی سفارش مربوطه
    const order = await Order.findOne({ zarinpalAuthority: Authority });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: 'سفارش یافت نشد' });
    }

    if (Status !== 'OK') {
      // یعنی کاربر پرداخت را کنسل کرده یا خطا خورده
      order.paymentStatus = 'canceled';
      await order.save();
      // می‌توانید او را به صفحه "پرداخت ناموفق" در فرانت هدایت کنید
      return res.redirect(
        process.env.PAYMENT_FAILED_URL ||
          'http://localhost:3000/chekout/payment-fail'
      );
    }

    // 2) وریفای پرداخت موفق
    const verification = await zarinpal.PaymentVerification({
      Amount: order.totalAmount,
      Authority,
    });

    if (verification.status === 100) {
      // پرداخت تایید شد
      order.paymentStatus = 'paid';
      order.refId = verification.refId;
      await order.save();
      // هدایت به صفحه موفق در فرانت
      return res.redirect(
        process.env.PAYMENT_SUCCESS_URL ||
          'http://localhost:3000/checkout/payment-success'
      );
    } else {
      // خطا در وریفای
      order.paymentStatus = 'failed';
      await order.save();
      return res.redirect(
        process.env.PAYMENT_FAILED_URL ||
          'http://localhost:3000/checkout/payment-fail'
      );
    }
  } catch (error) {
    console.error('Verify Error => ', error);
    return res.status(500).json({
      success: false,
      message: 'خطای سرور در وریفای پرداخت',
      error,
    });
  }
};
