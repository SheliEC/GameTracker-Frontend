// Archivo: frontend/src/hooks/useDeleteGameHook.js (SOLUCIÓN)

import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/games';

const useDeleteGameHook = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteGame = async (id) => {
        setIsLoading(true);
        setError(null);
        let deletedGame = null;

        try {
            // La ruta usa el ID: DELETE http://localhost:4000/api/games/:id
            const response = await axios.delete(`${API_BASE_URL}/${id}`);
            
            // CRÍTICO: El backend debe devolver el objeto eliminado. 
            // Si tu backend no lo hace, usamos el ID que ya tenemos.
            deletedGame = response.data ? response.data : { _id: id }; 

            console.log('Backend Response (Delete):', deletedGame);
        } catch (err) {
            setError('Error al eliminar el juego. Asegúrese de que el Backend esté activo.');
        } finally {
            setIsLoading(false);
        }
        
        // Retornamos el objeto eliminado (o al menos el ID para el dispatch)
        return deletedGame;
    };

    return { deleteGame, isLoading, error };
};

export default useDeleteGameHook;