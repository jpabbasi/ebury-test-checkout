import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import Notification from '../Notification';

describe('Notification Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('deve renderizar uma mensagem de sucesso quando o status for 200', () => {
    render(
      <Notification status={200} isVisible={true} onClose={mockOnClose} />,
    );
    expect(
      screen.getByText('Compra Aprovada! Verifique seu e-mail'),
    ).toBeInTheDocument();
  });

  it('deve renderizar uma mensagem de erro quando o status não for 200', () => {
    render(
      <Notification status={400} isVisible={true} onClose={mockOnClose} />,
    );
    expect(
      screen.getByText('Compra Rejeitada! Tente novamente'),
    ).toBeInTheDocument();
  });

  it('deve ocultar a notificação após 5 segundos e chamar a função onClose', async () => {
    jest.useFakeTimers();

    render(
      <Notification status={200} isVisible={true} onClose={mockOnClose} />,
    );

    expect(
      screen.getByText('Compra Aprovada! Verifique seu e-mail'),
    ).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => expect(mockOnClose).toHaveBeenCalled());

    jest.useRealTimers();
  });
});
