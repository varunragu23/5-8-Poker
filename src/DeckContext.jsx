// src/DeckContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

import _ from 'lodash';

import { evaluateHand, compareHands } from './pokerEval';

const DeckContext = createContext();

const cardImages = import.meta.glob('./assets/poker-double-qr/*.svg', { eager: true });

const createShuffledDeck = () => {
  const suits = ['C', 'D', 'H', 'S'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
  const deck = [];

  for (let suit of suits) {
    for (let value of values) {
      deck.push(`${value}${suit}`);
    }
  }

  return _.shuffle(deck);
};

function createInitialRules() {
    const badValues = ['2', '3', '4', '5', '6', '7', '8', '9'];
    const goodValues = ['A', 'T', 'J', 'Q', 'K'];
    const suits = ['C', 'S', 'H', 'D'];

    let rules = {};
    for (let suit of suits) {
        for (let value of badValues) {
            rules[value + suit] = false;
        }
        for (let value of goodValues) {
            rules[value + suit] = true;
        }
    }

    return rules;
}


export const DeckProvider = ({ children }) => {
  const [deck, setDeck] = useState(createShuffledDeck());
  const [dealt, setDealt] = useState([]);

  const [userDealt, setUserDealt] = useState([]);
  const [dealerDealt, setDealerDealt] = useState([]);

  const [rules, setRules] = useState(() => createInitialRules());

  const [tempRules, setTempRules] = useState(() => createInitialRules());

  const [startTurn, setStartTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const [userWinning, setUserWinning] = useState(false);

  const [gameStarted, setGameStarted] = useState(false);

  const [bankroll, setBankroll] = useState(1000);

  const [betAmt, setBetAmt] = useState(1);

  useEffect(() => {
    getWinner();
  }, [userDealt, dealerDealt]);

  console.log('gameOver' + gameOver);


  const dealCard = () => {
    if (deck.length === 0) {
      setGameOver(true);
      return;
    }

    setGameStarted(true);


    const newDeck = [...deck];
    const card = newDeck.pop();

    let userLen = userDealt.length;
    let dealerLen = dealerDealt.length;

    if(rules[card] && (userDealt.length < 5)) {
        setUserDealt(newUserDealt => [...newUserDealt, card]);
        userLen++;
        setStartTurn(true);
        setRules(tempRules);
    }
    else {
        setDealerDealt(newDealerDealt => [...newDealerDealt, card]);
        dealerLen++;
        setStartTurn(false);
    }



    setDeck(newDeck);
    console.log('hi im renderingi think');
    setDealt(newDealt => [...newDealt, card]);

    if(userLen === 5 && dealerLen >= 8) {
      setGameOver(true);
    }
    console.log('gameOver' + gameOver);
    console.log('user ' + userDealt.length);
    console.log("dealer " + dealerDealt.length);
    // getWinner();

  };

  const getTopDeck = () => {
    if (deck.length === 0) return null;
    return deck[deck.length - 1];
  };

  const getUserHand = () => {
    return evaluateHand(userDealt)['hand'];
  }

  const getDealerHand = () => {
    return evaluateHand(dealerDealt)['hand'];
  }

  const getWinner = () => {
    let dealerHand = evaluateHand(dealerDealt);
    let userHand = evaluateHand(userDealt);
    if(compareHands(dealerHand, userHand)) {
        console.log('The Dealer is winning with a ' + dealerHand['hand']);
        setUserWinning(false);
        return true;
    }
    else {
        console.log('The User is winning with a ' + userHand['hand']);
        setUserWinning(true);
        if(gameOver) {
          setBankroll(prevValue => (prevValue + 2 * betAmt));
        }
        return false;
    }
    return true;
  }

  const updateRules = (newRules) => {
      setTempRules(newRules);
      if(dealt.length === 0) {
        setRules(newRules);
      }
  }
  console.log('bankroll is' + bankroll);

  const resetGame = () => {
    setDeck(createShuffledDeck());
    setDealt([]);
    setUserDealt([]);
    setDealerDealt([]);
  }

  return (
    <DeckContext.Provider value={{ 
      deck, dealt, userDealt, dealerDealt, dealCard, getTopDeck, cardImages, rules, getUserHand, 
      getDealerHand, getWinner, updateRules, userWinning, gameOver, gameStarted, setGameOver, bankroll,
      betAmt, setBetAmt, setBankroll, resetGame
      }}>
      {children}
    </DeckContext.Provider>
  );
};

export const useDeck = () => {
  return useContext(DeckContext);
};
