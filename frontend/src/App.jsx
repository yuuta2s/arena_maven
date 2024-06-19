// import Home from "./pages/Home";
import Header from "./components/Header/Header.jsx"
import Footer from '@components/Footer/Footer';
import Homepage from '@components/Homepage/Homepage';
import BracketGenerator from './utils/BracketGen';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Cards from './components/Cards/Cards'; 


const App = () => {
  return (
    <>
    <Header />
    <Homepage/>
   <Router>
        <Routes>
        <Route path="/tournament/:id" element={<BracketGenerator />} />
          <Route path="/" element={<Navigate to="/tournament/9" />} />
        </Routes>
    </Router>
    <Footer/>
    </>
  );
};

export default App;