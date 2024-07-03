// import React from 'react';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import SmallCards from '@components/SmallCards/SmallCards';

// export default function MyTournament() {

//     const [inscription, setInscription] = useState([]);
//     const [creation, setCreation] = useState([]);

//     const getToken = () => {
//         return localStorage.getItem('token');
//       };
    
//       const getUserInfo = () => {
//         const token = getToken();
//         if (token) {
//           const decodedToken = jwtDecode(token);
//           return decodedToken; // { id, username, email, role }
//         }
//         return null;
//       };
    
//       const userInfo = getUserInfo();

//       const fetchDataInscription = async () => {
//         try {
//           const res = await axios.get(`http://localhost:5000/user/registered-tournaments/${userInfo.sub.id}`);
        
//           setInscription(res.data);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };

//       const fetchDataCreation = async () => {
//         try {
//           const res = await axios.get(`http://localhost:5000/user/created-tournaments/${userInfo.sub.id}`);
        
//           setCreation(res.data);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };

//       useEffect(() => {
//         fetchDataInscription();
//         fetchDataCreation();
//       }, []);
    
//       return (
//         <div>
//             <div className="flex flex-col items-center sm:max-w-md md:max-w-xl lg:max-w-4xl mt- mb-24 pb-4 sm:pb-6 md:pb-10 lg:pb-14 mx-auto bg-no-repeat bg-bottom bg-underline-title bg-contain ">
//                 <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white ">Mes Tournois</h1>
//             </div>
//             <section className="max-w-7xl mx-auto">
//                 <article className="mt-8">
//                     <h2 className="text-3xl text-white">Tournois effectués :</h2>
//                     <div className="flex flex-wrap items-center justify-evenly">
//                         {inscription.length === 0 ? (
//                             <p className="text-white">Pas de tournois</p>
//                         ) : (
//                             inscription.map((tournament, index) => (
//                                 <SmallCards tournament={tournament} index={index} />
//                             ))
//                         )}
//                     </div>
//                 </article>
//                 <article className="mt-8">
//                     <h2 className="text-3xl text-white">Tournois créés :</h2>
//                     <div className="flex flex-wrap items-center justify-evenly">
//                         {creation.length === 0 ? (
//                             <p className="text-white">Pas de tournois</p>
//                         ) : (
//                             creation.map((tournament, index) => (
//                                 <SmallCards tournament={tournament} index={index} />
//                             ))
//                         )}
//                     </div>
//                 </article>
//             </section>
//         </div>
//     );
// }



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const GuildList = () => {
//   const [guilds, setGuilds] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchGuilds = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/guild');
//         console.log('Response data:', response.data);
//         setGuilds(response.data);
//       } catch (err) {
//         console.error('Error fetching guilds:', err);
//         setError(err.message || 'Error fetching guilds');
//       }
//     };

//     fetchGuilds();
//   }, []);

//   console.log('Current guilds state:', guilds);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!Array.isArray(guilds) || guilds.length === 0) {
//     return <div>No guilds available</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="mt-12">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">Liste des Guildes</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {guilds.map((guild) => (
//             <div key={guild.id} className="bg-white overflow-hidden shadow rounded-lg">
//               <div className="px-4 py-5 sm:p-6">
//                 <h2 className="text-lg font-bold text-gray-900 mb-2">{guild.name}</h2>
//                 <p className="text-sm text-gray-500 mb-4">{guild.description}</p>
//                 <div className="flex justify-end">
//                   <button
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     onClick={() => {/* action onClick */}}
//                   >
//                     Voir plus
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GuildList;

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
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Créé par: {guild.creator_id}</div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => {/* action onClick */}}
                  >
                    Voir plus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuildList;