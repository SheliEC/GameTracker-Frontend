// Archivo: frontend/src/hooks/useCreateGameHook.js

import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/games';

const useCreateGameHook = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función que se llama cuando el formulario se envía
    const createGame = async (gameData) => {
        setIsLoading(true);
        setError(null);
        
        try {
            // Petición POST a la API
            const response = await axios.post(API_BASE_URL, gameData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setIsLoading(false);
            
            // Retorna los datos del juego creado (incluyendo el _id)
            return response.data; 

        } catch (err) {
            setIsLoading(false);
            // Captura errores de validación del Backend o conexión
            setError(err.response ? err.response.data.error : 'No se pudo crear el juego. Verifique el Backend.');
            return null;
        }
    };

    return { createGame, isLoading, error };
};

export default useCreateGameHook;