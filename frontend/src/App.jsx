import Footer from '@components/Footer/Footer';
import React from 'react';
import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inscription from './components/Sign up/inscription';
const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inscription" element={<Inscription />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
