import AWS from 'aws-sdk';
import { env } from './env';

// Configure AWS SDK
AWS.config.update({
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  region: env.AWS_REGION,
});

// S3 instance for file uploads
export const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  signatureVersion: 'v4',
});

// SES instance for email sending
export const ses = new AWS.SES({
  apiVersion: '2010-12-01',
});

// SNS instance for push notifications
export const sns = new AWS.SNS({
  apiVersion: '2010-03-31',
});

// CloudFront instance for CDN
export const cloudFront = new AWS.CloudFront({
  apiVersion: '2020-05-31',
});

// S3 bucket configuration
export const s3Config = {
  bucket: env.AWS_S3_BUCKET,
  region: env.AWS_REGION,
  acl: 'public-read',
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedMimeTypes: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/webm',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
};

// Generate signed URL for file upload
export const generateSignedUrl = async (
  key: string,
  contentType: string,
  expires: number = 3600
): Promise<string> => {
  const params = {
    Bucket: s3Config.bucket,
    Key: key,
    ContentType: contentType,
    Expires: expires,
    ACL: s3Config.acl,
  };

  return s3.getSignedUrl('putObject', params);
};

// Delete file from S3
export const deleteFile = async (key: string): Promise<void> => {
  const params = {
    Bucket: s3Config.bucket,
    Key: key,
  };

  await s3.deleteObject(params).promise();
};

// Get file URL
export const getFileUrl = (key: string): string => {
  return `https://${s3Config.bucket}.s3.${s3Config.region}.amazonaws.com/${key}`;
};

export default {
  s3,
  ses,
  sns,
  cloudFront,
  s3Config,
  generateSignedUrl,
  deleteFile,
  getFileUrl,
};