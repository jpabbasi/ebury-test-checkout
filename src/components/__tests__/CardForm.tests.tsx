import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CardForm from '../CardForm';

describe('CardForm Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('Must render the form correctly', () => {
    render(<CardForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/Número do cartão/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Nome \(igual ao cartão\)/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Validade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CVV/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Número de parcelas/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /CONTINUAR/i }),
    ).toBeInTheDocument();
  });

  it('Must update the form values as you type', () => {
    render(<CardForm onSubmit={mockOnSubmit} />);

    const cardNumberInput = screen.getByLabelText(/Número do cartão/i);
    fireEvent.change(cardNumberInput, {
      target: { value: '4111111111111111' },
    });
    expect(cardNumberInput).toHaveValue('4111 1111 1111 1111');

    const cardHolderInput = screen.getByLabelText(/Nome \(igual ao cartão\)/i);
    fireEvent.change(cardHolderInput, { target: { value: 'Pedro Abbasi' } });
    expect(cardHolderInput).toHaveValue('Pedro Abbasi');
  });

  it("Musn't call function onSubmit if there are empty fields", async () => {
    render(<CardForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /CONTINUAR/i });
    fireEvent.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
