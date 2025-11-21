// Archivo: frontend/src/components/Stats.jsx

import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import "./Stats.css";


const Stats = () => {
    const { games, isLoading, error } = useContext(GameContext);

    if (isLoading) {
        return <div className="stats-loading">Cargando estadísticas...</div>;
    }

    if (error || !games) {
        return <div className="stats-error">No se pudieron cargar los datos para las estadísticas.</div>;
    }
    
    // ⬇️ CÁLCULOS CLAVE ⬇️
    const totalGames = games.length;
    
    // Juegos Completados
    const completedGames = games.filter(game => game.isCompleted).length;
    
    // Promedio de Horas
    const totalHours = games.reduce((sum, game) => sum + (game.hoursPlayed || 0), 0);
    const averageHours = totalGames > 0 ? (totalHours / totalGames).toFixed(1) : 0; // Promedio con un decimal

    // Promedio de Calificación (Solo para juegos calificados)
    const ratedGames = games.filter(game => game.rating && game.rating >= 1 && game.rating <= 5);
    const totalRatingSum = ratedGames.reduce((sum, game) => sum + game.rating, 0);
    const averageRating = ratedGames.length > 0 ? (totalRatingSum / ratedGames.length).toFixed(1) : 0;
    
    // Juego Mejor Calificado
    const bestRatedGame = ratedGames.length > 0
        ? ratedGames.reduce((best, current) => (current.rating > best.rating ? current : best), ratedGames[0])
        : null;

    return (
        <div className="stats-container">
            <h2>Estadísticas de la Biblioteca</h2>
            
            <div className="stat-card">
                <h3>Total de Juegos</h3>
                <p>{totalGames}</p>
            </div>
            
            <div className="stat-card">
                <h3>Juegos Completados</h3>
                <p>{completedGames} de {totalGames}</p>
            </div>
            
            <div className="stat-card">
                <h3>Promedio de Horas por Juego</h3>
                <p>{averageHours} hrs</p>
            </div>
            
            <div className="stat-card">
                <h3>Calificación Promedio</h3>
                <p>⭐ {averageRating} / 5</p>
            </div>
            
            {bestRatedGame && (
                <div className="stat-card best-game">
                    <h3>Mejor Calificado</h3>
                    <p>{bestRatedGame.title} (⭐ {bestRatedGame.rating})</p>
                </div>
            )}
        </div>
    );
};

export default Stats;