const multer = require('multer');
const multerS3 = require('multer-s3');
const { minioClient, BUCKET_NAME } = require('./minio');

const upload = multer({
  storage: multerS3({
    s3: minioClient,
    bucket: BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `products/${Date.now()}-${file.originalname}`);
    },
  }),
});

module.exports = upload;
