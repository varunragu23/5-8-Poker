import React, { useState } from 'react';
import { useDeck } from './DeckContext';
import CardPreferenceModal from './CardPreferenceModal';


export default function BetInfo() {
    const { bankroll, betSubmitted, setBetSubmitted, betAmt, 
        setBetAmt, handleBetScreenSubmit, rules, updateRules, userDealt, dealerDealt, startTurn } = useDeck();
    const [bet, setBet] = useState(betAmt);
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCards, setSelectedCards] = useState(rules);

    const handleBetChange = (event) => {
        setBet(event.target.value);
    };

    const submitBet = () => {
        setBetSubmitted(true);
        setBetAmt(bet);
        handleBetScreenSubmit(bet);
    }

    const handleCheckboxChange = (card) => {
        setSelectedCards((prevSelectedCards) => ({
          ...prevSelectedCards,
          [card]: !prevSelectedCards[card],
        }));
      };

      const savePreferences = () => {
        updateRules(selectedCards);
        setIsModalOpen(false);
      };
    
      const setPreferences = (newPreferences) => {
        setSelectedCards(newPreferences);
      }

    // const updateHovered = (inside) => {
    //     if(inside) {
    //         setIsHovered(true);
    //     }
    //     else {
    //         if(!betSubmitted)
    //     }
    // }

    return (
        <div
            className={`absolute bottom-0 right-0 p-4 m-4 bg-neutral-700 text-white rounded-lg shadow-lg ${betSubmitted ? 'w-1/6 h-auto' : 'w-1/4 h-auto'} ${startTurn ? 'ring-2 ring-neutral-600' : ''} hover:w-1/4 hover:h-auto transition-all duration-600`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >       
        <div className="flex justify-around">     
        <div className="text-center">
        Bet: ${bet}
        </div>
        <div className="text-center">Bankroll: ${bankroll}</div>
        </div>
            {(isHovered || (!betSubmitted)) && (
                <div className="relative mb-6">
                    <label htmlFor="labels-range-input" className="sr-only">Labels range</label>
                    <input
                        id="labels-range-input"
                        type="range"
                        value={bet}
                        min="1"
                        max={bankroll}
                        onChange={handleBetChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        disabled={betSubmitted}
                    />
                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">1</span>
                    {/* <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">{Math.floor(1 / 3 * bankroll)}</span> */}
                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">{Math.floor(1 / 2 * bankroll)}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">{bankroll}</span>

                </div>
                
            )}
            <div className="flex items-center justify-center">
            {((!betSubmitted)) && (
            <button className ="bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-lg h-auto m-2 p-2 w-24"
            onClick={submitBet}
            disabled={betSubmitted}
            >Submit</button>

            )}
            <button className ="bg-green-700 hover:bg-green-800 text-white rounded-lg shadow-lg h-auto m-2 p-2 w-24"
            onClick={() => setIsModalOpen(true)}
            >Rules</button>
            </div>
            <CardPreferenceModal 
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                preferences={selectedCards}
                handleCheckboxChange={handleCheckboxChange}
                savePreferences={savePreferences}
                userDealt={userDealt}
                dealerDealt={dealerDealt}
                setPreferences={setPreferences}
            />
        </div>
    );
}
