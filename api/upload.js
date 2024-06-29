import fs from 'fs';
import path from 'path';
import formidable from 'formidable-serverless';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req, res) => {
  try {
    console.log('Incoming request');
    const form = new formidable.IncomingForm();
    const uploadDir = path.join('/tmp', 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log('Created /tmp/uploads directory');
    }

    form.uploadDir = uploadDir;

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('File upload error:', err);
        return res.status(500).json({ error: 'File upload error' });
      }

      const userFile = files.file;
      const uploadPath = path.join(uploadDir, 'algo.js');

      fs.renameSync(userFile.path, uploadPath);
      console.log('File renamed successfully');

      const tmpContents = fs.readdirSync(uploadDir);
      console.log('Contents of /tmp/uploads:', tmpContents);

      return res.status(200).json({
        message: 'File uploaded successfully',
        tmpContents,
      });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ error: 'Unexpected error occurred' });
  }
};
