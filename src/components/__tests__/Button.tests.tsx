import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('Must render correctly the text as children', () => {
    render(
      <Button onClick={mockOnClick} currentStep={2}>
        Continuar
      </Button>,
    );

    const buttonElement = screen.getByRole('button', { name: /continuar/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('Must call a function onClick', () => {
    render(
      <Button onClick={mockOnClick} currentStep={2}>
        Continuar
      </Button>,
    );

    const buttonElement = screen.getByRole('button', { name: /continuar/i });
    fireEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('Must disable the button if step is 4', () => {
    render(
      <Button onClick={mockOnClick} currentStep={4}>
        Pagamento Confirmado
      </Button>,
    );

    const buttonElement = screen.getByRole('button', {
      name: /pagamento confirmado/i,
    });
    expect(buttonElement).toBeDisabled();
  });
});
