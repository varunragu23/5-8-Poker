// InfoModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import BetInfo from './BetInfo'; // Import your BetInfo component
import { useDeck } from './DeckContext';


const InfoModal = ({ isOpen, onRequestClose }) => {
  useEffect(() => {
    Modal.setAppElement('body');
  }, []);
  const [rulesHover, setRulesHover] = useState(false);
  const [prefHover, setPrefHover] = useState(false);


  const { betSubmitted } = useDeck();



  useEffect(() => {
    if(betSubmitted) {
        onRequestClose();
    }
  }, [betSubmitted])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <div className="bg-neutral-800 text-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <BetInfo
        rulesHover={rulesHover}
        prefHover={prefHover}
        />
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">5-8 Poker</h2>
          <button
            className="text-white hover:text-gray-400"
            onClick={onRequestClose}
          >
            &times;
          </button>
        </div>
        <p className="mt-2">
            "5-8 Poker" is a unique poker variant where you create rules to select cards and form the best hand, competing against the dealer.
            </p>
            <div className="flex flex-col">
            <div className="flex">
                <div className="m-4 w-1/2"
                    onMouseEnter={() => setRulesHover(true)}
                    onMouseLeave={() => setRulesHover(false)}

                >
                <h3 className="text-xl font-semibold">Place Bet</h3>
                <p className="mt-2">Submit your bet to get started!</p>
                </div>
                <div className="m-4 w-1/2"
                     onMouseEnter={() => setPrefHover(true)}
                     onMouseLeave={() => setPrefHover(false)}
                >
                <h3 className="text-xl font-semibold">Card Preferences</h3>
                <p className="mt-2">Choose cards to prioritize and improve your strategy.</p>
                </div>
            </div>
            <div className="m-4">
                <h3 className="text-xl font-semibold">Upload Algorithm</h3>
                <p className="mt-2">Upload an algorithm to automate your game strategy. Learn more <a href="https://github.com/varunragu23/5-8-Poker/blob/main/src/algo.js" target="_blank" className="underline hover:no-underline">here</a> </p>
            </div>
            </div>

      </div>
    </Modal>
  );
};

export default InfoModal;
