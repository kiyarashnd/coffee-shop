const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

const minioEndpoint = process.env.MINIO_ENDPOINT || 'http://localhost:9000'; // اضافه کردن http://

const s3Client = new S3Client({
  endpoint: minioEndpoint,
  region: 'us-east-1',
  forcePathStyle: true, // مهم برای MinIO
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY || 'vRo71HV2cgnFvzqzGGp2',
    secretAccessKey:
      process.env.MINIO_SECRET_KEY ||
      'cbvAQzXJ1SWDYZ6xYD5ygKbua29SKSAnAYDhcg0m',
  },
});

const BUCKET_NAME = process.env.MINIO_BUCKET || 'coffee-shop';

async function uploadFile(file) {
  try {
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
    });

    const result = await upload.done();
    const fileUrl = `${minioEndpoint}/${BUCKET_NAME}/${file.originalname}`;

    console.log('✅ File uploaded successfully:', fileUrl);
    return { key: result.Key, url: fileUrl }; // Return full URL
  } catch (err) {
    console.error('❌ Error uploading file:', err);
    throw err;
  }
}

module.exports = { s3Client, BUCKET_NAME, uploadFile };
