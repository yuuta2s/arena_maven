import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from '@components/Footer/Footer';
import Homepage from '@components/Homepage/Homepage';
import Contact from '@components/Contact/Contact'; // Assurez-vous que le chemin est correct
import BracketGenerator from './utils/BracketGen';
import './App.css';

const App = () => {
  return (
    <div className="bg-gradient-to-tr from-black via-vertBG to-black">
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tournament/:id" element={<BracketGenerator />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        <Footer />
      </>
    </Router>
    </div>
  );
};

export default App;
