import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalDetailsGuild from '../Modal/ModalDetailsGuild';

export default function GuildList() {
  const [guilds, setGuilds] = useState([]);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedGuild, setSelectedGuild] = useState(null);

  useEffect(() => {
    const fetchGuilds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/guild');
        console.log('Response data:', response.data);
        setGuilds(response.data[0]); // Assurez-vous que les guildes sont correctement récupérées depuis l'API
      } catch (err) {
        console.error('Error fetching guilds:', err);
        setError(err.message || 'Error fetching guilds');
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

  console.log('Current guilds state:', guilds);

  const handleViewMore = (guild) => {
    setSelectedGuild(guild);
    setShowModal(true);
  };

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(guilds) || guilds.length === 0) {
    return <div>No guilds available</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Trouvez votre guilde</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guilds.map(guild => (
            <div key={guild.id} className="bg-grey overflow-hidden shadow-md rounded-lg">
              <div className="px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{guild.name}</h2>
                <p className="text-sm text-gray-700 mb-4">{guild.description}</p>
                <div className="text-sm text-gray-500 mb-4">Créé par: {guild.creator_id}</div>
                {guild.image && (
                  <img
                    src={`http://localhost:5000/${guild.image}`}  // Assurez-vous que l'URL est correctement formée
                    alt={guild.name}
                    className="w-full rounded-lg"
                  />
                )}
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleViewMore(guild)}
                >
                  Voir plus
                </button>
                {/* Conditionally render join or leave button based on user's membership */}
                {guild.members && guild.members.includes(userId) ? (
                  <button
                    className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={() => handleLeave(guild.id)}
                  >
                    Désinscription
                  </button>
                ) : (
                  <button
                    className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={() => handleJoin(guild.id)}
                  >
                    Inscription
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ModalDetailsGuild
        showModal={showModal}
        setShowModal={setShowModal}
        guildDetails={selectedGuild}
      />
    </div>
  );
}