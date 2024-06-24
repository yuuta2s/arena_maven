import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BracketGenerator = () => {
  const { id } = useParams(); // Récupère l'identifiant du tournoi depuis l'URL
  const [participants, setParticipants] = useState([]); // État pour stocker les participants
  const [brackets, setBrackets] = useState([]); // État pour stocker les brackets
  const [currentRound, setCurrentRound] = useState(1); // État pour stocker le numéro de la manche en cours
  const [scores, setScores] = useState([]); // État pour stocker les scores des participants

  // Utilisation d'un effet pour mélanger les participants une seule fois au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/participation/tournament/${id}`);
        console.log(res.data, "data initial");
        setParticipants(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Appel de la fonction fetchData pour récupérer les participants

    // Mélange aléatoire des participants une seule fois au montage du composant
    const shuffledParticipants = shuffleArray(participants);
    generateBrackets(shuffledParticipants);

  }, [id]); // Dépendance vide pour s'assurer que cela ne se produit qu'une seule fois au montage

  // Fonction pour mélanger un tableau
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Fonction pour démarrer le tournoi
  const startTournament = () => {
    const shuffledParticipants = shuffleArray(participants);
    generateBrackets(shuffledParticipants);
  };

  // Fonction pour générer les brackets du tournoi
  const generateBrackets = (participants) => {
    const generatedBrackets = [];
    const initialScores = participants.map(() => 0); // Initialise les scores à 0 pour chaque participant
    setScores(initialScores);

    for (let i = 0; i < participants.length; i += 2) {
      if (participants[i + 1]) {
        generatedBrackets.push([participants[i], participants[i + 1]]);
      } else {
        generatedBrackets.push([participants[i], null]); // Gestion des participants impairs
      }
    }
    setBrackets([generatedBrackets]);
    setCurrentRound(1);
  };

  // Fonction pour gérer les changements de score
  const handleScoreChange = (event, matchIndex, playerIndex) => {
    const { value } = event.target;
    if (value <= 3) {
      setScores((prevScores) => {
        const updatedScores = [...prevScores];
        updatedScores[matchIndex * 2 + playerIndex] = parseInt(value);
        return updatedScores;
      });
    }
  };

  // Fonction pour passer à la manche suivante
  const nextRound = () => {
    const winners = [];
    brackets[currentRound - 1].forEach((match, matchIndex) => {
      const player1 = match[0];
      const player2 = match[1];
      const player1Score = scores[matchIndex * 2];
      const player2Score = scores[matchIndex * 2 + 1];

      if (player1 && player1Score === 3) {
        winners.push(player1);
      }
      if (player2 && player2Score === 3) {
        winners.push(player2);
      }
    });

    if (winners.length === 1) {
      setBrackets((prevBrackets) => [...prevBrackets, [[winners[0], null]]]);
    } else {
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
      const initialScores = winners.map(() => 0); // Réinitialise les scores pour les gagnants
      setScores(initialScores);
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
                  value={scores[matchIndex * 2] || ''}
                  onChange={(e) => handleScoreChange(e, matchIndex, 0)}
                  className="w-16 p-1 text-black rounded"
                  disabled={!match[0]}
                />
                <span className="text-sm text-green-400">vs</span>
                <input
                  type="number"
                  min="0"
                  max="3"
                  value={scores[matchIndex * 2 + 1] || ''}
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
