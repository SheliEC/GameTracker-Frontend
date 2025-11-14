// Archivo: frontend/src/hooks/useGamesHook.js

import { useState, useEffect } from 'react'; // <<<< LÍNEA CORREGIDA
import axios from 'axios'; // Usamos Axios para las peticiones

const API_BASE_URL = 'http://localhost:4000/api/games';

const useGamesHook = () => {
    const [games, setGames] = useState(null); // Estado para guardar los juegos
    const [isLoading, setIsLoading] = useState(true); // Estado para saber si está cargando
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        const fetchGames = async () => {
            try {
                // Petición GET a tu API del Backend
                const response = await axios.get(API_BASE_URL);
                
                // Guardamos los datos de juegos en el estado
                setGames(response.data); 
                setError(null); // Limpiamos errores
            } catch (err) {
                // Si la API falla (ej: el Backend no está corriendo)
                setError('No se pudo conectar al Backend o cargar los juegos. Asegúrate de que el servidor (Node.js) esté activo.');
            } finally {
                setIsLoading(false); // La carga ha terminado (sea exitosa o con error)
            }
        };

        fetchGames();
    }, []); // El array vacío [] asegura que el efecto se ejecute solo una vez al inicio

    // El hook retorna los datos y el estado de la petición
    return { games, isLoading, error, setGames };
};

export default useGamesHook;