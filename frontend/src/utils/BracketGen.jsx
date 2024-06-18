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
  };

  return (
    <div>
      <h2>Brackets</h2>
      <ul>
        {brackets.map((bracket, index) => (
          <li key={index}>
            {bracket[0].username} vs {bracket[1] ? bracket[1].username : 'Bye'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BracketGenerator;
