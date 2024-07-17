import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import editIcon from "../../../assets/edit-2-fill.svg";
import deleteIcon from "../../../assets/delete-bin-2-fill.svg";
import CommentSection from '../../CommentSection/CommentSection';
import ModalDeleteTournament from "../ModalDeleteTournament/ModalDeleteTournament";

export default function ModalVisuTournament({ showModal, setShowModal, tournament, remainingSlots, formattedDate }) {
  const [sub, setSub] = useState([]);
  const [isModified, setIsModified] = useState(false);
  const [editedName, setEditedName] = useState(tournament.name);
  const [editedDescription, setEditedDescription] = useState(tournament.short_description);
  const [nameDisplayed, setNameDisplayed] = useState(tournament.name)
  const [descriptionDisplayed, setDescriptionDisplayed] = useState(tournament.short_description)
  const [showPopup, setShowPopup] = useState(false);

  const getToken = () => {
    return localStorage.getItem('token');
  };
  const token = getToken();

  const getUserInfo = () => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken; // { id, username, email, role }
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    }
    return null;
  };
  const userInfo = getUserInfo();

  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tournament/${tournament.id}/user/${userInfo.sub.id}`);
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

  const modalRef = useRef(null);

  useEffect(() => {
    if (!showPopup) {
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
    }
  }, [showModal, setShowModal, showPopup, setShowPopup]);

  const handleEdit = async () => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/tournament/${tournament.id}`, {
        name: editedName,
        short_description: editedDescription
      });
      if (res.status === 204) {
        setNameDisplayed(editedName);
        setDescriptionDisplayed(editedDescription);
        setIsModified(false);
      }
    } catch (error) {
      console.error("Error updating tournament:", error);
    }
  };

  const deleteTournament = async () => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/tournament/${tournament.id}`);
      if (res.status === 204) {
        setShowPopup(false);
        setShowModal(false); // Ferme les deux modals car le tournoi est supprimé
        location.reload();
      }
    } catch (error) {
      console.error("Error deleting tournament:", error);
    }
  };

  return (
    <>
      {showModal ? (
        <>
          {/* Background */}
          <div className="mx-2 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            {/* Modal */}
            <div ref={modalRef} className="relative w-auto my-6 mx-6  border-solid border-2 rounded-lg">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-secondary outline-none focus:outline-none">
                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                  <div className="flex flex-col">
                    {isModified ? (
                      <>
                        <input
                          className="text-3xl font-semibold"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                        />
                      </>
                    ) : (
                      <h3 className="text-3xl font-semibold">
                        {nameDisplayed}
                      </h3>
                    )}
                  </div>
                  <div>
                    {userInfo?.sub?.id === tournament.organizer_id ? (
                      <>
                        <button className="p-1 ml-auto" onClick={() => setIsModified(!isModified)}>
                          <img className="w-6 h-6" src={editIcon} alt="edit icon" />
                        </button>
                        <button className="p-1 ml-auto" onClick={() => setShowPopup(true)}>
                          <img className="w-6 h-6" src={deleteIcon} alt="delete icon" />
                        </button>
                      </>
                    ) : (
                      <span></span>
                    )}
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-terciary text-4xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-terciary h-6 w-6 text-4xl block outline-none focus:outline-none">
                        
                      </span>
                    </button>
                  </div>
                </div>
                {/* Body */}
                <div className="relative flex flex-wrap justify-start items-end">
                  <div className="min-[954px]:border-r min-[954px]:border-solid p-4">
                    <div className="min-w-80 max-h-80 max-w-lg flex justify-center overflow-hidden">
                      <img className="object-cover" src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${tournament.tournament_img}`} alt={`img for ${tournament.name}`} />
                    </div>
                    <div>
                      {!isModified ? (
                        <>
                          <p className="font-semibold">Date de l'événement: </p>
                          <p>{tournament.date?.substring(0, 10)}</p>
                          <p className="font-semibold">Description :</p>
                          <p className="text-sm text-justify">{descriptionDisplayed}</p>
                        </>
                      ) : (
                        <>
                          <p className="font-semibold">Date de l'événement: </p>
                          <p>{tournament.date.substring(0, 10)}</p>
                          <div className="w-full">
                            <label className="font-semibold" htmlFor="tdescription">Description :</label>
                            <textarea
                              className="w-full min-h-16 bg-white text-black p-1 rounded-md"
                              id="tdescription"
                              name="tdescription"
                              placeholder="Description.."
                              onChange={(e) => setEditedDescription(e.target.value)}
                              value={editedDescription}
                            />
                          </div>
                        </>
                      )}
                      <div className="p-4 flex flex-wrap gap-2 justify-start text-black text-sm">
                        <span className="bg-vertBG text-white text-lg font-bold py-1 px-2 rounded-full">
                          Total des joueurs: {tournament.total_players}
                        </span>
                        <span className="bg-vertBG text-white text-lg font-bold py-1 px-2 rounded-full">
                          Places restantes: {remainingSlots >= 0 ? remainingSlots : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <CommentSection tournament={tournament} />
                  </div>
                </div>
                {/* Footer */}
                <div className="flex items-center justify-end p-6 rounded-b border-t border-solid">
                  {!isModified && (
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Fermer
                    </button>
                  )}
                  {isModified && (
                    <button
                      className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleEdit}
                    >
                      Enregistrer
                    </button>
                  )}
                  {!token || !userInfo ? (
                    <Link to="/login">
                      <button className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)}>Se connecter</button>
                    </Link>
                  ) : (
                    remainingSlots > 0 && tournament.date > formattedDate ? (
                      userInfo?.sub?.id === tournament.organizer_id || sub.length !== 0 ? (
                        <button className="cursor-not-allowed bg-grey text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)} disabled>Attendre le début</button>
                      ) : (
                        <Link to="/">
                          <button className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)}>S'inscrire</button>
                        </Link>
                      )
                    ) : userInfo?.sub?.id === tournament.organizer_id ? (
                      <Link to={`/tournament/${tournament.id}`}>
                        <button className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)}>Commencer le tournoi</button>
                      </Link>
                    ) : sub.length !== 0 ? (
                      <Link to={`/tournament/loading`}>
                        <button className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)}>Suivre résultat</button>
                      </Link>
                    ) : (
                      <button className="cursor-not-allowed bg-grey text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)} disabled>Inscription fermée</button>
                    )
                  )}
                </div>
              </div>
            </div>
            <ModalDeleteTournament showPopup={showPopup} setShowPopup={setShowPopup} deleteTournament={deleteTournament} />
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
