import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from '@components/Footer/Footer';
import Homepage from '@components/Homepage/Homepage';
import Contact from '@components/Contact/Contact';
import Page404 from '@components/Page404/Page404';  
import BracketGenerator from './utils/BracketGen';
import TournamentList from './components/Tournament/TournamentList/TournamentList';
import Contact from '@components/Contact/Contact';

import Cards from './components/Cards/Cards'; 
import TournamentRegister from "@components/Tournament/TournamentRegister/TournamentRegister.jsx";
import AboutUs from "@components/AboutUs/AboutUs.jsx";
import Winner from "./utils/Winner.jsx";

import './App.css';

const App = () => {
  return (
    <div className="bg-gradient-to-tr from-black via-vertBG to-black min-h-screen flex flex-col">
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

// Layout Component with Header and Footer
const LayoutWithHeaderFooter = () => (
  <>
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default App;
