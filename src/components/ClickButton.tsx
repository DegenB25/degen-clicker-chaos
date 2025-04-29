
import React from 'react';
import './ClickButton.css';

interface ClickButtonProps {
  onClick: () => void;
}

const ClickButton: React.FC<ClickButtonProps> = ({ onClick }) => {
  return (
    <button className="click-button" onClick={onClick}>
      CLICK ME
    </button>
  );
};

export default ClickButton;
