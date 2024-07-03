import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import SmallCards from '@components/SmallCards/SmallCards';

export default function MyTournament() {

    const [inscription, setInscription] = useState([]);
    const [creation, setCreation] = useState([]);

    const getToken = () => {
        return localStorage.getItem('token');
      };
    
      const getUserInfo = () => {
        const token = getToken();
        if (token) {
          const decodedToken = jwtDecode(token);
          return decodedToken; // { id, username, email, role }
        }
        return null;
      };
    
      const userInfo = getUserInfo();

      const fetchDataInscription = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/user/registered-tournaments/${userInfo.sub.id}`);
        
          setInscription(res.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const fetchDataCreation = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/user/created-tournaments/${userInfo.sub.id}`);
        
          setCreation(res.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      useEffect(() => {
        fetchDataInscription();
        fetchDataCreation();
      }, []);
    
      return (
        <div>
            <div className="flex flex-col items-center sm:max-w-md md:max-w-xl lg:max-w-4xl mt- mb-24 pb-4 sm:pb-6 md:pb-10 lg:pb-14 mx-auto bg-no-repeat bg-bottom bg-underline-title bg-contain ">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white ">Mes Tournois</h1>
            </div>
            <section className="max-w-7xl mx-auto">
                <article className="mt-8">
                    <h2 className="text-3xl text-white">Tournois effectués :</h2>
                    <div className="flex flex-wrap items-center justify-evenly">
                        {inscription.length === 0 ? (
                            <p className="text-white">Pas de tournois</p>
                        ) : (
                            inscription.map((tournament, index) => (
                                <SmallCards tournament={tournament} index={index} />
                            ))
                        )}
                    </div>
                </article>
                <article className="mt-8">
                    <h2 className="text-3xl text-white">Tournois créés :</h2>
                    <div className="flex flex-wrap items-center justify-evenly">
                        {creation.length === 0 ? (
                            <p className="text-white">Pas de tournois</p>
                        ) : (
                            creation.map((tournament, index) => (
                                <SmallCards tournament={tournament} index={index} />
                            ))
                        )}
                    </div>
                </article>
            </section>
        </div>
    );
}



