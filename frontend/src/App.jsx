import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./components/Header/Header";
import Footer from '@components/Footer/Footer';
import Homepage from '@components/Homepage/Homepage';
import TournamentRequest from "@components/Tournament/TournamentRequest/TournamentRequest.jsx";
import BracketGenerator from './utils/BracketGen';
import TournamentList from './components/Tournament/TournamentList/TournamentList';
import Contact from '@components/Contact/Contact';

import Cards from './components/Cards/Cards'; 

import './App.css';

const App = () => {
  return (
    < >
    <div className="bg-gradient-to-tr from-black via-vertBG to-black">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/decouvrir" element={<TournamentList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tournamentRequest" element={<TournamentRequest />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        <Footer />
      </Router>
    </div>
    </>
  );
};

export default App;
