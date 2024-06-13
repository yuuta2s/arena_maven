import React from 'react';
import { createRoot } from 'react-dom/client';
import './app.css'; // Assurez-vous d'importer le fichier CSS
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
