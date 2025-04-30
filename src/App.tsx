
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import BetaBanner from './components/BetaBanner';
import ClickButton from './components/ClickButton';
import { playSoundWithFallback, SOUNDS } from './utils/audioUtils';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState('home');
  const [previousTokens, setPreviousTokens] = useState(0);

  const handleClick = () => {
    setCount(prevCount => prevCount + 1);
  };

  // Handle page change sound
  const handlePageChange = (newPage: string) => {
    if (newPage !== page) {
      playSoundWithFallback(SOUNDS.PAGE_CHANGE, SOUNDS.PAGE_CHANGE_FALLBACK, 0.3);
      setPage(newPage);
    }
  };

  // Check if tokens increased and play sound
  useEffect(() => {
    const currentTokens = Math.floor(count / 10);
    if (currentTokens > previousTokens) {
      playSoundWithFallback(SOUNDS.TOKEN_EARN, SOUNDS.TOKEN_EARN_FALLBACK, 0.4);
      setPreviousTokens(currentTokens);
    }
  }, [count, previousTokens]);

  const renderPage = () => {
    switch (page) {
      case 'home':
        return (
          <div className="home-page">
            <h1>Clicker Game</h1>
            <ClickButton onClick={handleClick} />
            <div className="click-count">Clicks: {count}</div>
          </div>
        );
      case 'lore':
        return (
          <div className="lore-page">
            <h1>The Lore</h1>
            <p>In a world where clicks mean everything, you are the chosen one to save the universe with your clicking powers.</p>
            <p>Every click brings balance to the digital realm.</p>
          </div>
        );
      case 'token':
        return (
          <div className="token-page">
            <h1>$Click Token</h1>
            <p>Earn $Click tokens with every click!</p>
            <p>Current $Click Balance: {Math.floor(count / 10)}</p>
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="app">
      <NavBar currentPage={page} setPage={handlePageChange} />
      <BetaBanner />
      <main className="content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
