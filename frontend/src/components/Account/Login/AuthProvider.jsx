import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async() => {
      try {
        await axios.post('http://localhost:5000/user/login'); // Appel à l'API de déconnexion
        localStorage.setItem('token', res.data.token);
        setIsAuthenticated(false);
        setUser(null); // Mettre à jour l'état de l'utilisateur
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      }
  };

  

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;