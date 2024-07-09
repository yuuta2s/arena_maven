import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    if (userData && userData.email) {
      setUser(userData);
      setIsAuthenticated(true);
      console.log('Utilisateur connecté:', userData);
    } else {
      console.warn('Données utilisateur invalides:', userData);
    }
  };


  const logout = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/logout`);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
        console.log('Déconnexion réussie');
      } catch (error) {
        console.error('La déconnexion a échoué côté serveur');
      }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;