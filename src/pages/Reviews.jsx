// frontend/src/pages/Reviews.jsx
import React, { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";
import axios from "axios";

import "../pages/Reviews.css"; // 👈 Asegúrate de que esta ruta exista

function Reviews() {
    const { games, isLoading, error, dispatch } = useContext(GameContext);

    // Estados de comentarios
    const [commentText, setCommentText] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingText, setEditingText] = useState("");

    if (isLoading) return <p>Cargando reseñas...</p>;
    if (error) return <p>Error al cargar reseñas.</p>;
    if (!games) return <p>No hay juegos.</p>;

    // Filtrar solo juegos con reseña
    const gamesWithReviews = games.filter(
        game => game.review && game.review.trim() !== ""
    );

    // LIKE
    const handleLike = async (gameId) => {
        try {
            const response = await axios.patch(
                `http://localhost:4000/api/games/${gameId}/like`
            );
            dispatch({ type: "UPDATE_GAME", payload: response.data });
        } catch (err) {
            console.error("Error al dar like:", err);
        }
    };

    // AGREGAR
    const handleAddComment = async (e, gameId) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        try {
            const response = await axios.post(
                `http://localhost:4000/api/games/${gameId}/comment`,
                { text: commentText }
            );
            dispatch({ type: "UPDATE_GAME", payload: response.data });
            setCommentText("");
        } catch (err) {
            console.error("Error al agregar comentario:", err);
        }
    };

    // EDITAR
    const startEdit = (comment) => {
        setEditingCommentId(comment._id);
        setEditingText(comment.text);
    };

    const handleEditComment = async (gameId, commentId) => {
        if (!editingText.trim()) return;

        try {
            const response = await axios.patch(
                `http://localhost:4000/api/games/${gameId}/comment/${commentId}`,
                { text: editingText }
            );
            dispatch({ type: "UPDATE_GAME", payload: response.data });
            setEditingCommentId(null);
            setEditingText("");
        } catch (err) {
            console.error("Error al editar comentario:", err);
        }
    };

    // ELIMINAR
    const handleDeleteComment = async (gameId, commentId) => {
        try {
            const response = await axios.delete(
                `http://localhost:4000/api/games/${gameId}/comment/${commentId}`
            );
            dispatch({ type: "UPDATE_GAME", payload: response.data });
        } catch (err) {
            console.error("Error al eliminar comentario:", err);
        }
    };

    return (
        <div className="reviews-page">
            <h2>Reseñas</h2>

            {gamesWithReviews.length === 0 && <p>No hay reseñas aún.</p>}

            {gamesWithReviews.map((game) => (
                <div key={game._id} className="review-game-card">
                    <h3>{game.title}</h3>
                    <p className="review-main-text">{game.review}</p>

                    {/* LIKE */}
                    <button
                        onClick={() => handleLike(game._id)}
                        className={`like-btn ${game.liked ? "liked" : "not-liked"}`}
                    >
                        {game.liked ? "💙 Quitar Like" : "❤️ Dar Like"} ({game.likesCount})
                    </button>

                    {/* COMENTARIOS */}
                    <div className="comments-section">
                        <h4 className="comments-title">Comentarios:</h4>

                        {game.comments && game.comments.length > 0 ? (
                            game.comments.map((comment) => (
                                <div key={comment._id} className="comment-card">
                                    {editingCommentId === comment._id ? (
                                        <>
                                            <input
                                                value={editingText}
                                                onChange={(e) => setEditingText(e.target.value)}
                                                className="comment-input"
                                                style={{ width: "100%" }}
                                            />
                                            <button
                                                onClick={() =>
                                                    handleEditComment(game._id, comment._id)
                                                }
                                                className="comment-btn edit"
                                            >
                                                Guardar
                                            </button>

                                            <button
                                                onClick={() => setEditingCommentId(null)}
                                                className="comment-btn delete"
                                            >
                                                Cancelar
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <p>{comment.text}</p>

                                            <button
                                                onClick={() => startEdit(comment)}
                                                className="comment-btn edit"
                                            >
                                                Editar
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDeleteComment(game._id, comment._id)
                                                }
                                                className="comment-btn delete"
                                            >
                                                Eliminar
                                            </button>
                                        </>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No hay comentarios todavía.</p>
                        )}

                        {/* FORMULARIO */}
                        <form
                            onSubmit={(e) => handleAddComment(e, game._id)}
                            className="comment-form"
                        >
                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Escribe un comentario..."
                                className="comment-input"
                            />
                            <button type="submit" className="comment-submit">
                                Comentar
                            </button>
                        </form>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Reviews;
