import React, { useState } from 'react';

import { useDeck } from './DeckContext';

// import cardImages from './assets/poker-double-qr';

export default function Hand() {
  // const [cards, setCards] = useState(['5C', '7D', '9H']); // Example initial cards

  const { dealerDealt, cardImages } = useDeck();

  // Function to add a new card
  return (
    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-zinc-200 w-1/2 h-32 justify-center m-2 p-2 rounded-lg flex items-center space-x-[-20px] whitespace-nowrap overflow-x-auto">
      {dealerDealt.map((card, index) => (
        <img
          key={index}
          src={cardImages[`./assets/poker-double-qr/${card}.svg`].default}
          alt={card}
          className="w-16 h-auto"
        />
      ))}
    </div>
  );
}
