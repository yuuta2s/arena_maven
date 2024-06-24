import React, { useState } from 'react';

const TournamentRegister = () => {
  const [agreed, setAgreed] = useState(false);

  const handleCheckboxChange = () => {
    setAgreed(!agreed);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-black text-white p-8 shadow-lg rounded-lg w-80 h-80">
          <h2 className="text-xl font-bold mb-4">Details</h2>
          <p>Here you can add details about the tournament.
            ne pas oublier de connecter la table tournoi pour y mettre toutes les infos
          </p>
        </div>
        <div className="bg-black text-white p-8 shadow-lg rounded-lg w-80 h-80">
          <h2 className="text-xl font-bold mb-4">Register Now</h2>
          <form>
            <div className="mb-4">
              <p>ici mettre toutes les règles des tournois --en général-- </p>
              <label className="flex items-center mt-4">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={agreed}
                  onChange={handleCheckboxChange}
                />
                I agree with the rules and terms of the tournament
                le button register devrait ajouter le user qui a appuyé dessus a la bdd tournoi participation du tournoi selectionné
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
              disabled={!agreed}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TournamentRegister;