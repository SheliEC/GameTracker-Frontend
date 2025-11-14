// Archivo: frontend/src/App.jsx (CÓDIGO COMPLETO PARA NAVEGACIÓN Y RUTAS)

// Archivo: frontend/src/App.jsx

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx'; // <--- Añadir .jsx si no funciona
import Stats from './pages/Stats.jsx'; // <--- Añadir .jsx
import { GameContextProvider } from './context/GameContext';

function App() {
    return (
        <div className="App">
            <GameContextProvider>
                <BrowserRouter>
                    <header>
                        <nav>
                            <h1>GameTracker</h1>
                            <div className="nav-links">
                                {/* Enlaces de navegación */}
                                <Link to="/">Biblioteca</Link>
                                <Link to="/estadisticas">Estadísticas</Link>
                            </div>
                        </nav>
                    </header>
                    <div className="pages">
                        <Routes>
                            <Route 
                                path="/" 
                                element={<Home />} 
                            />
                            {/* Nueva Ruta para Estadísticas */}
                            <Route 
                                path="/estadisticas" 
                                element={<Stats />} 
                            />
                        </Routes>
                    </div>
                </BrowserRouter>
            </GameContextProvider>
        </div>
    );
}

export default App;
