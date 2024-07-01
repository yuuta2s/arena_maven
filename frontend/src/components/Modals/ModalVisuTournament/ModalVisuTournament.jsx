import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { Link } from "react-router-dom";
import CommentSection from '../../CommentSection/CommentSection'; // import the CommentSection component

export default function ModalVisuTournament({ showModal, setShowModal, tournament, remainingSlots, formattedDate }) {
  const [sub, setSub] = useState([]);

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

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/tournament/${tournament.id}/user/${userInfo.sub.id}`);
      setSub(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (userInfo && tournament) {
      fetchData();
    }
  }, [userInfo, tournament]);

  console.log("blabla", sub);

  const modalRef = useRef(null); // Create a reference for the modal

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, setShowModal]);

  return (
    <>
      {showModal ? (
        <>
          <div className="mx-2 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div ref={modalRef} className="relative w-auto my-6 mx-auto max-w-lg border-solid border-2 rounded-lg">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-secondary outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {tournament.name}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-terciary float-right text-4xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-terciary h-6 w-6 text-4xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative py-6">
                  <div className="min-w-80 max-h-80 max-w-lg flex justify-center overflow-hidden">
                    <img className="object-cover" src={`http://localhost:5000/uploads/${tournament.tournament_img}`} alt={`img for ${tournament.name}`} />
                  </div>
                  <div className="px-6">
                    <p className="font-semibold">Date de l'événement: </p>
                    <p>{tournament.date.substring(0, 10)}</p>
                    <p className="font-semibold">Description :</p>
                    <p className="text-sm text-justify">{tournament.description}</p>
                    <p className="font-semibold">Nombre de joueurs max : {tournament.max_player}</p>
                    <p className="font-semibold">Place restantes : {remainingSlots}</p>
                    {userInfo && userInfo.role === 'admin' && (
                      <>
                        <Link to={`/modifytournament/${tournament.id}`} className="flex justify-center mt-2">
                          <button className="bg-butterscotch hover:bg-caramel text-white font-bold py-2 px-4 rounded">
                            Modifier le tournoi
                          </button>
                        </Link>
                      </>
                    )}
                    <CommentSection tournament={tournament} />
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b">
                  <p className="my-4 text-lg leading-relaxed w-full">
                    {tournament.short_description}
                  </p>
                  <div className="p-4 flex flex-wrap gap-2 justify-around text-black text-sm">
                    <span className="bg-vertBG text-white text-lg font-bold py-1 px-2 rounded-full">
                      Total des joueurs: {tournament.total_players}
                    </span>
                    <span className="bg-vertBG text-white text-lg font-bold py-1 px-2 rounded-full">
                      Places restantes: {remainingSlots >= 0 ? remainingSlots : 'N/A'}
                    </span>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Fermer
                  </button>
                  {remainingSlots > 0 && tournament.date > formattedDate ? (
                    userInfo.sub.id === tournament.organizer_id || sub.length !== 0 ? (
                      <button className="cursor-not-allowed bg-grey text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)} disabled>Attendre le début</button>
                    ) : (
                      <Link to="/">
                        <button className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)}>S'inscrire</button>
                      </Link>
                    )
                  ) : userInfo.sub.id === tournament.organizer_id ? (
                    <Link to={`/tournament/${tournament.id}`}>
                      <button className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)}>Commencer le tournoi</button>
                    </Link>
                  ) : sub.length !== 0 ? (
                    <Link to={`/tournament/loading`}>
                      <button className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)}>Suivre résultat</button>
                    </Link>
                  ) : (
                    <button className="cursor-not-allowed bg-grey text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)} disabled>Inscription fermée</button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
