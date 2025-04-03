const Product = require('../models/Product');
const { uploadFile, minioClient, BUCKET_NAME } = require('../config/minio');

exports.getProducts = async (req, res) => {
  try {
    const filter = {};

    // فیلتر بر اساس دسته‌بندی
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // فیلتر بر اساس جستجو (در نام یا توضیحات)
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, category, available } = req.body;
    console.log(req.body);

    if (!name || !price || !req.file || !category) {
      return res
        .status(400)
        .json({ message: 'Name, price,category, and image are required' });
    }

    const uploadedImage = await uploadFile(req.file);

    const newProduct = new Product({
      name,
      price,
      description,
      image: uploadedImage.url, // Store full image URL
      category,
      available,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Upload Error:', JSON.stringify(error, null, 2));
    res.status(500).json({ message: error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // حذف تصویر از MinIO
    const imageKey = product.image.split('/').slice(-1)[0]; // دریافت نام فایل از URL
    await minioClient.destroy(BUCKET_NAME, `products/${imageKey}`);

    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.findProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select(
      'name price image category description'
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.patchProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body; // فقط فیلدهای تغییر یافته
    // اگر فایل جدیدی آپلود شده، می‌توانید آن را به updateData اضافه کنید.

    if (req.file) {
      // عملیات حذف تصویر قدیمی و آپلود تصویر جدید
      const product = await Product.findById(productId);
      const oldImageKey = product.image.split('/').slice(-1)[0];
      await minioClient.destroy(BUCKET_NAME, `products/${oldImageKey}`);
      const uploadedImage = await uploadFile(req.file);
      updateData.image = uploadedImage.url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Patch Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
