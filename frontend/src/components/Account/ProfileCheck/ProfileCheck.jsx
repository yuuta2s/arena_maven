import React from 'react';
import img from '../../../assets/Rectangle 261.svg';
import img1 from '../../../assets/iconProfile.jpg';

function ProfileCheck() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bigShouldersDisplay text-white p-4">
    <div className="relative flex flex-col w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
      <article className="flex flex-col items-center absolute -mt-20">
        <h1 className="text-4xl text-black -mb-10">Profil du joueur</h1>
        <img src={img} alt="Vecteur rectangle" />
      </article>
    </div>
    <div className="flex flex-col items-start mr-52">
      <h2 className="text-lg text-white bg-black p-2 rounded-lg">Ranking</h2>
      <div className="flex-col text-black">
        <p>Bandai</p>
        <p>Niveau X</p>
      </div>
    </div>
    <div className="flex flex-col items-center">
      <h3 className="text-lg flex text-black ">Préférence</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-4 rounded-lg bg-tertiary">
          <p>Jeux 1</p>
        </div>
        <div className="p-4 rounded-lg bg-tertiary">
          <p>Jeux 2</p>
        </div>
        <div className="p-4 rounded-lg bg-tertiary">
          <p>Jeux 3</p>
        </div>
      </div>
    </div>
    <div className="flex items-center">
        <img src={img1} alt="Photo de profil" className="w-15 h-16 mr-4" />
        <div className="p-4 rounded-lg mb-4 bg-primary">
          <ul>
            <li>Top 10</li>
            <li>Top 100</li>
            <li>Top 1000</li>
            <li>Top 1000 +</li>
          </ul>
        </div>
    <div className="flex flex-col items-center">
      <h3 className="text-lg flex text-black">Carrière</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-4 rounded-lg bg-tertiary">
          <p>Jeux 1</p>
        </div>
        <div className="p-4 rounded-lg bg-tertiary">
          <p>Jeux 2</p>
        </div>
        <div className="p-4 rounded-lg bg-tertiary">
          <p>Jeux 3</p>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-center">
      <h3 className="text-lg flex text-black">Ancien tournois</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-4 rounded-lg bg-tertiary">
          <p>Jeux 1</p>
        </div>
        <div className="p-4 rounded-lg bg-tertiary">
          <p>Jeux 2</p>
        </div>
        <div className="p-4 rounded-lg bg-tertiary">
          <p>Jeux 3</p>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default ProfileCheck;