import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer';
import Homepage from './components/Homepage/Homepage';
import Contact from './components/Contact/Contact';
import Page404 from './components/Page404/Page404';  
import BracketGenerator from './utils/BracketGen';
import TournamentList from './components/Tournament/TournamentList/TournamentList';
import TournamentRegister from './components/Tournament/TournamentRegister/TournamentRegister.jsx';
import AboutUs from './components/AboutUs/AboutUs.jsx';
import Winner from './utils/Winner.jsx';

import './App.css';

const App = () => {
  return (
    <div className="bg-gradient-to-tr from-black via-vertBG to-black min-h-screen flex flex-col">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/tournament/9" />} />
          <Route path="/tournament/:id" element={<BracketGenerator />} />
          <Route path="/register/tournament" element={<TournamentRegister />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/winner" element={<Winner />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
