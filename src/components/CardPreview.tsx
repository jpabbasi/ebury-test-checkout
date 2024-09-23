import React from 'react';
import '../styles/CardPreview.css';
import { getCardBrandFullName } from '../utils/CardUtils';

interface CardPreviewProps {
  cardBrand: string;
  cardNumber: string;
  cardHolder: string;
  expiration: string;
}

const CardPreview: React.FC<CardPreviewProps> = ({
  cardBrand,
  cardNumber,
  cardHolder,
  expiration,
}) => {
  return (
    <article
      className={`card-preview ${cardBrand}`}
      aria-label="Credit card preview"
    >
      <header>
        <p>
          {cardBrand === 'unknown' ? '\u00A0' : getCardBrandFullName(cardBrand)}
        </p>
      </header>
      <div className="card-number" aria-label="Card number">
        <h1>{cardNumber || '**** **** **** ****'}</h1>
      </div>
      <footer className="card-preview-footer">
        <div aria-label="Card holder name">
          {cardHolder || 'NOME DO TITULAR'}
        </div>
        <div aria-label="Expiration date">{expiration || 'MM/AA'}</div>
      </footer>
    </article>
  );
};

export default CardPreview;
