
import React, { useState } from 'react';
import './ClickButton.css';
import { playSoundWithFallback, SOUNDS } from '../utils/audioUtils';

interface ClickButtonProps {
  onClick: () => void;
}

const ClickButton: React.FC<ClickButtonProps> = ({ onClick }) => {
  const [isClicking, setIsClicking] = useState(false);
  
  const handleClick = () => {
    // Visual feedback during click
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 100);
    
    // Play click sound with fallback
    playSoundWithFallback(SOUNDS.CLICK, SOUNDS.CLICK_FALLBACK, 0.5);
    
    // Call the original onClick handler
    onClick();
  };
  
  return (
    <button 
      className={`click-button ${isClicking ? 'clicking' : ''}`}
      onClick={handleClick}
    >
      CLICK ME
    </button>
  );
};

export default ClickButton;
