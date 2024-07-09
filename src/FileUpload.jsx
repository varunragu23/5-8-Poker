import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDeck } from './DeckContext';

export default function FileUpload() {
  const { deck, userDealt, dealerDealt, rules, updateRules, startTurn,  message, setMessage } = useDeck();
  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  useEffect(() => {
    if((fileUploaded) && startTurn) {
      handleFileUploadAndExecute();
    }
  }, [fileUploaded, userDealt]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleExecute = async () => {
    try {
      console.log('I HAVE BEEN CALLED');
      const response = await axios.post('/api/execute', { userDealt, dealerDealt });
      updateRules(response.data);
      console.log('Rules:', response.data);
    } catch (error) {
      console.error('Execution error:', error);
      // setMessage('Execution Error');
    }
  };

  const simulateGames = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('simulationData', JSON.stringify({ initialDeck: deck, numGames: 500 }));
  
    try {
      const response = await axios.post('/api/simulate', formData);
      const { winPercentage } = response.data;
  
      if (typeof winPercentage === 'number') {
        let pct = winPercentage.toFixed(1);
        console.log(`Win percentage: ${pct}%`);
        setMessage(`Win percentage: ${pct}%`);
      } else {
        console.error('Invalid winPercentage:', winPercentage);
        setMessage('Simulation Error');
      }
    } catch (error) {
      console.error('Simulation error:', error);
      setMessage('Simulation Error');
    }
  };
  
  

  // const handleFileUpload = async () => {
  //   if (!file) {
  //     setMessage('Please select a file to upload.');
  //     return;
  //   }


  //   const formData = new FormData();
  //   formData.append('file', file);

  //   try {
  //     await axios.post('/api/upload', formData);
  //     setMessage('File uploaded successfully!');
  //     setFileUploaded(oldFileUploaded => (oldFileUploaded + 1));
  //   } catch (error) {
  //     setMessage('Error uploading file. Please try again.');
  //   }
  // };

  const handleFileUploadAndExecute = async () => {
    console.log('i have been called lololol', userDealt, dealerDealt);
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify({ userDealt, dealerDealt }));
  
    try {
      const response = await axios.post('/api/uploadExecute', formData);
      updateRules(response.data);
      setMessage('File executed successfully!');
      setFileUploaded(true);
    } catch (error) {
      setMessage('Error uploading or executing file. Please try again.');
      console.error('Upload/Execute error:', error);
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
      <button onClick={handleFileUploadAndExecute} className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-lg h-auto m-2 p-2 w-24">
        Upload
      </button>
      {/* <button onClick={handleExecute} className="bg-green-600 hover:bg-green-800 text-white rounded-lg shadow-lg h-auto m-2 p-2 w-24">
        Execute
      </button> */}
      <button onClick={simulateGames} className="bg-green-700 hover:bg-yellow-800 text-white rounded-lg shadow-lg h-auto m-2 p-2 w-24">
        Sim
      </button>
      </div>
      {message && <p className="mt-2">{message}</p>}
      {console.log('hi', rules)}
    </div>
  );
}
