const Product = require('../models/Product');
const { uploadFile, minioClient, BUCKET_NAME } = require('../config/minio'); // ✅ ایمپورت minioClient

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price || !req.file) {
      return res
        .status(400)
        .json({ message: 'Name, price, and image are required' });
    }

    const uploadedImage = await uploadFile(req.file);

    const newProduct = new Product({
      name,
      price,
      description,
      image: uploadedImage.url, // Store full image URL
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
      'name price image description'
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

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // let imageUrl = product.image;

    if (req.file) {
      // حذف عکس قدیمی از MinIO
      const oldImageKey = product.image.split('/').slice(-1)[0];
      // await minioClient.removeObject(BUCKET_NAME, `products/${oldImageKey}`);
      await minioClient.destroy(BUCKET_NAME, `products/${oldImageKey}`);

      // آپلود عکس جدید
      const uploadedImage = await uploadFile(req.file);
      imageUrl = uploadedImage.url;
    }

    const uploadedImage = await uploadFile(req.file);

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;

    product.image = uploadedImage.url;

    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
