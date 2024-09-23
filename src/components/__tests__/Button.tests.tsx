import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('deve renderizar corretamente com o texto passado como children', () => {
    render(
      <Button onClick={mockOnClick} currentStep={2}>
        Continuar
      </Button>,
    );

    const buttonElement = screen.getByRole('button', { name: /continuar/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('deve chamar a função onClick ao ser clicado', () => {
    render(
      <Button onClick={mockOnClick} currentStep={2}>
        Continuar
      </Button>,
    );

    const buttonElement = screen.getByRole('button', { name: /continuar/i });
    fireEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('deve desabilitar o botão quando currentStep é 4', () => {
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
