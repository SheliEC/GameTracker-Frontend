// Archivo: frontend/src/components/GameFilters.jsx

import React from 'react';

function GameFilters({ filterStatus, setFilterStatus }) {
    return (
        <div className="filters-container">
            <label>Filtrar por estado:</label>

            <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
            >
                <option value="all">Todos</option>
                <option value="completed">Completados</option>
                <option value="pending">Pendientes</option>
            </select>
        </div>
    );
}

export default GameFilters;
