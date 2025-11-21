// Archivo: frontend/src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Stats from './pages/Stats';
import Inicio from './pages/Inicio';
import Reviews from "./pages/Reviews";

import Navbar from "./components/Navbar";  // ⬅️ Usamos TU barra bonita
import { GameContextProvider } from './context/GameContext';

function App() {
    return (
        <div className="App">
            <GameContextProvider>
                <BrowserRouter>

                    {/* ⬅️ Navbar global bonito */}
                    <Navbar />

                    <div className="pages">
                        <Routes>
                            <Route path="/" element={<Inicio />} />
                            <Route path="/biblioteca" element={<Home />} />
                            <Route path="/reseñas" element={<Reviews />} />
                            <Route path="/estadisticas" element={<Stats />} />
                        </Routes>
                    </div>

                </BrowserRouter>
            </GameContextProvider>
        </div>
    );
}

export default App;
