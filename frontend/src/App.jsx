import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./components/Header/Header";
import Footer from '@components/Footer/Footer';
import Homepage from '@components/Homepage/Homepage';
import TournamentRequest from "@components/Tournament/TournamentRequest/TournamentRequest.jsx";
import BracketGenerator from './utils/BracketGen';
import TournamentList from './components/Tournament/TournamentList/TournamentList';
import Login from './components/Account/Login/Login';
import Register from './components/Account/Register/Register';
import ProfileCheck from '@components/Account/ProfileCheck/ProfileCheck';

const App = () => {
  return (
    <Router>
      <div className="bg-gradient-to-tr from-black via-vertBG to-black">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/tournament/:id" element={<BracketGenerator />} />
          <Route path="/decouvrir" element={<TournamentList />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path='/Login' element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<ProfileCheck/>}/>
        </Routes>
        <TournamentRequest />
        <Footer />
      </div>
    </Router>
  );
};

export default App;