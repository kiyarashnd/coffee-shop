// controllers/paymentController.js
const ZarinPal = require('../lib/zarinpal'); // یا هر جایی که فایل zarinpal.js رو گذاشتی
const Order = require('../models/Order');

const MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID;
const SANDBOX = process.env.ZARINPAL_SANDBOX === 'true';
// بالاخره یا 'true' یا 'false' در env تنظیم می‌کنید
const CURRENCY = 'IRT'; // می‌توانید IRR بگذارید اما IRT هم قابل قبول است

// instance:
const zarinpal = ZarinPal.create(MERCHANT_ID, SANDBOX, CURRENCY);

// ۱) ایجاد سفارش و هدایت به درگاه
exports.createPayment = async (req, res) => {
  try {
    /*
      از فرانت‌:
      - لیست محصولات (items)
      - شماره تلفن (phone) -- البته اینجا فرض می‌کنیم قبلا OTP رو تأیید کرده.
      - آدرس ارسال
      - جمع مبلغ سبد (totalAmount)

      (نکته: بهتر است backend هم قیمت محصولات را بررسی کند که دستکاری نشده باشد.)
    */
    const { phone, items, shippingAddress, totalAmount } = req.body;

    if (!phone || !items || !items.length || !totalAmount) {
      return res.status(400).json({
        message: 'اطلاعات سفارش ناقص است',
      });
    }

    // ساخت سفارش در حالت pending
    // ساخت trackingCode دلخواه (مثلا یک uuid یا ...)
    const trackingCode = Date.now() + '-' + Math.floor(Math.random() * 99999);

    const newOrder = await Order.create({
      phone,
      items,
      totalAmount,
      shippingAddress,
      trackingCode,
      paymentStatus: 'pending',
    });

    // درخواست زرین‌پال:
    // مبلغ بر اساس تومان اگر واحد IRT گذاشتید
    // و اگر IRR بود، باید مبلغ را *10 یا *100 کنید (بسته به نحوه محاسبه)
    // CallbackURL آدرسی است که زرین پال بعد از پرداخت به آن برمی‌گردد
    // آن را در env ذخیره کنید مثل: http://localhost:3000/api/payment/verify
    const paymentRequest = await zarinpal.PaymentRequest({
      Amount: totalAmount, // مبلغ به تومان
      CallbackURL: process.env.ZARINPAL_CALLBACK_URL,
      Description: 'خرید محصولات کافی‌شاپ',
      Email: '',
      Mobile: phone,
    });

    if (paymentRequest.status === 100) {
      // Authority برگشتی زرین‌پال را در سفارش ذخیره می‌کنیم
      newOrder.zarinpalAuthority = paymentRequest.authority;
      await newOrder.save();

      // به فرانت آدرس درگاه زرین‌پال را می‌دهیم که ریدایرکت کند:
      return res.json({
        success: true,
        paymentUrl: paymentRequest.url,
        orderId: newOrder._id,
        trackingCode: newOrder.trackingCode,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'خطا در ایجاد درخواست پرداخت زرین‌پال',
      });
    }
  } catch (error) {
    console.error('Error in createPayment:', error);
    res.status(500).json({
      success: false,
      message: 'خطای سرور',
    });
  }
};

// ۲) کال‌بک پس از پرداخت و وریفای آن
exports.verifyPayment = async (req, res) => {
  try {
    // زرین پال معمولا Authority و Status را برمی‌گرداند
    const { Authority, Status } = req.query;

    if (!Authority) {
      return res.status(400).json({ message: 'Authority not found' });
    }

    // سفارشی که قبلا برایش Authority ثبت کردیم را بیابید
    const order = await Order.findOne({ zarinpalAuthority: Authority });
    if (!order) {
      return res.status(404).json({ message: 'سفارش یافت نشد' });
    }

    if (Status !== 'OK') {
      // یعنی پرداخت موفق نبوده
      order.paymentStatus = 'failed';
      await order.save();
      // می‌توانید ریدایرکت کنید به یک صفحه فرانت مخصوص "پرداخت ناموفق"
      return res.redirect(
        process.env.PAYMENT_FAILED_URL || 'http://localhost:3000/payment-fail'
      );
    }

    // پرداخت موفق است، حالا در زرین‌پال وریفای کنیم
    const verification = await zarinpal.PaymentVerification({
      Amount: order.totalAmount, // تومان
      Authority,
    });

    if (verification.status === 100) {
      // پرداخت تایید شد
      order.paymentStatus = 'paid';
      order.refId = verification.refId; // ذخیره کد پیگیری بانکی
      await order.save();
      // هدایت کاربر به صفحه موفقیت پرداخت
      return res.redirect(
        process.env.PAYMENT_SUCCESS_URL ||
          'http://localhost:3000/payment-success'
      );
    } else {
      // خطا در تایید نهایی
      order.paymentStatus = 'failed';
      await order.save();
      // هدایت کاربر به صفحه شکست پرداخت
      return res.redirect(
        process.env.PAYMENT_FAILED_URL || 'http://localhost:3000/payment-fail'
      );
    }
  } catch (error) {
    console.error('Error in verifyPayment:', error);
    return res.status(500).json({ message: 'خطای سرور' });
  }
};
