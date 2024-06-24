import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from '@components/Cards/Cards';
import design2 from '../../../assets/Rectangle 261.svg';

const TournamentList = () => {
  const [tournaments, setTournaments] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tournament");
      const tournamentsData = res.data;

      // Fetch participants pour chaque participants
      const tournamentsWithParticipants = await Promise.all(
        tournamentsData.map(async (tournament) => {
          const participantsRes = await axios.get(`http://localhost:5000/participation/tournament/${tournament.id}`);
          tournament.participants = participantsRes.data;
          return tournament;
        })
      );

      setTournaments(tournamentsWithParticipants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-tr from-black via-vertBG to-black p-4">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-white">Découverte</h1>
        <div className="w-full h-20 flex justify-center absolute top-3.5 right-3.5">
          <img src={design2} alt="Design" /> 
        </div>
      </div>
      <article className="mt-8">
        <h2 className="text-3xl text-white">Tournois à venir :</h2>
        {tournaments.length > 0 ? (
          <div className="flex flex-wrap items-center justify-evenly">
            <Cards tournaments={tournaments} />
          </div>
        ) : (
          <p className="text-white">Aucun tournoi trouvé.</p>
        )}
      </article>
    </div>
  );
}

export default TournamentList;