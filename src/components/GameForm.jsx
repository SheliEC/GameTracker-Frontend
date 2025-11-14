// Archivo: frontend/src/components/GameForm.jsx (VERIFICACIÓN FINAL)

import { useState, useContext } from 'react';
import useCreateGameHook from '../hooks/useCreateGameHook';
import { GameContext } from '../context/GameContext'; 

function GameForm() {
    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('');
    const [hours, setHours] = useState('');
    const [error, setError] = useState(null); 
    const [emptyFields, setEmptyFields] = useState([]);
    
    const { createGame, isLoading, error: apiError } = useCreateGameHook();
    const { dispatch } = useContext(GameContext);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const game = { title, platform, hours: hours ? Number(hours) : 0 };
        
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

        const createdGame = await createGame(game);

        if (createdGame) {
            dispatch({ type: 'CREATE_GAME', payload: createdGame });
            setTitle('');
            setPlatform('');
            setHours('');
            console.log('Juego creado exitosamente:', createdGame);
        }
    };

    return (
        <form className="game-form" onSubmit={handleSubmit}>
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
            
            {error && <div className="form-error">{error}</div>}
            {apiError && <div className="form-error">{apiError}</div>}
        </form>
    );
}

export default GameForm;