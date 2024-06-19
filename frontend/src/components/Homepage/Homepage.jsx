import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import design2 from '../../assets/Rectangle 261.svg';
import mkLogo from '../../assets/mkLogo.png'
import SmallCards from '@components/SmallCards/SmallCards';

export default function Homepage() {

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
    <div className="p-4">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-white">Become an Arena Maven</h1>
        <div className="w-full h-20 flex justify-center absolute top-3.5 right-3.5">
          <img src={design2} alt="Design" />
        </div>
      </div>
      <section className="flex justify-evenly items-center bg-black rounded-lg bg-opacity-40 p-3">
        <div className="p-3">
          <h2 className="text-3xl font-bold text-white p-3">To be or not to be ? That is the question !</h2>
          <div className="flex justify-between items-center gap-3">
            <button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 border-b-4 border-secondary hover:border-tertiary rounded">
              Create a tournament
            </button>
            <button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 border-b-4 border-secondary hover:border-tertiary rounded">
              Find a tournament
            </button>
          </div>
        </div>
        <div>
          <img src={mkLogo} alt="" />
        </div>
      </section>
      <section>
        <article className="mt-8">
          <h2 className="text-3xl text-white">Hottest :</h2>
          {tournaments.length > 0 && (
            <div className="flex flex-wrap items-center justify-evenly">
              {tournaments.slice(-3).map((tournament, index) => (
                <SmallCards tournament={tournament} index={index}></SmallCards>
              ))}
            </div>
          )}
        </article>
        <article className="mt-8">
          <h2 className="text-3xl text-white">Last Chance :</h2>
          {tournaments.length > 0 && (
            <div className="flex flex-wrap items-center justify-evenly">
              {tournaments.slice(-3).map((tournament, index) => (
                <SmallCards tournament={tournament} index={index}></SmallCards>
              ))}
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
