// Archivo: frontend/src/components/GameCard.jsx (CORRECCIÓN DELETE)

import useDeleteGameHook from '../hooks/useDeleteGameHook';
import { useContext } from 'react'; 
import { GameContext } from '../context/GameContext'; 

function GameCard({ game }) {
    const { deleteGame, isLoading, error } = useDeleteGameHook();
    const { dispatch } = useContext(GameContext); // <--- Obtiene la función dispatch

    // Mostrar las horas jugadas
    const hoursText = game.hours ? `${game.hours} hrs` : 'Horas no registradas';
    
    const handleDelete = async () => {
        const deletedGame = await deleteGame(game._id);

        if (deletedGame) {
            // ⬇️ LÍNEA CRÍTICA: La acción debe ser DELETE_GAME
            dispatch({ type: 'DELETE_GAME', payload: deletedGame }); 
            
            console.log('Juego eliminado exitosamente. Verifique la consola para el ID despachado.');
        }
    };

    return (
        <div className="game-card">
            <h4>{game.title} ({game.platform})</h4>
            <p>Horas jugadas: {hoursText}</p> 
            
            {error && <div className="delete-error">{error}</div>}

            <button onClick={handleDelete} disabled={isLoading}>
                {isLoading ? 'Eliminando...' : 'Eliminar'}
            </button>
        </div>
    );
}

export default GameCard;  