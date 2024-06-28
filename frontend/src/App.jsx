import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from '@components/Footer/Footer';
import Homepage from '@components/Homepage/Homepage';
import Contact from '@components/Contact/Contact';
import Page404 from '@components/Page404/Page404';  
import BracketGenerator from './utils/BracketGen';
import TournamentList from './components/Tournament/TournamentList/TournamentList';
import MyTournament from '@components/MyTournaments/MyTournament.jsx';
import Cards from './components/Cards/Cards'; 
import TournamentRegister from "@components/Tournament/TournamentRegister/TournamentRegister.jsx";
import TournamentRequest from '@components/Tournament/TournamentRequest/TournamentRequest.jsx';
import AboutUs from "@components/AboutUs/AboutUs.jsx";
import Winner from "./utils/Winner.jsx";
import Register from "./components/Account/Register/Register";
import Login from "./components/Account/Login/Login";
import './App.css';
import LoadingUser from '@components/LoadingUser/LoadingUser.jsx';

const App = () => {
  return (
    <div className="bg-gradient-to-tr from-black via-vertBG to-black min-h-screen flex flex-col">
      <Router>
        <Routes>
          {/* Routes with Header and Footer */}
          <Route element={<LayoutWithHeaderFooter />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/tournamentRequest" element={<TournamentRequest />} />
            <Route path="/tournamentRegister" element={<TournamentRegister />} />
            <Route path="/decouvrir" element={<TournamentList />} />
            <Route path="/mes-tournois" element={<MyTournament />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tournament/:id" element={<BracketGenerator />} />
        
            <Route path="/winner" element={<Winner/>}/>
          </Route>
          {/* Route without Header and Footer */}
          <Route path="*" element={<Page404 />} />
          <Route path="/loading" element={<LoadingUser/>}/>
        </Routes>
      </Router>
    </div>
  );
}

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