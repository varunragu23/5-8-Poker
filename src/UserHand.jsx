import React, { useState } from 'react';

import { useDeck } from './DeckContext';


export default function UserHand() {
    const { userDealt, cardImages,  getUserHand, getWinner} = useDeck();

  // Function to add a new card
  const addCard = (newCard) => {
    setCards([...cards, newCard]);
  };

//   console.log(getUserHand());

//   getWinner();

  return (
    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-zinc-200 w-1/2 h-32 justify-center m-2 p-2 rounded-lg flex items-center space-x-[-20px]">
      {userDealt.map((card, index) => (
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