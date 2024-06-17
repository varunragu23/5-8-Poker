import React from 'react';
import { useDeck } from './DeckContext';

export default function Hand() {
  const { dealerDealt, cardImages } = useDeck();

  return (
    <div className="absolute flex top-3 left-1/2 transform -translate-x-1/2 bg-zinc-200 w-1/2 h-32 m-2 p-2 rounded-lg overflow-x-auto items-center justify-center">
      <div className="flex items-center space-x-[-20px] whitespace-nowrap p-2">
        {dealerDealt.map((card, index) => (
          <img
            key={index}
            src={cardImages[`./assets/poker-double-qr/${card}.svg`].default}
            alt={card}
            className={`w-16 h-auto ${index === dealerDealt.length - 1 ? 'mr-4' : ''}`}
          />
        ))}
        <img
            key={dealerDealt.length}
            src={cardImages[`./assets/poker-double-qr/2B.svg`].default}
            className={`w-16 h-auto opacity-0`}
          />
      </div>
    </div>
  );
}
