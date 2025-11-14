// Archivo: frontend/src/hooks/useGamesHook.js

// Archivo: frontend/src/hooks/useGamesHook.js (SOLUCIÓN DEFINITIVA)

import { useState, useEffect, useCallback } from 'react'; // <--- CAMBIO 1: AGREGAR useCallback
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/games';

const useGamesHook = () => {
    // 1. ESTADOS
    const [games, setGames] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null); 

    // 2. FUNCIÓN DE ACTUALIZACIÓN DE ESTADO (DISPATCH)
    // CAMBIO 2: ENVOLVEMOS en useCallback y la lista de dependencias está vacía [].
    const dispatch = useCallback((action) => {
        if (action.type === 'CREATE_GAME' && action.payload) {
            setGames(prevGames => {
                if (!prevGames) return [action.payload];
                return [action.payload, ...prevGames];
            }); 
        }
        
        if (action.type === 'DELETE_GAME' && action.payload) {
            setGames(prevGames => {
                if (!prevGames) return null; 
                
                // Filtramos, forzando la conversión a String
                return prevGames.filter(
                    game => String(game._id) !== String(action.payload._id)
                );
            });
        }
    }, [setGames]); // <- setGames nunca cambia, pero se pone para ser estricto con React.

    // 3. EFECTO DE CARGA INICIAL
    // ... (El resto del código useEffect sin cambios) ...
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get(API_BASE_URL);
                setGames(response.data); 
                setError(null);
            } catch (err) {
                setError('No se pudo conectar al Backend o cargar los juegos. Asegúrate de que el servidor (Node.js) esté activo.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchGames();
    }, []); 

    // 4. RETORNO DEL HOOK
    return { games, isLoading, error, dispatch }; 
};

export default useGamesHook;