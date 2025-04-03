const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String, // لینک تصویر در Cloudinary
  category: {
    type: String,
    enum: ['قهوه', 'تجهیزات', 'دستگاه ها', 'سایر'],
    required: true,
  },
  available: {
    type: Boolean,
    default: true, // به صورت پیش‌فرض محصول موجود است
  },
});

module.exports = mongoose.model('Product', ProductSchema);
