import Sidebar from './Sidebar';
import Hand from './Hand';
import UserHand from './UserHand';
import Table from './Table';
import { DeckProvider } from './DeckContext';
import BetInfo from './BetInfo';
import FileUpload from './FileUpload';
import InfoModal from './InfoModal';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <div className="relative h-screen flex">
      <DeckProvider>
      <InfoModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
        <div className="flex-grow flex flex-col justify-center items-center">
          <Hand />
          <Table />
          <UserHand />
          <BetInfo 

          />
          <FileUpload />
        </div>
      </DeckProvider>
    </div>
  );
}
