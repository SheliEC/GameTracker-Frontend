// Archivo: frontend/src/components/GameCard.jsx (CON CAMPOS ADICIONALES VISUALIZACIÓN)

import useDeleteGameHook from '../hooks/useDeleteGameHook';
import useUpdateGameHook from '../hooks/useUpdateGameHook';
import { useContext, useState } from 'react';
import { GameContext } from '../context/GameContext'; 

import GameEditForm from './GameEditForm';

function GameCard({ game }) {
    const { deleteGame, isLoading: isDeleting } = useDeleteGameHook();
    const { updateGame, isLoading: isUpdating } = useUpdateGameHook(); 
    const { dispatch } = useContext(GameContext); 

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing(!isEditing); 

    const handleToggleCompleted = async () => {
        const updates = { isCompleted: !game.isCompleted };
        const updatedGame = await updateGame(game._id, updates);

        if (updatedGame) {
            dispatch({ type: 'UPDATE_GAME', payload: updatedGame }); 
        }
    };
    
    const handleDelete = async () => {
        const deletedGame = await deleteGame(game._id);

        if (deletedGame) {
            dispatch({ type: 'DELETE_GAME', payload: deletedGame }); 
        }
    };

    if (isEditing) {
        return <GameEditForm game={game} toggleEdit={toggleEdit} />;
    }

    // ⬇️ VISUALIZACIÓN DE CAMPOS ADICIONALES
    const hoursText = (game.hoursPlayed !== undefined && game.hoursPlayed !== null) 
        ? `${game.hoursPlayed} hrs` 
        : 'Horas no registradas';
    const statusText = game.isCompleted ? '✅ Completado' : '⏳ Pendiente';
    const ratingText = game.rating ? `⭐ ${game.rating} / 10` : 'Sin calificar';
    const reviewText = game.review ? `Reseña: ${game.review}` : ''; // Opcional

    return (
        <div className="game-card">
            <h4>{game.title} ({game.platform})</h4>
            <p>Estado: {statusText}</p>
            <p>Horas jugadas: {hoursText}</p>
            <p>Calificación: {ratingText}</p> 
            {game.review && <p className="review-text">{reviewText}</p>} {/* Muestra la reseña solo si existe */}
            
            <div className="card-actions">
                <button 
                    onClick={toggleEdit}
                    className="edit-button"
                    disabled={isDeleting || isUpdating}
                >
                    Editar
                </button>
                
                <button 
                    onClick={handleToggleCompleted} 
                    disabled={isUpdating} 
                    className="update-button"
                >
                    {isUpdating ? 'Actualizando...' : (game.isCompleted ? 'Marcar Pendiente' : 'Marcar Completado')}
                </button>
                
                <button onClick={handleDelete} disabled={isDeleting} className="delete-button">
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export default GameCard;