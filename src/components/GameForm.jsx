// Archivo: frontend/src/components/GameForm.jsx 

import { useState, useContext } from 'react';
import useCreateGameHook from '../hooks/useCreateGameHook';
import { GameContext } from '../context/GameContext'; 
import "./GameForm.css";
 
const categories = [
    "Acción", "Aventura", "RPG", "Shooter", "Deportes", "Estrategia",
    "Simulación", "Carreras", "Indie", "Puzzle", "Terror", "Plataformas"
];

function GameForm() {
    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('');
    const [hoursPlayed, setHoursPlayed] = useState(''); 
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const [category, setCategory] = useState('');
    const [coverImage, setCoverImage] = useState(""); // URL de la imagen
    const [error, setError] = useState(null); 

    const { createGame, isLoading, error: apiError } = useCreateGameHook();
    const { dispatch } = useContext(GameContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        const hoursToSend = hoursPlayed ? Number(hoursPlayed) : 0; 
        const ratingToSend = rating ? Number(rating) : null;

        const gameData = { 
            title, 
            platform, 
            hoursPlayed: hoursToSend, 
            rating: ratingToSend, 
            review, 
            category, 
            coverImage // ⬅️ ahora es solo URL
        };

        if (!title || !platform) {
            setError('El título y la plataforma son campos obligatorios.');
            return;
        }

        const newGame = await createGame(gameData);

        if (newGame) {
            dispatch({ type: 'CREATE_GAME', payload: newGame });

            // LIMPIAR CAMPOS
            setTitle('');
            setPlatform('');
            setHoursPlayed('');
            setRating('');
            setReview('');
            setCategory('');
            setCoverImage("");
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
            
            <label>Calificación (1-5):</label>
            <input 
                type="number" 
                min="1" max="5"
                onChange={(e) => setRating(e.target.value)}
                value={rating}
            />
            
            <label>Categoría:</label>
            <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Seleccionar...</option>
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            {/* 🔵 NUEVO INPUT: pegar URL */}
            <label>URL de la Imagen:</label>
            <input 
                type="text"
                placeholder="Pega aquí la URL de la portada"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
            />

            {/* PREVISUALIZACIÓN */}
            {coverImage && (
                <img 
                    src={coverImage}
                    alt="Vista previa"
                    style={{ width: "120px", borderRadius: "10px", marginTop: "10px" }}
                />
            )}

            <label>Reseña:</label>
            <textarea
                onChange={(e) => setReview(e.target.value)}
                value={review}
            />

            <button disabled={isLoading} type="submit">
                {isLoading ? 'Añadiendo...' : 'Añadir Juego'}
            </button>
            
            {(error || apiError) && <div className="form-error">{error || apiError}</div>}
        </form>
    );
}

export default GameForm;
