const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String, // لینک تصویر در Cloudinary
  // imagePublicId: String, // برای حذف تصویر از Cloudinary
});

module.exports = mongoose.model('Product', ProductSchema);
