import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from '@components/Footer/Footer';
import Homepage from '@components/Homepage/Homepage';
import Contact from '@components/Contact/Contact';
import Page404 from '@components/Page404/Page404';  
import BracketGenerator from './utils/BracketGen';
import TournamentList from './components/Tournament/TournamentList/TournamentList';
import Cards from './components/Cards/Cards';
import Profil from './components/Profil/Profil';  

import './App.css';

const App = () => {
  return (
    <div className="bg-gradient-to-tr from-black via-vertBG to-black min-h-screen flex flex-col">
      <Router>
        <Routes>
          {/* Routes with Header and Footer */}
          <Route element={<LayoutWithHeaderFooter />}>
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/tournament/:id" element={<BracketGenerator />} />
          </Route>

          {/* Route without Header and Footer */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
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
