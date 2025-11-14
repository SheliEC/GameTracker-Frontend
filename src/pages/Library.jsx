// Archivo: frontend/src/pages/Library.jsx (ACTUALIZADO)

import useGamesHook from '../hooks/useGamesHook';
import GameForm from '../components/GameForm'; // Importamos el formulario

function Library() {
    const { games, isLoading, error } = useGamesHook();

    return (
        <div className="library-page">
            <div className="game-list">
                <h2>Mi Biblioteca de Juegos</h2>
                
                {/* Mensajes de estado */}
                {error && <p className="error">{error}</p>}
                {isLoading && <p>Cargando juegos...</p>}
                
                {/* Mostrar la lista de juegos cuando estén cargados */}
                {games && games.map(game => (
                    // Por ahora solo mostramos el título
                    <div key={game._id} className="game-card">
                        <h4>{game.title} ({game.platform})</h4>
                    </div>
                ))}
                
                {/* Si no hay juegos y no hay error, invitamos a crear uno */}
                {games && games.length === 0 && !isLoading && !error && (
                    <p>No tienes juegos en tu biblioteca. ¡Usa el formulario para agregar uno!</p>
                )}
            </div>

            <GameForm /> {/* El formulario se muestra al lado de la lista */}
        </div>
    );
}

export default Library;