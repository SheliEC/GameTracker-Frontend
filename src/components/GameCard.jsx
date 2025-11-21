import useDeleteGameHook from "../hooks/useDeleteGameHook";
import useUpdateGameHook from "../hooks/useUpdateGameHook";
import { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";

import GameEditForm from "./GameEditForm";

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
      dispatch({ type: "UPDATE_GAME", payload: updatedGame });
    }
  };

  const handleDelete = async () => {
    const deletedGame = await deleteGame(game._id);

    if (deletedGame) {
      dispatch({ type: "DELETE_GAME", payload: deletedGame });
    }
  };

  const hoursText =
    game.hoursPlayed != null ? `${game.hoursPlayed} hrs` : "Horas no registradas";
  const statusText = game.isCompleted ? "✅ Completado" : "⏳ Pendiente";
  const ratingText = game.rating ? `⭐ ${game.rating} / 5` : "Sin calificar";

  return (
    <div className={`flip-card-container ${isEditing ? "flipped" : ""}`}>
      <div className="flip-card">

        {/* 🔵 LADO FRONTAL (Tarjeta normal) */}
        <div className="flip-front vertical-card">
          
          {game.coverImage && (
            <div className="cover-wrapper">
              <img src={game.coverImage} alt={game.title} className="cover-image" />
            </div>
          )}

          <div className="game-info">
            <h4>{game.title} ({game.platform})</h4>
            <p>Estado: {statusText}</p>
            <p>Horas jugadas: {hoursText}</p>
            <p>Calificación: {ratingText}</p>
            <p>Categoría: {game.category || "Sin categoría"}</p>

            {game.review && (
              <div className="review-box">
                <strong>Reseña:</strong><br />
                {game.review}
              </div>
            )}
          </div>

          <div className="card-actions">
            <button onClick={toggleEdit} className="small-btn">Editar</button>
            <button onClick={handleToggleCompleted} className="small-btn">
              {game.isCompleted ? "Pendiente" : "Completado"}
            </button>
            <button onClick={handleDelete} className="small-btn delete-button">
              Eliminar
            </button>
          </div>
        </div>

        {/* 🔵 LADO TRASERO (Formulario de edición) */}
        <div className="flip-back edit-card">
          <h3>Editar Juego</h3>
          <GameEditForm game={game} toggleEdit={toggleEdit} />
        </div>

      </div>
    </div>
  );
}

export default GameCard;


