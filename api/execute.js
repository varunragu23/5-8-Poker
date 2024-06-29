import fs from 'fs';
import path from 'path';

export default async (req, res) => {
  const { userDealt, dealerDealt } = req.body;

  try {
    const { getRules } = await import(`/tmp/algo.js`);
    const rules = getRules(userDealt, dealerDealt);
    return res.status(200).json(rules);
  } catch (error) {
    return res.status(500).json({ error: `Execution error: ${error.message}` });
  }
};
