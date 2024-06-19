// import Home from "./pages/Home";
import Header from "./components/Header/Header.jsx"
import Footer from '@components/Footer/Footer';
import Homepage from '@components/Homepage/Homepage';
import BracketGenerator from './utils/BracketGen';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer'; 
import Cards from './components/Cards/Cards'; 

const App = () => {
  return (
    <>
    <Header />
    <Homepage/>
   <Router>
      <div>
        <h1>Tournament Manager</h1>
        <Routes>
        <Route path="/tournament/:id" element={<BracketGenerator />} />
          <Route path="/" element={<Navigate to="/tournament/9" />} /> {/* Remplace 1 par l'ID par défaut */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
    <Footer/>
    </>
  );
};

export default App;