import fs from 'fs';
import path from 'path';
import formidable from 'formidable-serverless';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = '/tmp/uploads';

  if (!fs.existsSync(form.uploadDir)) {
    fs.mkdirSync(form.uploadDir, { recursive: true });
  }

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'File upload error' });
    }

    const userFile = files.file;
    const uploadPath = path.join(form.uploadDir, 'algo.js');
    fs.renameSync(userFile.path, uploadPath);

    const { userDealt, dealerDealt } = JSON.parse(fields.data);
    try {
      const { getRules } = await import(`/tmp/uploads/algo.js`);
      const rules = getRules(userDealt, dealerDealt);
      res.status(200).json(rules);
    } catch (error) {
      res.status(500).json({ error: `Execution error: ${error.message}` });
    }
  });
};
