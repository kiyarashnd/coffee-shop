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
});

module.exports = mongoose.model('Product', ProductSchema);
