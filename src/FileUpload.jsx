import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDeck } from './DeckContext';

export default function FileUpload() {
  const { userDealt, dealerDealt, rules, updateRules, startTurn, handleExecute, simulateGames, message, setMessage } = useDeck();
  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(0);

  useEffect(() => {
    if(fileUploaded > 0 && startTurn) {
      handleExecute();
    }
  }, [fileUploaded, userDealt]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }


    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/api/upload', formData);
      setMessage('File uploaded successfully!');
      setFileUploaded(oldFileUploaded => (oldFileUploaded + 1));
    } catch (error) {
      setMessage('Error uploading file. Please try again.');
    }
  };



  // const handleExecute = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:5001/execute', { userDealt, dealerDealt });
  //     updateRules(response.data);
  //     console.log('Rules:', response.data);
  //   } catch (error) {
  //     console.error('Execution error:', error);
  //     setMessage('Execution Error');
  //   }
  // };

  return (
    <div className="absolute bottom-0 left-0 p-4 m-4 bg-gray-900 text-white flex flex-col items-center rounded-lg">
      
    <label className="block mb-2 text-white dark:text-white" for="file_input"></label>
    <input
      type="file"
      className="block w-full text-sm bg-neutral-600 cursor-pointer focus:outline-none
                 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0
                 file:text-sm file:bg-neutral-500 file:text-white
                 hover:file:bg-neutral-400 border border-gray-500 rounded-md text-gray-300 font-normal"
      onChange={handleFileChange}
    />
      {/* <input type="file" onChange={handleFileChange} /> */}
      <div className="flex">
      <button onClick={handleFileUpload} className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-lg h-auto m-2 p-2 w-24">
        Upload
      </button>
      <button onClick={handleExecute} className="bg-green-600 hover:bg-green-800 text-white rounded-lg shadow-lg h-auto m-2 p-2 w-24">
        Execute
      </button>
      <button onClick={simulateGames} className="bg-yellow-600 hover:bg-yellow-800 text-white rounded-lg shadow-lg h-auto m-2 p-2 w-24">
        Sim
      </button>
      </div>
      {message && <p className="mt-2">{message}</p>}
      {console.log('hi', rules)}
    </div>
  );
}
