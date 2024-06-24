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
      console.log(res.data);
      setParticipants(res.data);

      const sortedParticipants = sortParticipants(res.data);
      generateBrackets(sortedParticipants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const sortParticipants = (participants) => {
    // Sort participants based on some criteria (e.g., ranking or seed)
    // Implement your custom sorting logic here
    return participants.sort(/* your sorting logic */);
  };

  const generateBrackets = (sortedParticipants) => {
    const totalRounds = Math.ceil(Math.log2(sortedParticipants.length));
    const numberOfByes = Math.pow(2, totalRounds) - sortedParticipants.length;

    const generatedBrackets = [];

    let byeIndex = 0;
    for (let round = 0; round < totalRounds; round++) {
      const roundMatches = [];

      for (let match = 0; match < Math.pow(2, totalRounds - round - 1); match++) {
        if (byeIndex < numberOfByes) {
          roundMatches.push([null, sortedParticipants[byeIndex]]);
          byeIndex++;
        } else {
          roundMatches.push([sortedParticipants.shift(), sortedParticipants.shift()]);
        }
      }

      generatedBrackets.push(roundMatches);
    }

    setBrackets(generatedBrackets);
  };

  return (
    
    <div className="mx-auto mx-auto ">
      <h2 className="text-3xl font-bold mb-10 text-center">Tournament Brackets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {brackets.map((round, roundIndex) => (
          <div key={roundIndex} className="bg-gray-800 text-white rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Round {roundIndex + 1}</h3>
            {round.map((match, matchIndex) => (
              <div key={matchIndex} className="mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">{match[0] ? match[0].username : 'Bye'}</span>
                  <span className="text-sm">vs</span>
                  <span className="text-lg font-semibold">{match[1] ? match[1].username : 'Bye'}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BracketGenerator;