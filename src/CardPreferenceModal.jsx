import React, { useState } from 'react';

import OpenAI from 'openai';

import { createPrompt } from './ruleGen';


const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function CardPreferenceModal({ isOpen, onRequestClose, preferences, setPreferences, handleCheckboxChange, savePreferences, userDealt, dealerDealt}) {
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const suits = ['Spades', 'Clubs', 'Diamonds', 'Hearts'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };



  const handleProcessInput = async () => {
    console.log('The input is:', input);
    // setInput('');
    // console.log(userDealt, dealerDealt);
    const prompt = createPrompt(input, userDealt, dealerDealt);
    console.log(prompt);
    try {
      const response = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: 'gpt-4o',
        max_tokens: 500,
        n: 1,
        stop: null,
        temperature: 0.7,
      });

      const selectedCards = response.choices[0].message.content;
      console.log(selectedCards);
      const newPreferences = { ...preferences };
      Object.keys(newPreferences).forEach((key) => {
        newPreferences[key] = selectedCards.includes(key);
      });

      setPreferences(newPreferences);
      setInput('');
    } catch (error) {
      console.error('Error processing input:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-neutral-700 p-6 rounded-lg shadow-lg w-1/2 ring-2 ring-neutral-400">
        <h2 className="text-xl font-bold mb-4 text-white">Card Preferences</h2>
        <div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border rounded text-black"
          placeholder="Enter your card preferences..."
        />
        <p className="text-sm mb-4 text-white">Ex: 'All cards with value 9' or 'Cards I need to get a straight'</p>
        <button onClick={handleProcessInput} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2">Process Input</button>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {suits.map((suit, suitIndex) => (
            <div className="grid-row" key={suit}>
              {values.map((value, valueIndex) => (
                <div className="flex items-center justify-center m-1 text-white" key={value}>
                  {`${value}${suitUnicode[suit]}`}
                  <input
                    type="checkbox"
                    checked={preferences[`${value}${suit.charAt(0)}`]}
                    onChange={() => handleCheckboxChange(`${value}${suit.charAt(0)}`)}
                    className="form-checkbox m-1"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <button onClick={savePreferences} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2">Save Preferences</button>
        <button onClick={onRequestClose} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
}


const suitUnicode = {
    'Spades': '\u{2660}',
    'Hearts': '\u{2665}',
    'Diamonds': '\u{2666}',
    'Clubs': '\u{2663}',

  };