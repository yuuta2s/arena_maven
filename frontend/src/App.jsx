import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./components/Header/Header";
import Footer from '@components/Footer/Footer';
import Homepage from '@components/Homepage/Homepage';
import BracketGenerator from './utils/BracketGen';
import TournamentList from './components/Tournament/TournamentList/TournamentList';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/tournament/:id" element={<BracketGenerator />} />
        <Route path="/decouvrir" element={<TournamentList />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;