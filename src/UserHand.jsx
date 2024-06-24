import React from 'react';
import { useDeck } from './DeckContext';

export default function UserHand() {
    const { userDealt, cardImages, userWinning } = useDeck();

    return (
        <div
            className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 w-1/2 h-32 justify-center m-2 p-2 rounded-lg flex items-center space-x-[-20px] bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-700 transition-all duration-300 
            ${userWinning ? 'ring-4 ring-green-800' : 'ring-4 ring-red-800'} hover:w-3/5 hover:h-36`}
        >
            {userDealt.map((card, index) => (
                <img
                    key={index}
                    src={cardImages[`./assets/poker-double-qr/${card}.svg`].default}
                    alt={card}
                    className="w-16 h-auto hover:w-20 hover:z-10"
                />
            ))}
        </div>
    );
}
