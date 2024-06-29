import s3 from './aws-config';

export async function uploadFile(file) {
  const params = {
    Bucket: 'mypokerbucket',
    Key: file.name,
    Body: file,
    ContentType: file.type,
  };

  try {
    const result = await s3.upload(params).promise();
    console.log('File uploaded successfully:', result);
    return result;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}
