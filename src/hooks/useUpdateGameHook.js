// Archivo: frontend/src/hooks/useUpdateGameHook.js

import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/games';

const useUpdateGameHook = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateGame = async (id, updates) => {
        setIsLoading(true);
        setError(null);
        let updatedGame = null;

        try {
            // Petición PATCH para actualizar solo los campos provistos
            const response = await axios.patch(`${API_BASE_URL}/${id}`, updates);
            updatedGame = response.data;
        } catch (err) {
            setError('Error al actualizar el juego. Verifique los campos.');
        } finally {
            setIsLoading(false);
        }

        return updatedGame;
    };

    return { updateGame, isLoading, error };
};

export default useUpdateGameHook;