// Archivo: frontend/src/components/GameControls.jsx

import React from "react";
import "./GameControls.css"; // Importa los estilos (lo creamos abajo)

const categories = [
    "Acción", "Aventura", "RPG", "Shooter", "Deportes", "Estrategia",
    "Simulación", "Carreras", "Indie", "Puzzle", "Terror", "Plataformas"
];

function GameControls({
    filterStatus,
    setFilterStatus,
    sortOption,
    setSortOption,
    filterCategory,
    setFilterCategory
}) {
    return (
        <div className="controls-panel">

            {/* FILTROS */}
            <div className="filter-section">
                <h4>Filtrar por estado</h4>
                <div className="filter-buttons">
                    <button 
                        className={filterStatus === "all" ? "active-btn" : ""}
                        onClick={() => setFilterStatus("all")}
                    >
                        Todos
                    </button>

                    <button 
                        className={filterStatus === "completed" ? "active-btn" : ""}
                        onClick={() => setFilterStatus("completed")}
                    >
                        ✔ Completados
                    </button>

                    <button 
                        className={filterStatus === "pending" ? "active-btn" : ""}
                        onClick={() => setFilterStatus("pending")}
                    >
                        ⏳ Pendientes
                    </button>
                </div>
            </div>

            {/* FILTRO POR CATEGORÍA */}
            <div className="category-section">
                <h4>Categoría</h4>
                <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="category-select"
        >
            <option value="all">Todas</option>
            {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
        ))}
            </select>
            </div>

            {/* ORDENAMIENTO */}
            <div className="sort-section">
                <h4>Ordenar por</h4>
                <div className="sort-buttons">

                    <button
                        className={sortOption === "az" ? "active-btn" : ""}
                        onClick={() => setSortOption("az")}
                    >
                        🔤 A - Z
                    </button>

                    <button
                        className={sortOption === "za" ? "active-btn" : ""}
                        onClick={() => setSortOption("za")}
                    >
                        🔠 Z - A
                    </button>

                    <button
                        className={sortOption === "hours-asc" ? "active-btn" : ""}
                        onClick={() => setSortOption("hours-asc")}
                    >
                        🕒 Menos Horas
                    </button>

                    <button
                        className={sortOption === "hours-desc" ? "active-btn" : ""}
                        onClick={() => setSortOption("hours-desc")}
                    >
                        ⏱ Más Horas
                    </button>
                </div>
            </div>

        </div>
    );
}

export default GameControls;
