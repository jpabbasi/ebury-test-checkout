import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import Notification from '../Notification';

describe('Notification Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('Must render a success message when the status is 200', () => {
    render(
      <Notification status={200} isVisible={true} onClose={mockOnClose} />,
    );
    expect(
      screen.getByText('Compra Aprovada! Verifique seu e-mail'),
    ).toBeInTheDocument();
  });

  it('Must render an error message when the status is not 200', () => {
    render(
      <Notification status={400} isVisible={true} onClose={mockOnClose} />,
    );
    expect(
      screen.getByText('Compra Rejeitada! Tente novamente'),
    ).toBeInTheDocument();
  });

  it('Must hide the notification after 5 seconds and call the onClose function', async () => {
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
