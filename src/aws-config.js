import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
  region: 'us-west-1',
});

const s3 = new AWS.S3();

export default s3;
