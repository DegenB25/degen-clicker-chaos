
import React from 'react';
import './ClickButton.css';
import { playSound, SOUNDS } from '../utils/audioUtils';

interface ClickButtonProps {
  onClick: () => void;
}

const ClickButton: React.FC<ClickButtonProps> = ({ onClick }) => {
  const handleClick = () => {
    // Play click sound
    playSound(SOUNDS.CLICK, 0.5);
    // Call the original onClick handler
    onClick();
  };
  
  return (
    <button className="click-button" onClick={handleClick}>
      CLICK ME
    </button>
  );
};

export default ClickButton;
