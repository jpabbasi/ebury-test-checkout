import React from 'react';
import { render } from '@testing-library/react';
import LoadingOverlay from '../LoadingOverlay';

describe('LoadingOverlay Component', () => {
  it('não deve renderizar o overlay quando isLoading for false', () => {
    render(<LoadingOverlay isLoading={false} />);
    expect(document.querySelector('.loading-overlay')).not.toBeInTheDocument();
  });

  it('deve renderizar o overlay quando isLoading for true', () => {
    render(<LoadingOverlay isLoading={true} />);
    expect(document.querySelector('.loading-overlay')).toBeInTheDocument();
  });

  it('deve renderizar o spinner quando isLoading for true', () => {
    render(<LoadingOverlay isLoading={true} />);
    expect(document.querySelector('.loading-spinner')).toBeInTheDocument();
  });
});
