import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BracketGenerator = () => {
  const { id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [brackets, setBrackets] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [scores, setScores] = useState({});

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/participation/tournament/${id}`);
      console.log(res.data, "data initial");
      setParticipants(res.data);
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

  const startTournament = () => {
    const shuffledParticipants = shuffleArray(participants);
    generateBrackets(shuffledParticipants);
  };

  const generateBrackets = (participants) => {
    const generatedBrackets = [];
    for (let i = 0; i < participants.length; i += 2) {
      if (participants[i + 1]) {
        generatedBrackets.push([participants[i], participants[i + 1]]);
      } else {
        generatedBrackets.push([participants[i], null]);
      }
    }
    setBrackets([generatedBrackets]);
    setCurrentRound(1);
    setScores({});
  };

  const handleScoreChange = (event, playerId) => {
    const { value } = event.target;
    if (value <= 3) {
      setScores((prevScores) => ({
        ...prevScores,
        [playerId]: parseInt(value),
      }));
    }
  };

  const nextRound = () => {
    const winners = [];
    brackets[currentRound - 1].forEach(match => {
      if (match[0] && scores[match[0].id] === 3) {
        winners.push(match[0]);
      }
      if (match[1] && scores[match[1].id] === 3) {
        winners.push(match[1]);
      }
    });

    if (winners.length === 1) {
      setBrackets(prevBrackets => [...prevBrackets, [[winners[0], null]]]);
    } else {
      const newBrackets = [];
      for (let i = 0; i < winners.length; i += 2) {
        if (winners[i + 1]) {
          newBrackets.push([winners[i], winners[i + 1]]);
        } else {
          newBrackets.push([winners[i], null]);
        }
      }
      setBrackets(prevBrackets => [...prevBrackets, newBrackets]);
      setCurrentRound(currentRound + 1);
      setScores({});
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-10 text-center text-green-500">Tournament Brackets</h2>
      <div className="flex justify-center mb-6">
        <button onClick={startTournament} className="bg-green-500 text-white py-2 px-4 rounded">Start Tournament</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-900 text-white rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-6 text-center text-green-400">Matches - Round {currentRound}</h3>
          <ul>
            {brackets[currentRound - 1] && brackets[currentRound - 1].map((match, matchIndex) => (
              <li key={matchIndex} className="flex justify-between items-center p-4 bg-gray-800 rounded-lg mb-4">
                <span className="text-lg font-semibold">{match[0] ? match[0].username : 'Bye'}</span>
                <input
                  type="number"
                  min="0"
                  max="3"
                  value={scores[match[0]?.id] || ''}
                  onChange={(e) => handleScoreChange(e, match[0]?.id)}
                  className="w-16 p-1 text-black rounded"
                  disabled={!match[0]}
                />
                <span className="text-sm text-green-400">vs</span>
                <input
                  type="number"
                  min="0"
                  max="3"
                  value={scores[match[1]?.id] || ''}
                  onChange={(e) => handleScoreChange(e, match[1]?.id)}
                  className="w-16 p-1 text-black rounded"
                  disabled={!match[1]}
                />
                <span className="text-lg font-semibold">{match[1] ? match[1].username : 'Bye'}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-900 text-white rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-6 text-center text-green-400">Results</h3>
          <div className="flex justify-center items-center h-full">
            <span className="text-xl text-gray-500">
              {currentRound === brackets.length && brackets[brackets.length - 1].length === 1 && brackets[brackets.length - 1][0][0] ? `${brackets[brackets.length - 1][0][0].username} won` : 'Results'}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button onClick={nextRound} className="bg-green-500 text-white py-2 px-4 rounded">Next Round</button>
      </div>
    </div>
  );
};

export default BracketGenerator;
