const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { evaluateHand, compareHands } = require('./pokerEval.cjs');


const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const userFile = req.files.file;
  const uploadPath = path.join(__dirname, 'uploads', 'algo.js');

  userFile.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
    res.send('File uploaded!');
  });
});

app.post('/execute', (req, res) => {
  const { userDealt, dealerDealt } = req.body;

  // Save the dealt data to a file
  const dealtDataPath = path.join(__dirname, 'dealtData.json');
  fs.writeFileSync(dealtDataPath, JSON.stringify({ userDealt, dealerDealt }));
  // Execute the user's code and return the rules directly
  try {
    delete require.cache[require.resolve('./uploads/algo.js')];
const { getRules } = require('./uploads/algo.js');

    const dealtData = JSON.parse(fs.readFileSync(dealtDataPath));
    const rules = getRules(dealtData.userDealt, dealtData.dealerDealt);
    res.json(rules);
  } catch (error) {
    console.error(`Execution error: ${error}`);
    res.status(500).send(`Execution error: ${error}`);
  }
});

const getWinner = (dealerDealtt, userDealtt) => {
  let dealerHand = evaluateHand(dealerDealtt);
  let userHand = evaluateHand(userDealtt);
  if(compareHands(dealerHand, userHand)) {
      // console.log('The Dealer is winning with a ' + dealerHand['hand']);
      return true;
  }
  else {
      // console.log('The User is winning with a ' + userHand['hand']);
      return false;
  }
  return true;
}

const simulateGame = (deck, getRules) => {
  let userDealt = [];
  let dealerDealt = [];
  let gameOver = false;
  let rules = getRules(userDealt, dealerDealt);

  while (!gameOver) {
    if (deck.length === 0) {
      gameOver = true;
      break;
    }

    const card = deck.pop();

    if (rules[card] && userDealt.length < 5) {
      userDealt.push(card);
      rules = getRules(userDealt, dealerDealt);
    } else {
      dealerDealt.push(card);
    }

    if (userDealt.length === 5 && dealerDealt.length == 8) {
      gameOver = true;
    }
  }

  return { userDealt, dealerDealt, gameOver };
};


app.post('/simulate', (req, res) => {
  const { initialDeck, numGames} = req.body;

  try {
    delete require.cache[require.resolve('./uploads/algo.js')];
const { getRules } = require('./uploads/algo.js');

    let winCount = 0;

    for (let i = 0; i < numGames; i++) {
      let deckCopy = [...initialDeck];
      deckCopy.sort(() => Math.random() - 0.5); // Shuffle the deck
      const result = simulateGame(deckCopy, getRules);

      if (!getWinner(result.dealerDealt, result.userDealt)) {
        winCount++;
      }
    }

    const winPercentage = (winCount / numGames) * 100;
    res.json({ winPercentage });
    console.log('The win percentage is ', winPercentage);
  } catch (error) {
    console.error(`Simulation error: ${error}`);
    res.status(500).send(`Simulation error: ${error}`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});
