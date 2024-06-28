import React from "react";
import { Link } from "react-router-dom";

export default function ModalVisuTournament({ showModal, setShowModal, tournament, remainingSlots, formattedDate }) {
  return (
    <>
      {showModal ? (
        <>
          <div
            className=" mx-2 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-lg border-solid border-2 rounded-lg">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-secondary outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {tournament.name}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-terciary  float-right text-4xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-terciary h-6 w-6 text-4xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative py-6">
                    <div className="min-w-80 max-h-80 max-w-lg flex justify-center overflow-hidden">
                        <img className="object-cover" src={`http://localhost:5000/uploads/${tournament.tournament_img}`} alt={`img for ${tournament.name}`} />
                    </div>
                    <div className="px-6">
                        <p className="font-semibold">Date de l'événement: </p> 
                        <p>{tournament.date.substring(0, 10)}</p>
                        <p className="font-semibold">Description :</p>
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
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6  rounded-b">
                  <button
                    className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Fermer
                  </button>
                  {remainingSlots > 0 && tournament.date > formattedDate ? (
                    <Link to="/">
                        <button
                        className="bg-primary text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                        >
                        S'inscrire
                        </button>
                    </Link>
                  ) : (
                    <button
                    className="cursor-not-allowed bg-grey text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                    disabled
                    >
                    Inscription fermé
                    </button>
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