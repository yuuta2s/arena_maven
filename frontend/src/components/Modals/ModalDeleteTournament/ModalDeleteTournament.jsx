import React from "react";

export default function ModalDeleteTournament({ showPopup, setShowPopup, deleteTournament }) {
  return (
    <>
      {showPopup ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl border-solid border-2 rounded-lg">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-secondary outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Warning
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-terciary float-right text-4xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowPopup(false)}
                  >
                    <span className="bg-transparent text-terciary h-6 w-6 text-4xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Attention, vous allez supprimer définitivement le tournoi !
                    Aucun retour en arrière ne sera possible.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowPopup(false)}
                  >
                    Annuler
                  </button>
                  <button
                    className="bg-warning text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-warning outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      deleteTournament();
                      setShowPopup(false);
                    }}
                  >
                    Supprimer
                  </button>
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
