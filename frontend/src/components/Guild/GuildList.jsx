import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GuildList() {
  const [guilds, setGuilds] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchGuilds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/guild');
        setGuilds(response.data);
      } catch (error) {
        console.error('Error fetching guilds:', error);
      }
    };

    // Retrieve user ID from token
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const tokenPayload = token.split('.')[1];
        const decodedToken = JSON.parse(atob(tokenPayload));
        setUserId(decodedToken.sub.id);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

    fetchGuilds();
  }, []);

  const handleJoin = async (guildId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/guild/${guildId}/join`, { userId }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Update guild list or state after joining
      setGuilds(prevGuilds => {
        return prevGuilds.map(guild => {
          if (guild.id === guildId) {
            return { ...guild, members: [...guild.members, userId] };
          }
          return guild;
        });
      });
    } catch (error) {
      console.error('Error joining guild:', error);
    }
  };

  const handleLeave = async (guildId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/guild/${guildId}/leave`, { userId }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Update guild list or state after leaving
      setGuilds(prevGuilds => {
        return prevGuilds.map(guild => {
          if (guild.id === guildId) {
            return { ...guild, members: guild.members.filter(memberId => memberId !== userId) };
          }
          return guild;
        });
      });
    } catch (error) {
      console.error('Error leaving guild:', error);
    }
  };

  return (
    <div className="guild-list">
      {guilds.map(guild => (
        <div key={guild.id} className="guild-card bg-primary rounded-xl m-5 p-5">
          <h2 className="guild-name">{guild.name}</h2>
          <p className="guild-description">{guild.description}</p>
          <button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded">
            Voir Plus
          </button>
          {/* Conditionally render join or leave button based on user's membership */}
          {guild.members && guild.members.includes(userId) ? (
            <button
              className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => handleLeave(guild.id)}
            >
              Désinscription
            </button>
          ) : (
            <button
              className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => handleJoin(guild.id)}
            >
              Inscription
            </button>
          )}
        </div>
      ))}
    </div>
  );
}