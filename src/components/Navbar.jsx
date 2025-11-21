import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/Navbar.css"; // O "./Navbar.scss" si estás usando Sass

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    // 1. Cambiamos 'navbar' a 'main-nav' para que coincida con nuestro CSS/SCSS
    <nav className="main-nav"> 
      
      {/* 2. LOGO: Eliminamos la duplicación y usamos la clase 'nav-logo' */}
      <div className="nav-logo">
        <div className="nav-logo-icon"></div> 
        <Link to="/">GameTracker</Link> {/* Usamos <Link> en lugar de <a> */}
      </div>
 

      {/* 4. LINKS: DEBEMOS USAR UNA LISTA <ul> Y <li> para el correcto espaciado (gap) */}
      <ul className={`nav-list ${open ? 'is-open' : ''}`} id="nav-list">
        <li>
          <Link to="/" onClick={() => setOpen(false)}>Inicio</Link>
        </li>
        <li>
          <Link to="/biblioteca" onClick={() => setOpen(false)}>Biblioteca</Link>
        </li>
        <li>
          <Link to="/reseñas" onClick={() => setOpen(false)}>Reseñas</Link>
        </li>
        <li>
          <Link to="/estadisticas" onClick={() => setOpen(false)}>Estadísticas</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
