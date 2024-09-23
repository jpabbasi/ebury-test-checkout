import React from 'react';
import '../styles/Buttons.css';
import { AiOutlineLeft } from 'react-icons/ai';
import reloadPage from '../utils/reloadPage';

const ReturnButton: React.FC = () => {
  const handleReload = (e: React.MouseEvent) => {
    e.preventDefault();
    reloadPage();
  };

  return (
    <div className="return-button" onClick={handleReload} role="button">
      <AiOutlineLeft />
      <div>Alterar forma de pagamento</div>
    </div>
  );
};

export default ReturnButton;
