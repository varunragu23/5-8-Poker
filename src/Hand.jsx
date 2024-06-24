import React from 'react';
import { useDeck } from './DeckContext';

export default function Hand() {
  const { dealerDealt, cardImages, userWinning } = useDeck();

  return (
    <div
      className={`absolute flex top-3 left-1/2 transform -translate-x-1/2 w-1/2 h-32 m-2 p-2 rounded-lg overflow-x-auto items-center justify-center bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-700 transition-all duration-400 ${
        !userWinning ? 'ring-4 ring-green-800' : 'ring-4 ring-red-800'
      } hover:w-3/5 hover:h-36`}
    >
      <div className="flex items-center space-x-[-20px] whitespace-nowrap p-2">
        {dealerDealt.map((card, index) => (
          <img
            key={index}
            src={cardImages[`./assets/poker-double-qr/${card}.svg`].default}
            alt={card}
            className={`w-16 h-auto hover:w-20 hover:z-10 ${index === dealerDealt.length - 1 ? 'mr-4' : ''}`}
          />
        ))}
        {dealerDealt.length > 10 && (
          <img
            key={dealerDealt.length}
            src={cardImages[`./assets/poker-double-qr/2B.svg`].default}
            className="w-16 h-auto opacity-0"
          />
        )}
      </div>
    </div>
  );
}
