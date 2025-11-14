// Archivo: frontend/src/components/GameForm.jsx (CON CAMPOS ADICIONALES)

import { useState, useContext } from 'react';
import useCreateGameHook from '../hooks/useCreateGameHook';
import { GameContext } from '../context/GameContext'; 

function GameForm() {
    // ⬇️ ESTADOS: Añadimos rating y review
    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('');
    const [hoursPlayed, setHoursPlayed] = useState(''); 
    const [rating, setRating] = useState(''); // Nuevo
    const [review, setReview] = useState(''); // Nuevo
    const [error, setError] = useState(null); 

    const { createGame, isLoading, error: apiError } = useCreateGameHook();
    const { dispatch } = useContext(GameContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        const hoursToSend = hoursPlayed ? Number(hoursPlayed) : 0; 
        const ratingToSend = rating ? Number(rating) : null; // Enviamos null si está vacío

        // ⬇️ DATOS: Incluir rating y review
        const gameData = { title, platform, hoursPlayed: hoursToSend, rating: ratingToSend, review };

        if (!title || !platform) {
            setError('El título y la plataforma son campos obligatorios.');
            return;
        }

        const newGame = await createGame(gameData);

        if (newGame) {
            dispatch({ type: 'CREATE_GAME', payload: newGame });

            // ⬇️ LIMPIEZA DE ESTADOS
            setTitle('');
            setPlatform('');
            setHoursPlayed('');
            setRating('');
            setReview('');
        }
    };

    return (
        <form className="create-game-form" onSubmit={handleSubmit}>
            <h3>Añadir Nuevo Juego</h3>

            <label>Título del Juego:</label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Plataforma:</label>
            <input 
                type="text" 
                onChange={(e) => setPlatform(e.target.value)}
                value={platform}
            />
            
            <label>Horas Jugadas (Opcional):</label>
            <input 
                type="number" 
                onChange={(e) => setHoursPlayed(e.target.value)}
                value={hoursPlayed}
            />
            
            {/* ⬇️ NUEVOS CAMPOS: Calificación y Reseña */}
            <label>Calificación (1-10):</label>
            <input 
                type="number" 
                min="1" max="10"
                onChange={(e) => setRating(e.target.value)}
                value={rating}
            />
            
            <label>Reseña:</label>
            <textarea
                onChange={(e) => setReview(e.target.value)}
                value={review}
            />
            {/* ⬆️ FIN NUEVOS CAMPOS */}

            <button disabled={isLoading} type="submit">
                {isLoading ? 'Añadiendo...' : 'Añadir Juego'}
            </button>
            
            {(error || apiError) && <div className="form-error">{error || apiError}</div>}
        </form>
    );
}

export default GameForm;