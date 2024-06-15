import Card from './Card.jsx';

export default function DealerHand() {
    return (
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <Card value="D1" />
        <Card value="D2" />
        <Card value="D3" />
        {/* Add more cards as needed */}
      </div>
    );
  }