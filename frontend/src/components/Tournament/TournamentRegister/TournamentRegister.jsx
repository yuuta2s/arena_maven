import React, { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useParams } from "react-router-dom";
import ModaliRegisterTournament from "@components/Modals/ModaliRegisterTournament/ModaliRegisterTournament";

const TournamentRegister = () => {

const [showModali, setShowModali]= useState(false);
  const { tournamentId } = useParams(); // Récupère tournamentId depuis les paramètres d'URL
  const [tournament, setTournament] = useState(null);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tournament/${tournamentId}`);
        setTournament(res.data);
      } catch (error) {
        console.error("Error fetching tournament:", error);
      }
    };

    fetchTournament();
  }, [tournamentId]);

  const handleCheckboxChange = () => {
    setAgreed(!agreed);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (agreed && tournament) {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          console.log(decodedToken, "decodedddddddddddddddddddddd000")
          const userId = decodedToken.sub.id;
          console.log(userId, "userIDDDDDDDDDDDDDDDDDDDDDDDD")
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tournament-participation`, {
            user_id: userId ,
            tournament_id: tournament.id,
          });
          console.log(response.data);
          setShowModali(true);
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("Error registering for tournament:", error);
      }
    }
  };

  if (!tournament) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-black text-white p-8 shadow-lg rounded-lg w-full">
      <h2 className="text-xl font-bold mb-4">{tournament.name}</h2>
      <p>{tournament.description}</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="flex items-center mt-4">
            <input
              type="checkbox"
              className="mr-2"
              checked={agreed}
              onChange={handleCheckboxChange}
            />
            J'agrée avec les regles et conditions du tournois
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={!agreed}
        >
          S'inscrire 
        </button>
        <ModaliRegisterTournament showModali={showModali} setShowModali={setShowModali} />
      </form>
    </div>
  );
};

export default TournamentRegister;
