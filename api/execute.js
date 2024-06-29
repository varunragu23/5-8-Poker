import fs from 'fs';
import path from 'path';

export default async (req, res) => {
  const { userDealt, dealerDealt } = req.body;
  const uploadDir = path.join('/tmp', 'uploads');
  const uploadPath = path.join(uploadDir, 'algo.js');

  // Check if /tmp/uploads directory exists
  if (!fs.existsSync(uploadDir)) {
    console.error('/tmp/uploads directory not found');
    return res.status(404).json({ error: '/tmp/uploads directory not found' });
  }

  // Print contents of /tmp/uploads
  const tmpContents = fs.readdirSync(uploadDir);
  console.log('Contents of /tmp/uploads:', tmpContents);

  // Check if algo.js exists
  if (!fs.existsSync(uploadPath)) {
    console.error('algo.js not found in /tmp/uploads');
    return res.status(404).json({ error: 'algo.js not found' });
  }

  try {
    const { getRules } = await import(uploadPath);
    const rules = getRules(userDealt, dealerDealt);
    return res.status(200).json(rules);
  } catch (error) {
    console.error(`Execution error: ${error.message}`);
    return res.status(500).json({ error: `Execution error: ${error.message}` });
  }
};
