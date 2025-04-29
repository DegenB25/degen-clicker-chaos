
import React from 'react';
import './NavBar.css';

interface NavBarProps {
  currentPage: string;
  setPage: (page: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ currentPage, setPage }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">Clicker Game</div>
        <div className="nav-links">
          <button
            className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => setPage('home')}
          >
            Home
          </button>
          <button
            className={`nav-button ${currentPage === 'lore' ? 'active' : ''}`}
            onClick={() => setPage('lore')}
          >
            The Lore
          </button>
          <button
            className={`nav-button ${currentPage === 'token' ? 'active' : ''}`}
            onClick={() => setPage('token')}
          >
            $Click Token
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
