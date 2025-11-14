import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header>
      <div className='container'>
        <Link to="/">
          <h1>GameTracker</h1>
        </Link>
        <nav>
          <Link to="/">Biblioteca</Link>
          <Link to="/stats">Estadísticas</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;