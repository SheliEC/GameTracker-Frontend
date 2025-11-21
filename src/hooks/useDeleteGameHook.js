// Archivo: frontend/src/hooks/useDeleteGameHook.js

import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/games/'; // Terminamos con '/' para añadir el ID

const useDeleteGameHook = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función que acepta el ID del juego a eliminar
    const deleteGame = async (id) => {
        setIsLoading(true);
        setError(null);
        
        try {
            // Petición DELETE a la API, usando el ID del juego
            const response = await axios.delete(API_BASE_URL + id);

            setIsLoading(false);
            
            // Retorna los datos del juego eliminado
            return response.data; 

        } catch (err) {
            setIsLoading(false);
            setError(err.response ? err.response.data.error : 'No se pudo eliminar el juego. Verifique el Backend.');
            return null;
        }
    };

    return { deleteGame, isLoading, error };
};

export default useDeleteGameHook;