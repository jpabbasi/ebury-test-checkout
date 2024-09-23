import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReturnButton from '../ReturnButton';
import reloadPage from '../../utils/reloadPage';

jest.mock('../../utils/reloadPage', () => jest.fn());

describe('ReturnButton Component', () => {
  it('Must render the icon and text correctly', () => {
    render(<ReturnButton />);
    expect(screen.getByText('Alterar forma de pagamento')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Must call reloadPage when the button is clicked', () => {
    render(<ReturnButton />);

    fireEvent.click(screen.getByRole('button'));
    expect(reloadPage).toHaveBeenCalled();
  });
});
