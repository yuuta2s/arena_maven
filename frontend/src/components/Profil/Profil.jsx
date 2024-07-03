import UserPic from '../../assets/UserPic.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SmallCards from '@components/SmallCards/SmallCards'; // Assurez-vous que le chemin est correct

export default function Profil() {
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get("http://localhost:5000/tournament");
          setTournaments(res.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);

    return (
        <div>
            {/* Profil section */}

            {/* Username */}
            <div className="flex justify-center p-4 mb-4">
                <h2>Username</h2>
            </div>

            {/* User picture */}
            <div className="flex justify-center p-4 mb-4">
                <div className="avatar">
                    <div className="w-40 md:w-60 rounded">
                        <img src={UserPic} alt="User" />
                    </div>
                </div>
            </div>

            {/* Old tournament section */}
            {/* Affichage des tournois dynamiquement */}
            <div className="flex flex-col items-center p-4">
                {/* Tournaments section */}
                <div className="flex flex-wrap justify-center w-full gap-4">
                    {tournaments.map((tournament, index) => (
                        <div key={index} className="max-w-sm overflow-hidden shadow-lg w-full sm:w-auto">
                            <div className="px-6 py-4 bg-secondary">
                                <div className="font-bold text-xl mb-2">{tournament.name}</div>
                                <p className="text-gray-700 text-base">
                                    {tournament.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
