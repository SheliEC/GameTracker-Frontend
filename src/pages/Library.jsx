// Archivo: frontend/src/pages/Library.jsx (VERIFICACIÓN FINAL)

import { useContext } from 'react';
import { GameContext } from '../context/GameContext'; 

import GameForm from '../components/GameForm'; // ¡IMPORTACIÓN NECESARIA!
import GameCard from '../components/GameCard';

function Library() {
    const { games, isLoading, error } = useContext(GameContext); 

    return (
        <div className="library-page">
            {/* ⬇️ LÍNEA CRÍTICA: Aquí se llama al formulario ⬇️ */}
            <GameForm /> 
            
            <div className="game-list">
                <h2>Mi Biblioteca de Juegos</h2>
                
                {error && <p className="error">{error}</p>}
                {isLoading && <p>Cargando juegos...</p>}
                
                {games && games.map(game => (
                    <GameCard key={game._id} game={game} /> 
                ))}
                
                {games && games.length === 0 && !isLoading && !error && (
                    <p>No tienes juegos en tu biblioteca. ¡Usa el formulario para agregar uno!</p>
                )}
            </div>
        </div>
    );
}

export default Library;