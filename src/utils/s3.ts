/* eslint-disable @typescript-eslint/no-var-requires */
import { S3 } from '@aws-sdk/client-s3';
require('dotenv').config();

const s3Client = new S3({
  forcePathStyle: false,
  endpoint: process.env.DO_ENDPOINT,
  region: process.env.DO_REGION,
  credentials: {
    accessKeyId: process.env.DO_ACCESS_KEY,
    secretAccessKey: process.env.DO_SECRET_ACCESS_KEY,
  },
});

export { s3Client };
