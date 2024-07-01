import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import './Loading.css'; // Ideally, move the styles to a separate CSS file

const LoadingUser = () => {
  const hintRefs = useRef([]);

  useEffect(() => {
    let hintCounter = 1;

    const interval = setInterval(() => {
      $(`.hint-text:nth-child(${hintCounter})`).fadeOut(999);
      hintCounter++;

      if (hintCounter === 5) {
        hintCounter = 1;
      }

      setTimeout(() => {
        $(`.hint-text:nth-child(${hintCounter})`).fadeIn(500);
      }, 1000);
    }, 6000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div id="main-loader">
      <div className="loader-parent">
        <div className="loader-left">
          <div className="cnt1">
            <div className="cnt2">
              <div id="loader">
              </div>
            </div>
          </div>
        </div>
        <div className="loader-right">
          <div className="cnt1">
            <div className="cnt2">
              <div className="loader-hints">
                <div className="hints">
                  <div className="hint-title">
                    <h3>Tournoi en cours...</h3>
                  </div>
                  <div className="hint-description">
                    <p className="hint-text" ref={(el) => hintRefs.current[0] = el}>
                      A vous de jouer ! Votre game master détaille vos scores à chaque fin de round.
                    </p>
                    <p className="hint-text" ref={(el) => hintRefs.current[1] = el}>
                      N'oubliez pas de nous suivre sur nos réseaux sociaux et de conseiller notre site à vos amis !
                    </p>
                    <p className="hint-text" ref={(el) => hintRefs.current[2] = el}>
                      Jin, King et Reina sont les personnages les plus utilisés de Tekken 8 depuis sa sortie.
                    </p>
                    <p className="hint-text" ref={(el) => hintRefs.current[3] = el}>
                      Si vous rencontrez le moindre problème, n'hésitez pas à nous contacter dans notre page 'Contactez Nous' depuis l'accueil.
                    </p>
                    <p className="hint-text" ref={(el) => hintRefs.current[4] = el}>
                    Tekken 8 est le premier jeu de la série à utiliser l'Unreal Engine 5, promettant des graphismes encore plus réalistes et un gameplay plus fluide que ses prédécesseurs !
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingUser;
