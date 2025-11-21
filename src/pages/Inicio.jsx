// Archivo: frontend/src/pages/Inicio.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import "./Inicio.css";

function Inicio() {
  const { games, isLoading } = useContext(GameContext);

  // Estadísticas simples
  const totalGames = games ? games.length : 0;
  const completedGames = games ? games.filter(g => g.isCompleted).length : 0;
  const reviewsCount = games ? games.filter(g => g.review && g.review.trim() !== "").length : 0;

  return (
    <div className="inicio-page page-container">

      {/* =============================== */}
      {/*            HERO                 */}
      {/* =============================== */}
      <section className="hero-section section-box">
        <div className="hero-content">

          {/* =============================== */}
          {/*         LADO IZQUIERDO         */}
          {/* =============================== */}
          <div className="hero-left">
            <h1 className="hero-title">GameTracker</h1>

            <p className="hero-sub">
              Administra tus videojuegos de manera elegante, rápida y visual.  
              Lleva registro de tu progreso, horas jugadas, reseñas y estadísticas,  
              todo dentro de una plataforma creada con un estilo futurista y neón.
            </p>

            <div className="hero-ctas">
              <Link to="/biblioteca" className="cta-btn primary">
                Ir a mi Biblioteca
              </Link>
              <Link to="/reseñas" className="cta-btn ghost">
                Ver Reseñas
              </Link>
            </div>

            {/* =============================== */}
            {/*           ESTADÍSTICAS          */}
            {/* =============================== */}
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-num">{isLoading ? "..." : totalGames}</span>
                <span className="stat-label">Juegos</span>
              </div>

              <div className="stat">
                <span className="stat-num">{isLoading ? "..." : completedGames}</span>
                <span className="stat-label">Completados</span>
              </div>

              <div className="stat">
                <span className="stat-num">{isLoading ? "..." : reviewsCount}</span>
                <span className="stat-label">Reseñas</span>
              </div>
            </div>
          </div>

          {/* =============================== */}
          {/*      TARJETA MOTIVACIONAL       */}
          {/* =============================== */}
          <div className="hero-right">
            <div className="hero-card motivational-card">
              <div className="hero-card-top neon-border">
                🎮 Mantén viva tu pasión gamer
              </div>

              <div className="hero-card-body">

                <div className="motivational-text">
                  <h3>“Cada partida es una historia que vale la pena vivir.”</h3>

                  <p>
                    Los videojuegos no son solo entretenimiento:  
                    también son arte, desafíos, decisiones, mundos,  
                    aventuras y emociones que se quedan contigo.
                  </p>

                  <p>
                    Aquí puedes llevar un registro de todas esas experiencias,  
                    mostrar tu progreso, recordar tus mejores partidas  
                    y motivarte a seguir explorando nuevos universos.
                  </p>

                  <p className="highlight">
                    ✨ No importa si juegas poco o mucho:  
                    lo importante es disfrutar cada momento.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =============================== */}
      {/*            FEATURES             */}
      {/* =============================== */}
      <section className="features-section">
        <h2 className="section-title">¿Qué puedes hacer?</h2>

        <div className="features-grid">

          <div className="feature-card section-box">
            <div className="feature-icon">📚</div>
            <h3>Organiza tu biblioteca</h3>
            <p>
              Agrega, edita y elimina juegos fácilmente.  
              Lleva el control de horas jugadas, estados y plataformas.
            </p>
          </div>

          <div className="feature-card section-box">
            <div className="feature-icon">✍️</div>
            <h3>Escribe reseñas</h3>
            <p>
              Comparte tus opiniones, deja comentarios  
              y visualiza un muro completo de reseñas.
            </p>
          </div>

          <div className="feature-card section-box">
            <div className="feature-icon">📊</div>
            <h3>Estadísticas personales</h3>
            <p>
              Descubre tus hábitos de juego, promedios,  
              tendencias y juegos más completos.
            </p>
          </div>

          <div className="feature-card section-box">
            <div className="feature-icon">🔎</div>
            <h3>Filtra y busca</h3>
            <p>
              Encuentra juegos rápidamente con filtros  
              por categoría, estado, orden alfabético y más.
            </p>
          </div>
        </div>
      </section>

      {/* =============================== */}
      {/*              FOOTER             */}
      {/* =============================== */}
      <footer className="inicio-footer section-box">
        <div className="footer-left">
          <h4>GameTracker</h4>
          <p className="muted">Proyecto Final - Ashley Enriquez</p>
        </div>

        <div className="footer-right">
          <p className="muted">Síguenos</p>
          <div className="socials">
            <a href="#" className="social-btn">Twitter</a>
            <a href="#" className="social-btn">Instagram</a>
            <a href="#" className="social-btn">GitHub</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Inicio;

