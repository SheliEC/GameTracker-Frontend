// Archivo: frontend/src/main.jsx (ACTUALIZADO)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { GameContextProvider } from './context/GameContext'; // ¡VERIFICA ESTE PATH!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Asegúrate de que este componente esté cerrado correctamente */}
    <GameContextProvider> 
      <App />
    </GameContextProvider>
  </React.StrictMode>,
);