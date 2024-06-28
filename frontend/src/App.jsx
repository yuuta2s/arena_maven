import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from '@components/Footer/Footer';
import Homepage from '@components/Homepage/Homepage';
import Contact from '@components/Contact/Contact';
import Page404 from '@components/Page404/Page404';  
import BracketGenerator from './utils/BracketGen';
import TournamentList from './components/Tournament/TournamentList/TournamentList';
import Cards from './components/Cards/Cards'; 
import TournamentRegister from "@components/Tournament/TournamentRegister/TournamentRegister.jsx";
import TournamentRequest from '@components/Tournament/TournamentRequest/TournamentRequest.jsx';
import AboutUs from "@components/AboutUs/AboutUs.jsx";
import Winner from "./utils/Winner.jsx";
import Register from "./components/Account/Register/Register";
import Login from "./components/Account/Login/Login";
import './App.css';
import ProfileCreation from '@components/Account/ProfileCreation/ProfileCreation';
import AuthProvider, { AuthContext } from './components/Account/Login/AuthProvider';
// import { AuthContext } from './components/Account/Login/AuthProvider';
import React, { useContext } from 'react';


const App = () => {
  return (
    <div className="bg-gradient-to-tr from-black via-vertBG to-black min-h-screen flex flex-col">
      <AuthProvider>
      <Router>
      <AuthStatus />
        <Routes>
          {/* Routes with Header and Footer */}
          <Route element={<LayoutWithHeaderFooter />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/tournamentRequest" element={<TournamentRequest />} />
            <Route path="/tournamentRegister" element={<TournamentRegister />} />
            <Route path="/decouvrir" element={<TournamentList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfileCreation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tournament/:id" element={<BracketGenerator />} />
          </Route>
          {/* Route without Header and Footer */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

function AuthStatus() {
  const { user, isAuthenticated } = useContext(AuthContext);
  return (
    <div>
      {isAuthenticated ? `Logged in as ${user.name}` : 'Not logged in'}
    </div>
  );
}

// const AuthStatus = () => {
//   const { isAuthenticated, user } = useContext(AuthContext);

//   return (
//     <div className="auth-status">
//       {isAuthenticated ? (
//         <>
//           <p>Vous êtes connecté</p>
//           <button onClick={logout}>Se déconnecter</button>
//         </>
//       ) : (
//         <>
//           <p>Vous n'êtes pas connecté</p>
//           <button onClick={login}>Se connecter</button>
//         </>
//       )}
//     </div>
//   );
// }
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