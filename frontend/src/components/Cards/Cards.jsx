import "./cards.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Cards = () => {
  const [tournaments, setTournaments] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tournament");
      console.log(res.data);
      setTournaments(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-5 pt-16">
      {tournaments.map((item) => (
        <div
          key={item.id}
          className="max-w-sm rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-105 card-custom-bg"
        >
          <a href={item.details} className="flex flex-col justify-between h-full">
            <div className="relative">
              <img
                className="w-full h-36 object-cover rounded-t-lg"
                src={item.tournament_img}
                alt={item.name}
              />
              {item.registration_open ? (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                  Registration Open
                </span>
              ) : (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                  Registration Closed
                </span>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-white text-black text-center text-sm py-1">
                Date de l'événement: {item.date}
              </div>
            </div>
            <div className="p-4">
              <h5 className="text-xl font-bold mb-2">{item.name}</h5>
              <p className="text-base text-gray-700">{item.short_description}</p>
            </div>
            <div className="flex justify-center p-4">
              <button className="w-full text-sm bg-black text-white rounded-full px-2 py-1">
                S'inscrire
              </button>
            </div>
            <div className="p-4 flex justify-between text-black text-sm">
            <span className="bg-vertBG text-white text-xs font-bold py-1 px-2 rounded-full">
          Total des joueurs: {item.total_players}
        </span>
        <span className="bg-vertBG text-white text-xs font-bold py-1 px-2 rounded-full">
          Places restantes: {item.remaining_slots}
        </span>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default Cards;