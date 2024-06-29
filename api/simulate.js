import fs from 'fs';
import path from 'path';
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

export default async (req, res) => {
  const { initialDeck, numGames } = req.body;

  try {
    const { getRules } = await import(`/tmp/uploads/algo.js`);
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
    res.status(200).json({ winPercentage });
  } catch (error) {
    res.status(500).json({ error: `Simulation error: ${error.message}` });
  }
};
