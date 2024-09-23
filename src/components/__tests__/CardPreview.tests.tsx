import React from 'react';
import { render, screen } from '@testing-library/react';
import CardPreview from '../CardPreview';
import { getCardBrandFullName } from '../../utils/CardUtils';

jest.mock('../../utils/CardUtils', () => ({
  getCardBrandFullName: jest.fn(),
}));

describe('CardPreview Component', () => {
  const mockGetCardBrandFullName = getCardBrandFullName as jest.MockedFunction<
    typeof getCardBrandFullName
  >;

  beforeEach(() => {
    mockGetCardBrandFullName.mockClear();
  });

  it('Must render correctly all data', () => {
    mockGetCardBrandFullName.mockReturnValue('American Express');

    render(
      <CardPreview
        cardBrand="amex"
        cardNumber="4111 1111 1111 1111"
        cardHolder="Pedro Abbasi"
        expiration="12/25"
      />,
    );

    expect(mockGetCardBrandFullName).toHaveBeenCalledWith('amex');
    expect(screen.getByText('American Express')).toBeInTheDocument();

    expect(screen.getByText('4111 1111 1111 1111')).toBeInTheDocument();

    expect(screen.getByText('Pedro Abbasi')).toBeInTheDocument();

    expect(screen.getByText('12/25')).toBeInTheDocument();
  });

  it('Must render placeholders correctly if fields are empty', () => {
    mockGetCardBrandFullName.mockReturnValue('Unknown');

    render(
      <CardPreview
        cardBrand="unknown"
        cardNumber=""
        cardHolder=""
        expiration=""
      />,
    );

    expect(screen.getByText('**** **** **** ****')).toBeInTheDocument();
    expect(screen.getByText('NOME DO TITULAR')).toBeInTheDocument();
    expect(screen.getByText('MM/AA')).toBeInTheDocument();
  });

  it('Must apply correctly css based on cardBrand', () => {
    render(
      <CardPreview
        cardBrand="mastercard"
        cardNumber="5555 5555 5555 4444"
        cardHolder="Pedro Abbasi"
        expiration="11/26"
      />,
    );

    const cardPreviewElement = screen.getByLabelText('Credit card preview');

    expect(cardPreviewElement).toHaveClass('card-preview mastercard');
  });
});
