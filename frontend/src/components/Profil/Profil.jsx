import { useEffect, useState } from 'react';
import axios from 'axios';
import SmallCards from '@components/SmallCards/SmallCards';
import { filterInscriptionsOuvertes } from '../../services/filterInscriptionsOuvertes';

export default function Profil() {
    const [tournaments, setTournaments] = useState([]);
    const [participantsData, setParticipantsData] = useState({});
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tournament`);
                setTournaments(res.data);

                const participantsPromises = res.data.map(tournament =>
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/participation/tournament/${tournament.id}`)
                );
                const participantsResponses = await Promise.all(participantsPromises);
                const participantsData = participantsResponses.reduce((acc, res) => {
                    acc[res.data.tournament_id] = res.data;
                    return acc;
                }, {});
                setParticipantsData(participantsData);
            } catch (error) {
                console.error("Error fetching tournaments:", error);
            }
        };

        const fetchUser = async () => {
            try {
                const userId = 33;
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`);
                console.log("User data:", res.data);
                setUser(res.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchTournaments();
        fetchUser();
    }, []);

    const filterInscriptionsFermées = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        return tournaments.filter(tournament => {
            const participants = participantsData[tournament.id] || [];
            return !(tournament.total_players > participants.length && tournament.date > formattedDate);
        });
    };

    return (
        <div>
            {/* Profil section */}

            {/* Username */}
            <div className="flex justify-center p-4 mb-4">
                <h2>{user ? user.username : 'Loading...'}</h2>
            </div>

            {/* User picture */}
            <div className="flex justify-center p-4 mb-4">
                <div className="avatar">
                    <div className="w-40 md:w-60 rounded">
                        {/* <img src={UserPic} alt="User" /> */}
                    </div>
                </div>
            </div>

            {/* Current tournament section */}
            <div className="flex justify-center p-4 mb-4">
                <button className="relative h-[50px] overflow-hidden bg-opacity-0 px-3 text-white border-l-4 border-primary shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-primary before:transition-all before:duration-500 hover:text-white hover:shadow-[0_0_20px_rgba(0,0,0,0.8),0_0_20px_var(--tw-shadow-color)] hover:shadow-secondary hover:before:left-0 hover:before:w-full">
                    <span className="relative z-10">Tournois en cours</span>
                </button>
            </div>

            {/* Affichage des tournois en cours (inscriptions ouvertes) */}
            <div className="flex flex-col items-center p-4">
                <div className="flex flex-wrap justify-center w-full gap-4">
                    {filterInscriptionsOuvertes(tournaments, participantsData).map((tournament, index) => (
                        <SmallCards key={tournament.id} tournament={tournament} index={index} />
                    ))}
                </div>
            </div>

            {/* Old tournament section */}
            <div className="flex justify-center p-4 mb-4">
                <button className="relative h-[50px] overflow-hidden bg-opacity-0 px-3 text-white border-l-4 border-primary shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-primary before:transition-all before:duration-500 hover:text-white hover:shadow-[0_0_20px_rgba(0,0,0,0.8),0_0_20px_var(--tw-shadow-color)] hover:shadow-secondary hover:before:left-0 hover:before:w-full">
                    <span className="relative z-10">Anciens tournois</span>
                </button>
            </div>

            {/* Affichage des anciens tournois (inscriptions fermées) */}
            <div className="flex flex-col items-center p-4">
                <div className="flex flex-wrap justify-center w-full gap-4">
                    {filterInscriptionsFermées().map((tournament, index) => (
                        <SmallCards key={tournament.id} tournament={tournament} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
