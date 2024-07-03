import UserPic from '../../assets/UserPic.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SmallCards from '@components/SmallCards/SmallCards';

export default function Profil() {
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/tournament");
                console.log(res.data);
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

            {/* Button section */}
            <div className="flex justify-center p-4 mb-4">
                <button className="relative h-[50px] overflow-hidden bg-opacity-0 px-3 text-white border-l-4 border-primary shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-primary before:transition-all before:duration-500 hover:text-white hover:shadow-[0_0_20px_rgba(0,0,0,0.8),0_0_20px_var(--tw-shadow-color)] hover:shadow-secondary hover:before:left-0 hover:before:w-full">
                    <span className="relative z-10">Anciens tournois</span>
                </button>
            </div>

            {/* New tournament section */}
            <div className="flex flex-col items-center p-4">
                {/* Tournaments section */}
                <div className="flex flex-wrap justify-center w-full gap-4">
                    {tournaments.map((tournament, index) => (
                        <SmallCards key={tournament.id} tournament={tournament} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
