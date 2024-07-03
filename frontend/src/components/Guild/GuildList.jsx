import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GuildList = () => {
  const [guilds, setGuilds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuilds = async () => {
      try {
        // Récupérer les guildes depuis votre API
        const response = await axios.get('http://localhost:5000/guild');
        console.log('Response data:', response.data);
        setGuilds(response.data);
      } catch (err) {
        console.error('Error fetching guilds:', err);
        setError(err.message || 'Error fetching guilds');
      }
    };

    fetchGuilds();
  }, []);

  console.log('Current guilds state:', guilds);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Si guilds n'est pas un tableau ou est vide
  if (!Array.isArray(guilds) || guilds.length === 0) {
    return <div>No guilds available</div>;
  }

  return (
    <div>
      <h1>Guilds</h1>
      <ul>
        {guilds[0].map((guild) => (
          <li key={guild.id}>
            <h2>{guild.name}</h2>
            <p>{guild.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuildList;