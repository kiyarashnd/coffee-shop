const Product = require('../models/Product');

// گرفتن لیست محصولات
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addProduct = async (req, res) => {
  console.log('req is : ', req);
  console.log('File Data:', req.file); // 👈 ببین مقدار داره یا نه
  console.log('Body Data:', req.body);
  try {
    const { name, price, description } = req.body;

    if (!name || !price || !req.file) {
      return res
        .status(400)
        .json({ message: 'Name, price, and image are required' });
    }

    // دریافت URL و public_id تصویر از Cloudinary
    const imageUrl = req.file.path;
    const publicId = req.file.filename; // public_id برای حذف بعدی

    const newProduct = new Product({
      name,
      price,
      description,
      image: imageUrl,
      imagePublicId: publicId,
    });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    // res.status(500).json({ message: 'Server Error' });
    console.log('error is : ', error);
    console.error('Upload Error:', JSON.stringify(error, null, 2)); // 👈 نمایش واضح خطا
    res.status(500).json({ message: error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // حذف تصویر از Cloudinary
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    // حذف محصول از دیتابیس
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
