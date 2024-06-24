import { useEffect, useState } from 'react';
import axios from 'axios';


export default function SmallCards({ tournament, index }) {
  const [participants, setParticipants] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/participation/tournament/${tournament.id}`);
      
        console.log(res.data);
        setParticipants(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

    return (
        <div key={index} className="relative w-96 h-48 overflow-hidden rounded-lg m-5">
          <h3 className="text-xl text-white absolute bottom-2 left-2 bg-black rounded-lg bg-opacity-40 p-1">{tournament.name}</h3>
          {tournament.total_players > participants.length && tournament.date > formattedDate ? (
                <span className="absolute top-2 right-2 bg-primary text-white text-xs font-bold py-1 px-2 rounded-full">
                  Registration Open
                </span>
              ) : (
                <span className="absolute top-2 right-2 bg-warning text-white text-xs font-bold py-1 px-2 rounded-full">
                  Registration Closed
                </span>
              )}
          <img  className="w-full h-full object-cover" src={`http://localhost:5000/uploads/${tournament.tournament_img}`} alt={`image tournois ${tournament.name}`} />
        </div>
    );
  }
  