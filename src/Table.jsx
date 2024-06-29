import { useState } from 'react';
import { useDeck } from './DeckContext';

import InputNumber from './InputNumber';

export default function Table() {
    const { deck, dealCard, cardImages, dealt, dealerDealt, userDealt, userWinning, 
        getUserHand, getDealerHand, gameOver, setGameOver, bankroll, setBankroll, 
        betAmt, getWinner, resetGame, isAnimating, getInitialSrc, getFinalSrc, 
        showFinalSrc, isFlipping, simulateRound, setSimulateMode, betSubmitted} = useDeck();

    const [isStartScreen, setIsStartScreen] = useState(true);

    function getTopDealt() {
        return dealt[dealt.length - 1];
    }

    function getDeckSrc() {
        if(deck.length > 0) {
            return (<div><img
                src={cardImages[`./assets/poker-double-qr/2B.svg`].default}
                className="w-24 h-auto"
                /></div>);
        }
        if(deck.length == 0) {
            return <></>;
        }
    }


    function getDealerInfo() {
        return <div className="flex flex-col relative w-1/2 h-16 bg-sky-200 justify-center items-center rounded-lg p-2">
            <div>{!userWinning && (<div>
                The Dealer is Winning
                </div>)}
            </div>
            <div>The Dealer has a {getDealerHand()}</div>
        </div>
    }

    function getUserInfo() {
        return <div className="flex flex-col relative w-1/2 h-16 bg-sky-200 justify-center items-center rounded-lg p-2">
        <div>{userWinning && (<div>
            The User is Winning
            </div>)}
        </div>
        <div>The User has a {getUserHand()}</div>
        </div>
    }

    function debug() {
        console.log('Debuggin: ' + gameOver);

        return true;
    }

    function handleStartScreenSubmit() {
        setBankroll(prevValue => (prevValue - betAmt));
        setIsStartScreen(false);
        setGameOver(false);
        resetGame();
    }

    function startScreen() {
        return  <div className="flex flex-col justify-around items-center w-1/2 h-1/2 bg-white rounded-lg p-2 m-2 shadow-md">
                    <div>
                        Bet:
                    <InputNumber />
                    </div>
                    <div>Bankroll: ${bankroll}</div>
                    <button className ="bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-lg h-auto m-2 p-2 w-24"onClick={handleStartScreenSubmit}>Submit</button>
                </div>
    }

    function getWinnerMessage() {
        if(userWinning) {
            return ('User won with a ' + getUserHand());
        }
        else {
            return ('Dealer won with a ' + getDealerHand());
        }
    }

    function continueGame() {
        resetGame();

        setGameOver(false);
    }

    function gameOverScreen() {
        return <div className="flex flex-col justify-around items-center w-1/2 h-1/2 bg-white rounded-lg p-2 m-2 shadow-md">
                <div>{getWinnerMessage()}</div>
                <div>You {(userWinning ? 'won' : 'lost')} ${betAmt}</div>
                <div>Current Bankroll: {bankroll}</div>
                <button className ="bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-lg h-auto m-2 p-2 w-24"onClick={continueGame}>Continue</button>

        </div>
    }

    function handleTurn() {
        dealCard();
    }

    function gameScreen2() {
        return (
            <>
              {getDealerInfo()}
              <div className="flex content-center justify-evenly w-2/3 h-1/2 items-center m-2">
                {getDeckSrc()}
                <div className="relative w-24">
                  {(dealt.length > 0) && (
                    <div className={`relative w-24 h-auto ${isFlipping ? 'animate-flip' : ''}`}>
                      <img
                        src={showFinalSrc ? getFinalSrc() : getInitialSrc()}
                        alt="Flipping Card"
                        className="w-24 h-auto backface-hidden"
                      />
                    </div>
                  )}
                </div>
                {(!gameOver) && (
                  <button className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-lg h-auto m-2 p-2 w-24" onClick={dealCard}>
                    Deal
                  </button>
                )}
              </div>
              {getUserInfo()}
            </>
          );
    }

    function gameScreen() {
        return <>
        {/* {getDealerInfo()} */}
        <div className="flex content-center justify-evenly w-2/3 h-1/2 items-center m-2">
            {getDeckSrc()}
            <div className="w-24">
                {(dealt.length > 0) && (<img
            src={cardImages[`./assets/poker-double-qr/${getTopDealt()}.svg`].default}
            className="w-24 h-auto"
            />)}
            </div>
            {(!gameOver && betSubmitted) && (
            <div className="flex flex-col justify-evenly">
            <button className ="bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-lg h-auto m-2 p-2 w-24"onClick={handleTurn}>Deal</button>
            </div>
            
            ) }
        </div>
        {/* {getUserInfo()} */}
        </>
    }

    // console.log(userWinning);

    debug();

    function renderContent() {
        // if(isStartScreen) {
            // return startScreen();
        // }
        if(gameOver) {
            return gameOverScreen();
        }
        else {
            return gameScreen();
        }
    }

    // getWinner();

    return (
      <div className="relative bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-700 w-3/5 h-1/2 rounded-full shadow-lg shadow-neutral-600 flex flex-col justify-center items-center border-[12px] border-neutral-900">
        {
            renderContent()
        }
        {/* {getDealerInfo()}
        <div className="flex content-center justify-evenly w-2/3 h-1/2 items-center m-2">
            {getDeckSrc()}
            <div>
                {(dealt.length > 0) && (<img
            src={cardImages[`./assets/poker-double-qr/${getTopDealt()}.svg`].default}
            className="w-24 h-auto"
            />)}
            </div>
            {(!gameOver) && (
            <button className ="bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-lg h-auto m-2 p-2 w-24"onClick={dealCard}>Deal</button>
            ) }
        </div>
        {getUserInfo()} */}
      </div>
    );
  }