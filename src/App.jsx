import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importar Componentes y Vistas
import Navbar from './components/Navbar';
import Library from './pages/Library';
import Stats from './pages/Stats';

function App() {
  return (
    <div className="App">
      {/* BrowserRouter envuelve toda la aplicación para manejar las rutas */}
      <BrowserRouter> 
        <Navbar /> {/* La barra de navegación se muestra en todas las páginas */}
        <div className='pages'>
          {/* Routes define las posibles rutas de la aplicación */}
          <Routes>
            {/* Ruta Principal: Biblioteca */}
            <Route path="/" element={<Library />} /> 
            {/* Ruta de Estadísticas */}
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
