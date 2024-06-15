import React from 'react';

export default function CardPreferenceModal({ isOpen, onRequestClose, preferences, handleCheckboxChange, savePreferences }) {
  if (!isOpen) return null;

  const suits = ['Spades', 'Clubs', 'Diamonds', 'Hearts'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

  const cardUnicode = {
    '2S': '\u{1F0A2}',
    '3S': '\u{1F0A3}',
    '4S': '\u{1F0A4}',
    '5S': '\u{1F0A5}',
    '6S': '\u{1F0A6}',
    '7S': '\u{1F0A7}',
    '8S': '\u{1F0A8}',
    '9S': '\u{1F0A9}',
    'TS': '\u{1F0AA}',
    'JS': '\u{1F0AB}',
    'QS': '\u{1F0AD}',
    'KS': '\u{1F0AE}',
    'AS': '\u{1F0A1}',
    '2H': '\u{1F0B2}',
    '3H': '\u{1F0B3}',
    '4H': '\u{1F0B4}',
    '5H': '\u{1F0B5}',
    '6H': '\u{1F0B6}',
    '7H': '\u{1F0B7}',
    '8H': '\u{1F0B8}',
    '9H': '\u{1F0B9}',
    'TH': '\u{1F0BA}',
    'JH': '\u{1F0BB}',
    'QH': '\u{1F0BD}',
    'KH': '\u{1F0BE}',
    'AH': '\u{1F0B1}',
    '2D': '\u{1F0C2}',
    '3D': '\u{1F0C3}',
    '4D': '\u{1F0C4}',
    '5D': '\u{1F0C5}',
    '6D': '\u{1F0C6}',
    '7D': '\u{1F0C7}',
    '8D': '\u{1F0C8}',
    '9D': '\u{1F0C9}',
    'TD': '\u{1F0CA}',
    'JD': '\u{1F0CB}',
    'QD': '\u{1F0CD}',
    'KD': '\u{1F0CE}',
    'AD': '\u{1F0C1}',
    '2C': '\u{1F0D2}',
    '3C': '\u{1F0D3}',
    '4C': '\u{1F0D4}',
    '5C': '\u{1F0D5}',
    '6C': '\u{1F0D6}',
    '7C': '\u{1F0D7}',
    '8C': '\u{1F0D8}',
    '9C': '\u{1F0D9}',
    'TC': '\u{1F0DA}',
    'JC': '\u{1F0DB}',
    'QC': '\u{1F0DD}',
    'KC': '\u{1F0DE}',
    'AC': '\u{1F0D1}',
  };

  const suitUnicode = {
    'Spades': '\u{2660}',
    'Clubs': '\u{2663}',
    'Diamonds': '\u{2662}',
    'Hearts': '\u{2661}',
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Card Preferences</h2>
        {/* <div className="grid grid-cols-13">
            <div>hi</div>
            <div>hello</div>
            <div>friend</div>
        </div> */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {suits.map((suit, suitIndex) => (
            <div className="grid-row" key={suit}>
              {values.map((value, valueIndex) => (
                <div className="flex items-center justify-center m-1" key={value}>
                    {/* {cardUnicode[`${value}${suit.charAt(0)}`]}
                     */
                     `${value}${suitUnicode[suit]}`
                     }
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
        <button onClick={savePreferences} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save Preferences</button>
        <button onClick={onRequestClose} className="bg-gray-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};
