const {
  S3Client,
  DeleteObjectCommand,
  CreateBucketCommand,
  HeadBucketCommand,
  PutBucketPolicyCommand, // برای ست‌کردن Policy
} = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

const minioEndpoint = process.env.MINIO_ENDPOINT || 'http://minio:9000';
const minioPublicUrl = 'http://127.0.0.1:9000';
const BUCKET_NAME = process.env.MINIO_BUCKET || 'coffee-shop';

const minioClient = new S3Client({
  endpoint: minioEndpoint,
  region: 'us-east-1',
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY,
    secretAccessKey: process.env.MINIO_SECRET_KEY,
  },
});

/**
 * تنظیم یک Policy برای عمومی کردن همه‌ی اشیاء داخل باکت
 */
async function setBucketPolicyPublic(bucketName) {
  const publicPolicy = {
    Version: '2012-10-17',
    Statement: [
      // اجازه گرفتن اطلاعات باکت و لیست‌کردن اشیاء
      {
        Effect: 'Allow',
        Principal: '*',
        Action: ['s3:GetBucketLocation', 's3:ListBucket'],
        Resource: [`arn:aws:s3:::${bucketName}`],
      },
      // اجازه دانلود (GET) اشیاء برای همه
      {
        Effect: 'Allow',
        Principal: '*',
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${bucketName}/*`],
      },
    ],
  };

  await minioClient.send(
    new PutBucketPolicyCommand({
      Bucket: bucketName,
      Policy: JSON.stringify(publicPolicy),
    })
  );
  console.log(`✅ Bucket '${bucketName}' policy set to public.`);
}

async function createBucketIfNotExists() {
  try {
    // ابتدا چک می‌کنیم که آیا باکت وجود دارد یا نه
    await minioClient.send(new HeadBucketCommand({ Bucket: BUCKET_NAME }));
    console.log(`✅ Bucket '${BUCKET_NAME}' already exists`);

    // در صورت تمایل می‌توانید در هر بار اجرای برنامه،
    // مجدداً Policy را تنظیم کنید (برای اطمینان از Public بودن):
    // await setBucketPolicyPublic(BUCKET_NAME);
  } catch (error) {
    if (error.name === 'NotFound' || error.name === 'NoSuchBucket') {
      // در صورت عدم وجود باکت، آن را می‌سازیم
      await minioClient.send(new CreateBucketCommand({ Bucket: BUCKET_NAME }));
      console.log(`✅ Bucket '${BUCKET_NAME}' created successfully`);

      // بلافاصله Policy عمومی برای باکت تنظیم می‌کنیم
      await setBucketPolicyPublic(BUCKET_NAME);
    } else {
      // خطای دیگر
      console.error('❌ Error creating/checking bucket:', error);
      throw error;
    }
  }
}

/**
 * آپلود فایل در MinIO
 */
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

/**
 * حذف فایل از MinIO
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

// در لحظه شروع، بررسی/ایجاد باکت و تنظیم Policy
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
