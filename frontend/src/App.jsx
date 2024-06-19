import React from 'react';
import './App.css';
import Footer from './components/Footer/Footer'; 
import Cards from './components/Cards/Cards'; 

const App = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Arena maven
      </h1>
      <Cards /> 
      <Footer /> 
    </>
  );
};

export default App;