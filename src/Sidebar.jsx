import { useState } from 'react';
import { useDeck } from './DeckContext';
import CardPreferenceModal from './CardPreferenceModal';

const suits = ['C', 'D', 'H', 'S'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];



export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('main');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {rules, updateRules} = useDeck();

  const [selectedCards, setSelectedCards] = useState(rules);

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

  console.log(selectedCards['4H']);
  console.log(rules['4H']);

  const renderContent = () => {
    switch (currentTab) {
      case 'main':
        return (
          <div>
            <button className="p-2 w-full bg-gray-500 mb-4" onClick={() => setIsOpen(!isOpen)}>Back</button>
            <button className="p-2 w-full bg-blue-500 mb-4" onClick={() => setCurrentTab('rules')}>Game Rules</button>
            <button className="p-2 w-full bg-green-500" onClick={() => setIsModalOpen(true)}>Select Cards</button>
          </div>
        );
      case 'rules':
        return (
          <div>
            <button className="p-2 w-full bg-gray-500 mb-4" onClick={() => setCurrentTab('main')}>Back</button>
            <div className="text-white">
              <h2 className="text-lg font-bold mb-4">Game Rules</h2>
              <p>The rules of the game can be found <a href="https://nwatx.me/post/jspokergame" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
        here
      </a></p>
            </div>
          </div>
        );
        case 'preferences':
        return (
            <div>
            <button className="p-2 w-full bg-gray-500 mb-4" onClick={() => setCurrentTab('main')}>Back</button>
            <div className="text-white">
                <h2 className="text-lg font-bold mb-4">Card Preferences</h2>
                <button onClick={() => setIsModalOpen(true)}>Click me to change Card Preferences!</button>
            </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative z-10">
      <input type="checkbox" id="menu-toggle" className="hidden peer" />
      <label
        htmlFor="menu-toggle"
        className="p-2 m-4 text-white rounded-md cursor-pointer peer-focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col justify-between h-6 m-2">
          <div className="w-8 h-1 bg-gray-300"></div>
          <div className="w-8 h-1 bg-gray-300"></div>
          <div className="w-8 h-1 bg-gray-300"></div>
        </div>
      </label>
      {isOpen && (
        <div className="absolute left-0 top-0 h-full w-64 bg-gray-800 text-white p-4 shadow-lg">
          {renderContent()}
        </div>
      )}
      <CardPreferenceModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        preferences={selectedCards}
        handleCheckboxChange={handleCheckboxChange}
        savePreferences={savePreferences}
      />
      {/* {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Card Preferences Changed</h2>
            <p className="mb-4">You have changed the rules!</p>
            <button className="bg-blue-500 text-white p-2 rounded" onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )} */}
    </div>
  );
}
