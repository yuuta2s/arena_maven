import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BracketGenerator = () => {
  const { id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [brackets, setBrackets] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [scores, setScores] = useState([]);
  const [results, setResults] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/participation/tournament/${id}`);
        setParticipants(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

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
    const initialScores = participants.map(() => [0, 0]);
    setScores(initialScores);

    for (let i = 0; i < participants.length; i += 2) {
      if (participants[i + 1]) {
        generatedBrackets.push([participants[i], participants[i + 1]]);
      } else {
        generatedBrackets.push([participants[i], null]);
      }
    }
    setBrackets([generatedBrackets]);
    setCurrentRound(1);
    setResults([]);
    setWinner(null);
  };

  const handleScoreChange = (event, matchIndex, playerIndex) => {
    const { value } = event.target;
    if (value >= 0 && value <= 3) {
      setScores((prevScores) => {
        const updatedScores = [...prevScores];
        updatedScores[matchIndex][playerIndex] = parseInt(value);
        return updatedScores;
      });
    }
  };

  const nextRound = () => {
    const winners = [];
    const currentMatches = brackets[currentRound - 1];
    const roundResults = [];

    currentMatches.forEach((match, matchIndex) => {
      const player1 = match[0];
      const player2 = match[1];
      const player1Score = scores[matchIndex][0];
      const player2Score = scores[matchIndex][1];

      if (player1 && player1Score === 3) {
        winners.push(player1);
      }
      if (player2 && player2Score === 3) {
        winners.push(player2);
      }

      roundResults.push({
        matchIndex,
        player1,
        player1Score,
        player2,
        player2Score,
      });
    });

    setResults((prevResults) => [...prevResults, { round: currentRound, matches: roundResults }]);

    if (winners.length === 1) {
      setWinner(winners[0]);
      setBrackets((prevBrackets) => [...prevBrackets, [[winners[0], null]]]);
    } else if (winners.length > 1) {
      const newBrackets = [];
      for (let i = 0; i < winners.length; i += 2) {
        if (winners[i + 1]) {
          newBrackets.push([winners[i], winners[i + 1]]);
        } else {
          newBrackets.push([winners[i], null]);
        }
      }
      setBrackets((prevBrackets) => [...prevBrackets, newBrackets]);
      setCurrentRound(currentRound + 1);
      const initialScores = winners.map(() => [0, 0]);
      setScores(initialScores);
    } else {
      setWinner(null);
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
                  value={scores[matchIndex] ? scores[matchIndex][0] : ''}
                  onChange={(e) => handleScoreChange(e, matchIndex, 0)}
                  className="w-16 p-1 text-black rounded"
                  disabled={!match[0]}
                />
                <span className="text-sm text-green-400">vs</span>
                <input
                  type="number"
                  min="0"
                  max="3"
                  value={scores[matchIndex] ? scores[matchIndex][1] : ''}
                  onChange={(e) => handleScoreChange(e, matchIndex, 1)}
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
          <div className="flex flex-col justify-center items-center h-full">
            {winner ? (
              <span className="text-xl text-gray-500">{winner.username} won</span>
            ) : (
              results.map((result, roundIndex) => (
                <div key={roundIndex} className="mb-4">
                  <h4 className="text-lg font-semibold text-green-400">Round {result.round}</h4>
                  <ul>
                    {result.matches.map((match, matchIndex) => (
                      <li key={matchIndex} className="flex justify-between items-center p-2 bg-gray-800 rounded-lg mb-2">
                        <span>{match.player1 ? match.player1.username : 'Bye'}: {match.player1Score}</span>
                        <span className="text-sm text-green-400">vs</span>
                        <span>{match.player2 ? match.player2.username : 'Bye'}: {match.player2Score}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
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
