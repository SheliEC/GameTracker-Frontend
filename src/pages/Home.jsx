import { useContext, useState } from 'react';
import { GameContext } from '../context/GameContext'; 

import GameForm from '../components/GameForm';
import GameCard from '../components/GameCard';
import "./Biblioteca.css";

import GameControls from '../components/GameControls';

function Home() {
    const { games, isLoading, error } = useContext(GameContext);
    
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [sortOption, setSortOption] = useState("none");
    const [filterCategory, setFilterCategory] = useState("all");

    // FILTRAR JUEGOS
    let filteredGames = games
        ? games.filter((game) => {
            if (filterStatus === "completed") return game.isCompleted === true;
            if (filterStatus === "pending") return game.isCompleted === false;
            return true;
        })
        : [];

    if (searchTerm.trim() !== "") {
        filteredGames = filteredGames.filter((game) =>
            game.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // ORDENAMIENTOS
    if (sortOption === "az") {
        filteredGames = filteredGames.sort((a, b) => 
            a.title.localeCompare(b.title)
        );
    }

    if (sortOption === "za") {
        filteredGames = filteredGames.sort((a, b) => 
            b.title.localeCompare(a.title)
        );
    }

    if (sortOption === "hours-asc") {
        filteredGames = filteredGames.sort((a, b) => 
            (a.hoursPlayed || 0) - (b.hoursPlayed || 0)
        );
    }

    if (sortOption === "hours-desc") {
        filteredGames = filteredGames.sort((a, b) => 
            (b.hoursPlayed || 0) - (a.hoursPlayed || 0)
        );
    }

    if (filterCategory !== "all") {
        filteredGames = filteredGames.filter(game => game.category === filterCategory);
    }

    return (
        <div className="library-page">

            <GameForm />

            {/* PANEL MODERNO */}
            <GameControls
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                sortOption={sortOption}
                setSortOption={setSortOption}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
            />

            {/* BUSCADOR */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Buscar juego por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="game-list">
                <h2>Mi Biblioteca de Juegos</h2>

                {error && <p className="error">{error}</p>}
                {isLoading && <p>Cargando juegos...</p>}

                {/* ⭐ AQUÍ COLOQUÉ LA GRID CORRECTAMENTE */}
                <div className="game-grid">
                    {filteredGames && filteredGames.map(game => (
                        <GameCard key={game._id} game={game} />
                    ))}
                </div>

                {filteredGames.length === 0 && !isLoading && (
                    <p>No hay juegos con este filtro u ordenamiento.</p>
                )}
            </div>
        </div>
    );
}

export default Home;



