import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-custom-svg bg-cover bg-center py-10 text-gray-300">
      <div className="bg-black mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-center space-x-8 text-center md:text-left">
          <div className="px-2 md:px-4 flex-1 bg-black">
            <div className="max-w-64 mx-auto ">
              <h2 className="text-xl text-primary font-bold mb-4">Services</h2>
              <ul className="space-y-2">
                <li><a href="/decouvrir" className=" text-white hover:text-vertBG">Trouver un tournoi</a></li>
                <li><a href="/tournamentRequest" className=" text-white hover:text-vertBG">Créer un tournoi</a></li>
                <li><a href="#" className=" text-white hover:text-vertBG">Aide</a></li>
              </ul>
            </div>
          </div>
          <div className="px-2 md:px-4 flex-1 ">
            <div className="max-w-64 mx-auto ">
              <h2 className="text-xl font-bold mb-4 text-primary">Arena Maven</h2>
              <ul className="space-y-2">
                <li><a href="/" className="text-white hover:text-vertBG">Accueil</a></li>
                <li><a href="/contact" className="text-white hover:text-vertBG">Contact</a></li> 
              </ul>
            </div>
          </div>
          <div className="px-2 md:px-4 flex-1 ">
            <div className="max-w-64 mx-auto ">
              <h2 className="text-xl font-bold mb-4 text-primary">Autres</h2>
              <ul className="space-y-2">
                <li><a href="/faq" className="text-white hover:text-vertBG">FAQ</a></li>
                <li><a href="/aPropos" className="text-white hover:text-vertBG">A propos</a></li>
                <li><a href="/politique-de-confidentialite" className="text-white hover:text-vertBG">P.D.C</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
