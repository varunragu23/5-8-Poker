import fs from 'fs';
import path from 'path';
import formidable from 'formidable-serverless';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req, res) => {
  console.log('Incoming request');
  const form = new formidable.IncomingForm();
  form.uploadDir = '/tmp';

  if (!fs.existsSync(form.uploadDir)) {
    fs.mkdirSync(form.uploadDir);
    console.log('Created /tmp directory');
  }

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('File upload error:', err);
      return res.status(500).json({ error: 'File upload error' });
    }

    const userFile = files.file;
    const uploadPath = path.join('/tmp', 'algo.js');

    fs.renameSync(userFile.path, uploadPath);
    console.log('File renamed successfully');

    // List contents of /tmp for debugging
    const tmpContents = fs.readdirSync('/tmp');
    console.log('Contents of /tmp:', tmpContents);

    return res.status(200).json({
      message: 'File uploaded successfully',
      tmpContents,
    });
  });
};
