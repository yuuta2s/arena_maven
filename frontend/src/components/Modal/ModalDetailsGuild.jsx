import React from 'react';

const ModalDetailsGuild = ({ showModal, setShowModal, guildDetails }) => {
  if (!showModal || !guildDetails) return null;

  // Parse members string into an array of member IDs
  const members = JSON.parse(guildDetails.members || '[]');

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Détails de la Guilde</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/* Body */}
            <div className="relative p-6 flex-auto">
              <p><strong>Nom:</strong> {guildDetails.name || 'Pas d\'informations'}</p>
              <p><strong>Description:</strong> {guildDetails.description || 'Pas d\'informations'}</p>
              <p><strong>Créateur ID:</strong> {guildDetails.creator_id || 'Pas d\'informations'}</p>
              <p><strong>Nombre de membres:</strong> {members.length || 'Pas d\'informations'}</p>
              <p><strong>Membres:</strong></p>
              <ul>
                {members.length > 0 ? (
                  members.map((memberId, index) => (
                    <li key={index}>{memberId}</li>
                  ))
                ) : (
                  <li>Pas d'informations</li>
                )}
              </ul>
            </div>
            {/* Footer */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ModalDetailsGuild;