export default function Card({ value }) {
    return (
      <div className="w-20 h-28 bg-white rounded-lg shadow-md flex justify-center items-center text-lg text-gray-800">
        {value}
      </div>
    );
  }