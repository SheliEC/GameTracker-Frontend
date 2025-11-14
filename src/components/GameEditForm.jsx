// Archivo: frontend/src/components/GameEditForm.jsx (CON CAMPOS ADICIONALES)

import { useState, useContext } from 'react';
import useUpdateGameHook from '../hooks/useUpdateGameHook';
import { GameContext } from '../context/GameContext'; 

function GameEditForm({ game, toggleEdit }) {
    // ⬇️ ESTADOS: Inicializados con los valores actuales, incluyendo rating y review
    const [title, setTitle] = useState(game.title);
    const [platform, setPlatform] = useState(game.platform);
    const [hoursPlayed, setHoursPlayed] = useState(game.hoursPlayed || '');
    const [rating, setRating] = useState(game.rating || ''); // Nuevo
    const [review, setReview] = useState(game.review || ''); // Nuevo
    const [error, setError] = useState(null); 

    const { updateGame, isLoading, error: apiError } = useUpdateGameHook();
    const { dispatch } = useContext(GameContext);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setError(null);

        // Recolectar solo los campos que cambiaron
        const updates = {
            title,
            platform,
            hoursPlayed: hoursPlayed ? Number(hoursPlayed) : 0,
            rating: rating ? Number(rating) : null, // Incluir rating
            review, // Incluir review
        };

        if (!title || !platform) {
            setError('El título y la plataforma son obligatorios.');
            return;
        }

        const updatedGame = await updateGame(game._id, updates);

        if (updatedGame) {
            dispatch({ type: 'UPDATE_GAME', payload: updatedGame });
            toggleEdit(); 
            console.log('Juego actualizado exitosamente:', updatedGame.title);
        }
    };

    return (
        <form className="game-edit-form" onSubmit={handleSubmit}>
            <h3>Editando: {game.title}</h3>

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

            <label>Horas Jugadas:</label>
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

            <div className="form-actions">
                <button disabled={isLoading} type="submit">
                    {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
                <button 
                    type="button" 
                    onClick={toggleEdit}
                    disabled={isLoading}
                >
                    Cancelar
                </button>
            </div>
            
            {error && <div className="form-error">{error}</div>}
            {apiError && <div className="form-error">{apiError}</div>}
        </form>
    );
}

export default GameEditForm;