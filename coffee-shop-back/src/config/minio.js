const {
  S3Client,
  DeleteObjectCommand,
  CreateBucketCommand,
  HeadBucketCommand,
} = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

const minioEndpoint = process.env.MINIO_ENDPOINT || 'http://minio:9000';
const minioPublicUrl = 'http://127.0.0.1:9000'; // تغییر برای دسترسی از مرورگر

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

async function createBucketIfNotExists() {
  try {
    try {
      await minioClient.send(new HeadBucketCommand({ Bucket: BUCKET_NAME }));
      console.log(`✅ Bucket '${BUCKET_NAME}' already exists`);
    } catch (error) {
      if (error.name === 'NotFound' || error.name === 'NoSuchBucket') {
        // Create bucket if it doesn't exist
        await minioClient.send(
          new CreateBucketCommand({ Bucket: BUCKET_NAME })
        );
        console.log(`✅ Bucket '${BUCKET_NAME}' created successfully`);
      } else {
        throw error;
      }
    }
  } catch (err) {
    console.error('❌ Error creating/checking bucket:', err);
    throw err;
  }
}

async function uploadFile(file) {
  try {
    // Ensure bucket exists before uploading
    await createBucketIfNotExists();

    const uniqueName = `${Date.now()}-${file.originalname}`;

    const upload = new Upload({
      client: minioClient,
      params: {
        Bucket: BUCKET_NAME,
        Key: `products/${uniqueName}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
    });

    await upload.done();
    const fileUrl = `${minioPublicUrl}/${BUCKET_NAME}/products/${uniqueName}`;

    console.log('✅ File uploaded successfully:', fileUrl);
    return { key: uniqueName, url: fileUrl };
  } catch (err) {
    console.error('❌ Error uploading file:', err);
    throw err;
  }
}

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

createBucketIfNotExists().catch((err) => {
  console.error('Failed to initialize MinIO bucket:', err);
});

module.exports = {
  minioClient,
  BUCKET_NAME,
  uploadFile,
  removeFile,
  createBucketIfNotExists,
};
