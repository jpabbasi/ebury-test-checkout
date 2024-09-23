import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReturnButton from '../ReturnButton';
import reloadPage from '../../utils/reloadPage';

jest.mock('../../utils/reloadPage', () => jest.fn());

describe('ReturnButton Component', () => {
  it('deve renderizar o ícone e o texto corretamente', () => {
    render(<ReturnButton />);
    expect(screen.getByText('Alterar forma de pagamento')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('deve chamar reloadPage ao clicar no botão', () => {
    render(<ReturnButton />);

    fireEvent.click(screen.getByRole('button'));
    expect(reloadPage).toHaveBeenCalled();
  });
});
