// import Header from "./components/Header/Header.jsx";
// import Footer from "@components/Footer/Footer";
import BracketGenerator from "./utils/BracketGen";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Account/Login/Login";
import Register from "./components/Account/Register/Register";
import ProfileCheck from "./components/Account/ProfileCheck/ProfileCheck";
import Cards from "./components/Cards/Cards";

const App = () => {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Account" element={<ProfileCheck />} />
        {/* Assurez-vous que ces routes sont décommentées et correctement placées dans <Routes> */}
        {/* <Route path="/tournament/:id" element={<BracketGenerator />} />
        <Route path="/" element={<Navigate to="/tournament/9" />} /> */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
