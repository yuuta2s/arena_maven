// import Home from "./pages/Home";
import Header from "./components/Header/Header.jsx"
import Footer from '@components/Footer/Footer';
import Homepage from '@components/Homepage/Homepage';
import TournamentRequest from "@components/Tournament/TournamentRequest/TournamentRequest.jsx";
import BracketGenerator from './utils/BracketGen';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Cards from './components/Cards/Cards'; 

const App = () => {
  return (
    < >
    <div className="bg-gradient-to-tr from-black via-vertBG to-black">
      <Header />
      <TournamentRequest/>
      {/* <Homepage/> */}
    {/* <Router>
        <div>
          <h1>Tournament Manager</h1>
          <Routes>
          <Route path="/tournament/:id" element={<BracketGenerator />} />
            <Route path="/" element={<Navigate to="/tournament/9" />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </Router> */}
      <Footer/>
    </div>
    </>
  );
};

export default App;