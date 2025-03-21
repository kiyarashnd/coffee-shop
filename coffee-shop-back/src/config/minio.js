const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

const minioEndpoint = process.env.MINIO_ENDPOINT || 'http://minio:9000';
const minioPublicUrl = 'http://localhost:9000'; // تغییر برای دسترسی از مرورگر

const minioClient = new S3Client({
  endpoint: minioEndpoint,
  region: 'us-east-1',
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY,
    secretAccessKey: process.env.MINIO_SECRET_KEY,
  },
});

const BUCKET_NAME = process.env.MINIO_BUCKET || 'coffee-shop';

/**
 * آپلود فایل در MinIO
 * @param {Object} file - فایلی که باید آپلود شود
 * @returns {Object} اطلاعات آپلود شده
 */
async function uploadFile(file) {
  try {
    const uniqueName = `${Date.now()}-${file.originalname}`; // نام یونیک برای فایل

    const upload = new Upload({
      client: minioClient,
      params: {
        Bucket: BUCKET_NAME,
        Key: `products/${uniqueName}`, // ذخیره در فولدر products
        Body: file.buffer,
        ContentType: file.mimetype,
      },
    });

    await upload.done();
    const fileUrl = `${minioPublicUrl}/${BUCKET_NAME}/products/${uniqueName}`;

    console.log('✅ File uploaded successfully:', fileUrl);
    return { key: uniqueName, url: fileUrl }; // بازگرداندن URL کامل
  } catch (err) {
    console.error('❌ Error uploading file:', err);
    throw err;
  }
}

/**
 * حذف فایل از MinIO
 * @param {string} fileKey - نام فایلی که باید حذف شود
 */
async function removeFile(fileKey) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `products/${fileKey}`,
    });

    await minioClient.send(command);
    console.log(`✅ File deleted successfully: ${fileKey}`);
  } catch (err) {
    console.error('❌ Error deleting file:', err);
    throw err;
  }
}

module.exports = { minioClient, BUCKET_NAME, uploadFile, removeFile };
