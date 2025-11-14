// Archivo: frontend/src/components/GameForm.jsx (CORREGIDO)

import { useState } from 'react';
import useCreateGameHook from '../hooks/useCreateGameHook';

function GameForm() {
    // ... (Estados iniciales - sin cambios)
    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('');
    const [hours, setHours] = useState('');
    const [error, setError] = useState(null); 
    const [emptyFields, setEmptyFields] = useState([]);
    
    // Hook de creación de la API
    const { createGame, isLoading, error: apiError } = useCreateGameHook();

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        // Aseguramos que las horas se envíen como número (0 si está vacío)
        const game = { 
            title, 
            platform, 
            hours: hours ? Number(hours) : 0 
        }; // <<<< Punto 1: Las horas se convierten a número o 0.
        
        // --- Validación Simple de Campos ---
        const missingFields = Object.keys(game).filter(key => {
            return (key === 'title' || key === 'platform') && !game[key];
        });

        if (missingFields.length > 0) {
            setError('Por favor, completa el título y la plataforma.');
            setEmptyFields(missingFields);
            return;
        }
        setError(null);
        setEmptyFields([]);

        // --- Llamada al Hook para enviar datos al Backend ---
        const createdGame = await createGame(game);

        if (createdGame) {
            // Si tiene éxito, limpia el formulario y muestra el mensaje
            setTitle('');
            setPlatform('');
            setHours('');
            
            // >>> PUNTO CLAVE: Aquí se muestra el mensaje en la consola del navegador (F12)
            console.log('Juego creado exitosamente:', createdGame); 

            // **Opcional:** Mostrar un mensaje temporal en la interfaz (no obligatorio por ahora)
            // setError('¡Juego creado con éxito!'); 
            
        }
    };

    return (
        <form className="game-form" onSubmit={handleSubmit}>
            {/* ... (Todo el resto del formulario sigue igual) ... */}
            <h3>Añadir Nuevo Juego</h3>

            <label>Título del Juego:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Plataforma:</label>
            <input 
                type="text"
                onChange={(e) => setPlatform(e.target.value)}
                value={platform}
                className={emptyFields.includes('platform') ? 'error' : ''}
            />

            <label>Horas Jugadas (Opcional):</label>
            <input 
                type="number"
                onChange={(e) => setHours(e.target.value)}
                value={hours}
            />

            <button disabled={isLoading}>
                {isLoading ? 'Añadiendo...' : 'Añadir Juego'}
            </button>
            
            {/* Mostrar errores del formulario o de la API */}
            {error && <div className="form-error">{error}</div>}
            {apiError && <div className="form-error">{apiError}</div>}
        </form>
    );
}

export default GameForm; 