import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GuildList = () => {
  const [guilds, setGuilds] = useState([]);
  const [error, setError] = useState(null);

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

    fetchGuilds();
  }, []);

  console.log('Current guilds state:', guilds);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(guilds) || guilds.length === 0) {
    return <div>No guilds available</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Liste des Guildes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guilds.map((guild) => (
            <div key={guild.id} className="bg-white overflow-hidden shadow-md rounded-lg">
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
                  onClick={() => {/* action onClick */}}
                >
                  Voir plus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuildList;