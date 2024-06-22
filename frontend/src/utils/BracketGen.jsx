import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BracketGenerator = () => {
  const { id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [brackets, setBrackets] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/participation/tournament/${id}`);
      console.log(res.data, "data initial");
      setParticipants(res.data);

      const shuffledParticipants = shuffleArray(res.data);
      generateBrackets(shuffledParticipants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const generateBrackets = (shuffledParticipants) => {
    const generatedBrackets = [];

    for (let i = 0; i < shuffledParticipants.length; i += 2) {
      if (shuffledParticipants[i + 1]) {
        generatedBrackets.push([shuffledParticipants[i], shuffledParticipants[i + 1]]);
      } else {
        generatedBrackets.push([shuffledParticipants[i], null]);
      }
    }

    setBrackets(generatedBrackets);
    console.log(generatedBrackets, "brackets");
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-10 text-center text-green-500">Tournament Brackets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-900 text-white rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-6 text-center text-green-400">Matches</h3>
          <ul className="space-y-4">
            {brackets.map((bracket, index) => (
              <li key={index} className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                <span className="text-lg font-semibold">{bracket[0].username}</span>
                <span className="text-sm text-green-400">vs</span>
                <span className="text-lg font-semibold">{bracket[1] ? bracket[1].username : 'Bye'}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-900 text-white rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-6 text-center text-green-400">Results</h3>
          <div className="flex justify-center items-center h-full">
            <span className="text-xl text-gray-500">Results</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BracketGenerator;
