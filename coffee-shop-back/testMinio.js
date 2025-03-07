const { s3Client, BUCKET_NAME } = require('./config/minio');
const { ListBucketsCommand } = require('@aws-sdk/client-s3');

async function testMinioConnection() {
  try {
    const response = await s3Client.send(new ListBucketsCommand({}));
    console.log('✅ MinIO Connection Successful:', response);
  } catch (err) {
    console.error('❌ MinIO Connection Failed:', err);
  }
}

testMinioConnection();
