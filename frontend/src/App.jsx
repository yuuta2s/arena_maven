// import Home from "./pages/Home";
import Header from "./components/Header/Header.jsx"
import Footer from '@components/Footer/Footer';
import Homepage from '@components/Homepage/Homepage';
import BracketGenerator from './utils/BracketGen';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Cards from './components/Cards/Cards'; 
import TournamentRegister from "@components/Tournament/TournamentRegister/TournamentRegister.jsx";
import AboutUs from "@components/AboutUs/AboutUs.jsx";
import Winner from "./utils/Winner.jsx";


const App = () => {
  return (
    <>
    <Header />
    <Homepage/>
   <Router>
        <Routes>
          <Route path="/register/tournament" element={<TournamentRegister/>}/>
        <Route path="/tournament/:id" element={<BracketGenerator />} />
          <Route path="/" element={<Navigate to="/tournament/9" />} />
        <Route path="/winner" element={<Winner />} />
        </Routes>
    </Router>
          <AboutUs/>
    <Footer/>
    </>
  );
};

export default App;