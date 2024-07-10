// import React from 'react';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import design2 from '../../assets/Rectangle 261.svg';
// import { Link } from 'react-router-dom';
// import mkLogo from '../../assets/mkLogo.png'
// import SmallCards from '@components/SmallCards/SmallCards';

// export default function Homepage() {

//   const [tournaments, setTournaments] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("${import.meta.env.VITE_BACKEND_URL}/tournament");
      
//         console.log(res.data);
//         setTournaments(res.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);


  

//   return (
//     <div className="p-4">

//       <div className="flex flex-col items-center mb-24 bg-underline-title bg-no-repeat bg-bottom pb-14">
//         <h1 className="text-7xl font-bold text-white">Become an Arena Maven</h1>
//       </div>
//       <section className="flex justify-between items-center bg-black rounded-lg bg-opacity-40 p-6 max-w-7xl h-128 mx-auto">
//         <div className="p-3 max-w-3xl">
//           <h2 className="text-4xl font-bold text-white p-5">To be or not to be ? That is the question !</h2>
//           <p className="text-white text-xl p-5">Bienvenue sur Arena Maven, la plateforme ultime pour créer et participer aux tournois de Tekken 8. Rejoignez la communauté des champions et montrez vos compétences dans l'arène !</p>
//           <div className="flex flex-wrap justify-between items-center gap-3 p-5">
//             <Link to="/tournamentRequest">
//               <button className="bg-primary hover:bg-secondary text-2xl text-white font-bold py-2 px-4 border-b-4 border-secondary hover:border-tertiary rounded">
//                 Create a tournament
//               </button>
//             </Link>
//             <Link to="/tournamentRegister">
//               <button className="bg-primary hover:bg-secondary text-2xl text-white font-bold py-2 px-4 border-b-4 border-secondary hover:border-tertiary rounded">
//                 Find a tournament
//               </button>
//             </Link>
//           </div>
//         </div>
//         <div>
//           <img src={mkLogo} alt="Logo Mortal Kombat" />
//         </div>
//       </section>
//       <section className="max-w-7xl mx-auto">
//         <article className="mt-8">
//           <h2 className="text-3xl text-white">Novelty :</h2>
//           {tournaments.length > 0 && (
//             <div className="flex flex-wrap items-center justify-evenly">
//               {tournaments.slice(-3).reverse().map((tournament, index) => (
//                 <SmallCards tournament={tournament} index={index}></SmallCards>
//               ))}
//             </div>
//           )}
//         </article>
//         <article className="mt-8">
//           <h2 className="text-3xl text-white">Last Chance :</h2>
//           {tournaments.length > 0 && (
//             <div className="flex flex-wrap items-center justify-evenly">
//               {tournaments.slice(0, 3).map((tournament, index) => (
//                 <SmallCards tournament={tournament} index={index}></SmallCards>
//               ))}
//             </div>
//           )}
//         </article>
//       </section>
//     </div>
//   );
// }


// src/components/Homepage/Homepage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import SmallCards from '../SmallCards/SmallCards';

export default function Homepage() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tournament`);
        console.log(res.data);
        setTournaments(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-col items-center mb-24 bg-underline-title bg-no-repeat bg-bottom pb-14">
        <h1 className="text-7xl font-bold text-white">Become an Arena Maven</h1>
      </div>
      <section className="flex justify-between items-center bg-black rounded-lg bg-opacity-40 p-6 max-w-7xl h-128 mx-auto">
        <div className="p-3 max-w-3xl">
          <h2 className="text-4xl font-bold text-white p-5">To be or not to be? That is the question!</h2>
          <p className="text-white text-xl p-5">Bienvenue sur Arena Maven, la plateforme ultime pour créer et participer aux tournois de Tekken 8. Rejoignez la communauté des champions et montrez vos compétences dans l'arène!</p>
          <div className="flex flex-wrap justify-between items-center gap-3 p-5">
            <Link to="/tournamentRequest">
              <button className="bg-primary hover:bg-secondary text-2xl text-white font-bold py-2 px-4 border-b-4 border-secondary hover:border-tertiary rounded">
              Créer un tournois
              </button>
            </Link>
            <Link to="/tournamentRegister">
              <button className="bg-primary hover:bg-secondary text-2xl text-white font-bold py-2 px-4 border-b-4 border-secondary hover:border-tertiary rounded">
                Trouver un tournois
              </button>
            </Link>
          </div>
        </div>
        <div>
  
        </div>
      </section>
      <section className="max-w-7xl mx-auto">
        <article className="mt-8">

          <h2 className="text-3xl text-white">Novelty:</h2>
          <h2 className="text-3xl text-white">Nouveautés :</h2>
          {tournaments.length > 0 && (
            <div className="flex flex-wrap items-center justify-evenly">
              {tournaments.slice(-3).reverse().map((tournament, index) => (
                <SmallCards key={index} tournament={tournament} index={index} />
              ))}
            </div>
          )}
        </article>
        <article className="mt-8">
          <h2 className="text-3xl text-white">Last Chance:</h2>
          <h2 className="text-3xl text-white">Dernières chances :</h2>
          {tournaments.length > 0 && (
            <div className="flex flex-wrap items-center justify-evenly">
              {tournaments.slice(0, 3).map((tournament, index) => (
                <SmallCards key={index} tournament={tournament} index={index} />
              ))}
            </div>
          )}
        </article>
      </section>
    </div>
  );
}