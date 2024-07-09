import React from 'react';
import './Page404css.css'; 

export default function Page404() {
    return (
        <div>
            <div className="noise"></div>
            <div className="overlay"></div>
            <div className="terminal">
                <h1>Erreur <span className="errorcode"> 404</span></h1>
                <p className="output">Il semble que nous n'ayons pas pu trouver la page que vous cherchiez.
                    <br></br>Peut-être que vous avez saisi une mauvaise URL, ou que la page que vous cherchez a été déplacée ou supprimée.</p>
                <p className="output">Retour à la <a href="/">page d'accueil</a>.</p>
                <p className="output">Bonne chance.</p>
            </div>
        </div>
    );
}
