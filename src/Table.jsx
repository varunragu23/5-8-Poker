import { useState } from 'react';
import { useDeck } from './DeckContext';

import InputNumber from './InputNumber';

export default function Table() {
    const { deck, dealCard, cardImages, dealt, dealerDealt, userDealt, userWinning, getUserHand, getDealerHand, gameOver, setGameOver, bankroll, setBankroll, betAmt, getWinner} = useDeck();

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
        return <div className="flex flex-col relative w-1/2 h-auto bg-slate-400 justify-center items-center rounded-lg p-2">
            {!userWinning && (<div>
                The Dealer is Winning
                </div>)}
            <div>The Dealer has a {getDealerHand()}</div>
        </div>
    }

    function getUserInfo() {
        return <div className="flex flex-col relative w-1/2 h-auto bg-slate-400 justify-center items-center rounded-lg p-2">
        {userWinning && (<div>
            The User is Winning
            </div>)}
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

    function gameOverScreen() {
        if(userWinning) {
            setBankroll(prevValue => (prevValue + 2 * betAmt));
        }
        return <div className="flex flex-col justify-around items-center w-1/2 h-1/2 bg-white rounded-lg p-2 m-2 shadow-md">
                <div>{getWinnerMessage()}</div>
                <div>You {(userWinning ? 'won' : 'lost')} ${betAmt}</div>
                <div>Current Bankroll: {bankroll}</div>
        </div>
    }

    function handleTurn() {
        dealCard();
    }

    function gameScreen() {
        return <>
        {getDealerInfo()}
        <div className="flex content-center justify-evenly w-2/3 h-1/2 items-center m-2">
            {getDeckSrc()}
            <div>
                {(dealt.length > 0) && (<img
            src={cardImages[`./assets/poker-double-qr/${getTopDealt()}.svg`].default}
            className="w-24 h-auto"
            />)}
            </div>
            {(!gameOver) && (
            <button className ="bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-lg h-auto m-2 p-2 w-24"onClick={handleTurn}>Deal</button>
            ) }
        </div>
        {getUserInfo()}
        </>
    }

    // console.log(userWinning);

    debug();

    function renderContent() {
        if(isStartScreen) {
            return startScreen();
        }
        else if(gameOver) {
            return gameOverScreen();
        }
        else {
            return gameScreen();
        }
    }

    // getWinner();

    return (
      <div className="relative bg-green-600 w-2/3 h-1/2 rounded-full shadow-lg flex flex-col justify-center items-center border-[16px] border-orange-900">
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