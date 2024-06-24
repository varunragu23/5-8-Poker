import Sidebar from './Sidebar';
import Hand from './Hand';
import UserHand from './UserHand';
import Table from './Table';
import { DeckProvider } from './DeckContext';
import BetInfo from './BetInfo';

export default function App() {
  return (
    <div className="relative h-screen flex">
      <DeckProvider>
      {/* <Sidebar /> */}
      <div className="flex-grow flex flex-col justify-center items-center">
        <Hand />
        <Table />
        <UserHand />
        <BetInfo />
      </div>
      </DeckProvider>
    </div>
  );
}