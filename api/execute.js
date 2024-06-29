import fs from 'fs';

export default async (req, res) => {
  const { userDealt, dealerDealt } = req.body;

  try {
    // List contents of /tmp before import
    const tmpContents = fs.readdirSync('/tmp');
    console.log('Contents of /tmp before execution:', tmpContents);

    const { getRules } = await import(`/tmp/algo.js`);
    const rules = getRules(userDealt, dealerDealt);

    return res.status(200).json(rules);
  } catch (error) {
    console.error(`Execution error: ${error.message}`);
    return res.status(500).json({ error: `Execution error: ${error.message}` });
  }
};
