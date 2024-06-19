const OpenAI = require('openai');
require('dotenv').config();

module.exports = async function handler(req, res) {
  console.log('herehhere');
    if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests are allowed' });
    return;
  }

  console.log('got here');

  const { input } = req.body;

  console.log("Received input:", input);
  console.log("Using OpenAI API Key:", process.env.OPENAI_API_KEY ? "Configured" : "Not Configured");

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `What is the capital of France?`;

  try {
    const response = await openai.Completions.create({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    console.log("OpenAI API response:", response);
    res.status(200).json({ result: response.choices[0].text.trim() });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
};
