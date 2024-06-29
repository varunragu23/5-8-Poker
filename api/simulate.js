import fs from 'fs';
import path from 'path';
import formidable from 'formidable-serverless';
import { evaluateHand, compareHands } from '../server/pokerEval.cjs';

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

    if (userDealt.length === 5 && dealerDealt.length === 8) {
      gameOver = true;
    }
  }

  return { userDealt, dealerDealt, gameOver };
};

const getWinner = (dealerDealt, userDealt) => {
  let dealerHand = evaluateHand(dealerDealt);
  let userHand = evaluateHand(userDealt);
  return compareHands(dealerHand, userHand);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = '/tmp/uploads';

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'File upload error' });
    }

    const userFile = files.file;
    const uploadPath = `${form.uploadDir}/algo.js`;

    // Rename the uploaded file
    fs.renameSync(userFile.path, uploadPath);

    // Import the uploaded module
    const { getRules } = await import(uploadPath);
    const { initialDeck, numGames } = JSON.parse(fields.simulationData);
    let winCount = 0;

    for (let i = 0; i < numGames; i++) {
      let deckCopy = [...initialDeck];
      deckCopy.sort(() => Math.random() - 0.5);
      const result = simulateGame(deckCopy, getRules);

      if (!getWinner(result.dealerDealt, result.userDealt)) {
        winCount++;
      }
    }

    const winPercentage = (winCount / numGames) * 100;
    return res.status(200).json({ winPercentage });
  });
};
