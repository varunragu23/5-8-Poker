const fs = require('fs');
const path = require('path');

// Read dealtData.json to get userDealt and dealerDealt
const dealtDataPath = path.join(__dirname, 'dealtData.json');
const dealtData = JSON.parse(fs.readFileSync(dealtDataPath, 'utf8'));
const { userDealt, dealerDealt } = dealtData;

// Import the user's code (algo.js)
const userCodePath = path.join(__dirname, 'uploads', 'algo.js');
const { getRules } = require(userCodePath);

// Execute the user's function
const rules = getRules(userDealt, dealerDealt);

// Output the rules to the console (for debugging) and to a file
const outputPath = path.join(__dirname, 'output.json');
fs.writeFileSync(outputPath, JSON.stringify(rules));
console.log(JSON.stringify(rules));

// Send the output back to the main process
process.stdout.write(JSON.stringify(rules));
