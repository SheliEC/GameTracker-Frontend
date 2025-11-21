// Archivo: frontend/src/components/GameEditForm.jsx  

import { useState, useContext } from 'react';
import useUpdateGameHook from '../hooks/useUpdateGameHook';
import { GameContext } from '../context/GameContext'; 

const categories = [
    "Acción", "Aventura", "RPG", "Shooter", "Deportes", "Estrategia",
    "Simulación", "Carreras", "Indie", "Puzzle", "Terror", "Plataformas"
];

function GameEditForm({ game, toggleEdit }) {
    const [title, setTitle] = useState(game.title);
    const [platform, setPlatform] = useState(game.platform);
    const [hoursPlayed, setHoursPlayed] = useState(game.hoursPlayed || '');
    const [rating, setRating] = useState(game.rating || '');
    const [review, setReview] = useState(game.review || '');
    const [category, setCategory] = useState(game.category || '');
    const [coverImage, setCoverImage] = useState(game.coverImage || "");
    const [error, setError] = useState(null); 

    const { updateGame, isLoading, error: apiError } = useUpdateGameHook();
    const { dispatch } = useContext(GameContext);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setError(null);

        const updates = {
            title,
            platform,
            hoursPlayed: hoursPlayed ? Number(hoursPlayed) : 0,
            rating: rating ? Number(rating) : null,
            review,
            category,
            coverImage
        };

        if (!title || !platform) {
            setError('El título y la plataforma son obligatorios.');
            return;
        }

        const updatedGame = await updateGame(game._id, updates);

        if (updatedGame) {
            dispatch({ type: 'UPDATE_GAME', payload: updatedGame });
            toggleEdit(); 
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

            {/* NUEVO INPUT: URL DE LA IMAGEN */}
            <label>URL de la Imagen:</label>
            <input
                type="text"
                placeholder="Pega aquí la URL de la portada"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
            />

            {/* PREVISUALIZACIÓN */}
            {coverImage && (
                <>
                    <img 
                        src={coverImage}
                        alt="Vista previa"
                        style={{ width: "120px", borderRadius: "10px", marginTop: "10px" }}
                    />

                    <button 
                        type="button"
                        onClick={() => setCoverImage("")}
                        style={{
                            marginTop: "10px",
                            backgroundColor: "#c0392b",
                            color: "white",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        Eliminar Imagen
                    </button>
                </>
            )}

            <label>Reseña:</label>
            <textarea
                onChange={(e) => setReview(e.target.value)}
                value={review}
            />

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
