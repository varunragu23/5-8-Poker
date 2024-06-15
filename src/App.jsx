import Sidebar from './Sidebar';
import DealerHand from './DealerHand';
import Hand from './Hand';
import UserHand from './UserHand';
import UserInfo from './UserInfo';
import Table from './Table';
import { DeckProvider } from './DeckContext';

export default function App() {
  return (
    <div className="relative h-screen flex">
      <DeckProvider>
      <Sidebar />
      <div className="flex-grow flex flex-col justify-center items-center">
        <Hand />
        <Table />
        <UserHand />
      </div>
      </DeckProvider>
    </div>
  );
}