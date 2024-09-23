import React from 'react';
import '../styles/Buttons.css';

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  currentStep: number;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, currentStep }) => {
  return (
    <button
      type="submit"
      className={`submit-button ${currentStep === 4 ? 'completed' : currentStep === 5 ? 'denied' : ''}`}
      onClick={onClick}
      disabled={currentStep === 4 && true}
    >
      {children}
    </button>
  );
};

export default Button;
