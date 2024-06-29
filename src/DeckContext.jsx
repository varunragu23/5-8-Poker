// src/DeckContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

import _ from 'lodash';

import { evaluateHand, compareHands } from './pokerEval';
import axios from 'axios';


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

  const [isAnimating, setIsAnimating] = useState(false);
  const [animatedCard, setAnimatedCard] = useState(null);

  const [showFinalSrc, setShowFinalSrc] = useState(false);

  const [isFlipping, setIsFlipping] = useState(false);

  const [simulateMode, setSimulateMode] = useState(false);

  const [betSubmitted, setBetSubmitted] = useState(false);

  const [message, setMessage] = useState('');

  useEffect(() => {
    getWinner(dealerDealt, userDealt);
  }, [userDealt, dealerDealt]);

  useEffect(() => {
    if(startTurn) {
      setRules(tempRules);
    }
  }, [tempRules]);

  console.log('gameOver' + gameOver);


  // const dealCard = () => {
  //   if (deck.length === 0) {
  //     setGameOver(true);
  //     return;
  //   }

  //   setGameStarted(true);

  //   const newDeck = [...deck];
  //   const card = newDeck.pop();

  //   let userLen = userDealt.length;
  //   let dealerLen = dealerDealt.length;

  //   if (rules[card] && userDealt.length < 5) {
  //     setUserDealt(newUserDealt => [...newUserDealt, card]);
  //     userLen++;
  //     setStartTurn(true);
  //     setRules(tempRules);
  //   } else {
  //     setDealerDealt(newDealerDealt => [...newDealerDealt, card]);
  //     dealerLen++;
  //     setStartTurn(false);
  //   }

  //   setTimeout(() => {
  //     setShowFinalSrc(false);
  //   }, 150);

  //   setDeck(newDeck);
  //   setDealt(newDealt => [...newDealt, card]);
  //   setIsFlipping(true);

  //   setTimeout(() => {
  //     setShowFinalSrc(true);
  //   }, 500); // Halfway through the animation (1s total duration / 2)

  //   setTimeout(() => {
  //     setIsFlipping(false);
  //   }, 1000); // Duration of the animation in milliseconds

  //   if (userLen === 5 && dealerLen >= 8) {
  //     setGameOver(true);
  //   }
  // };

  const getInitialSrc = () => {
    return cardImages[`./assets/poker-double-qr/2B.svg`].default;
  }

  const getFinalSrc = () => {
    return cardImages[`./assets/poker-double-qr/${deck[deck.length - 1]}.svg`].default;
  }

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

    if((rules[card]) && (userDealt.length < 5)) {
        setUserDealt(newUserDealt => [...newUserDealt, card]);
        userLen++;
        setStartTurn(true);
        setSimulateMode(false);
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
    return;
  };

  const simulateRound = () => {
    let firstTime = true;
    while(!startTurn || firstTime) {
      firstTime = false;
      setTimeout(() => {dealCard()}, 500);
    }
  }

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

  const getWinner = (dealerDealtt, userDealtt) => {
    let dealerHand = evaluateHand(dealerDealtt);
    let userHand = evaluateHand(userDealtt);
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
    setStartTurn(true);
    setBetSubmitted(false);
  }

  const handleExecute = async () => {
    try {
      console.log('I HAVE BEEN CALLED');
      const response = await axios.post('/api/execute', { userDealt, dealerDealt });
      updateRules(response.data);
      console.log('Rules:', response.data);
    } catch (error) {
      console.error('Execution error:', error);
      // setMessage('Execution Error');
    }
  };

  function handleBetScreenSubmit(bet) {
    setBankroll(prevValue => (prevValue - bet));
    // setIsStartScreen(false);
    setGameOver(false);
}

const simulateGames = async () => {
  try {
    const response = await axios.post('/api/simulate', {
      initialDeck: deck,
      numGames: 500 // Number of games to simulate
    });

    const { winPercentage } = response.data;

    if (typeof winPercentage === 'number') {
      let pct = winPercentage.toFixed(1);
      console.log(`Win percentage: ${pct}%`);
      setMessage(`Win percentage: ${pct}%`);
    } else {
      console.error('Invalid winPercentage:', winPercentage);
      setMessage('Simulation Error');
    }
  } catch (error) {
    console.error('Simulation error:', error);
    setMessage('Simulation Error');
  }
};



  if(simulateMode) {
    setTimeout(() => {
      dealCard();
    }, 500);
  }

  return (
    <DeckContext.Provider value={{ 
      deck, dealt, userDealt, dealerDealt, dealCard, getTopDeck, cardImages, rules, getUserHand, 
      getDealerHand, getWinner, updateRules, userWinning, gameOver, gameStarted, setGameOver, bankroll,
      betAmt, setBetAmt, setBankroll, resetGame, isAnimating,
      getInitialSrc, getFinalSrc, showFinalSrc, isFlipping, simulateRound, setSimulateMode,
      betSubmitted, setBetSubmitted, handleBetScreenSubmit, startTurn, handleExecute, simulateGames, message, setMessage
      }}>
      {children}
    </DeckContext.Provider>
  );
};

export const useDeck = () => {
  return useContext(DeckContext);
};
