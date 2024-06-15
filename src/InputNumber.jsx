import React, { useState } from 'react';
import { useDeck } from './DeckContext';


const InputNumber = () => {
  const {betAmt, setBetAmt, bankroll} = useDeck();

  const handleIncrement = () => {
    setBetAmt(prevValue => prevValue + 1);
  };

  const handleDecrement = () => {
    setBetAmt(prevValue => (prevValue > 1 ? prevValue - 1 : 1));
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (!isNaN(newValue) && newValue !== '') {
      setBetAmt(Math.min(Math.max(parseInt(newValue, 10), 0), bankroll));
    } else if (newValue === '') {
      setBetAmt('');
    }
  };

  const handleBlur = () => {
    if (betAmt === '') {
      setBetAmt(1);
    }
  };

  return (
    <div className="py-2 px-2 bg-gray-100 rounded-lg dark:bg-neutral-700" data-hs-input-number="">
      <div className="w-full flex justify-between items-center gap-x-2">
        <div className="grow">
          <input
            className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 dark:text-white"
            type="text"
            value={betAmt}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="flex justify-end items-center gap-x-1">
          <button
            type="button"
            className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            onClick={handleDecrement}
          >
            <svg
              className="flex-shrink-0 size-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
            </svg>
          </button>
          <button
            type="button"
            className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            onClick={handleIncrement}
          >
            <svg
              className="flex-shrink-0 size-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputNumber;
