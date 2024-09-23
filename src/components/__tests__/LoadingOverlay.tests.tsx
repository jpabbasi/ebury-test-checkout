import React from 'react';
import { render } from '@testing-library/react';
import LoadingOverlay from '../LoadingOverlay';

describe('LoadingOverlay Component', () => {
  it("Mustn't render the overlay when isLoading is false", () => {
    render(<LoadingOverlay isLoading={false} />);
    expect(document.querySelector('.loading-overlay')).not.toBeInTheDocument();
  });

  it('Must render the overlay when isLoading is true', () => {
    render(<LoadingOverlay isLoading={true} />);
    expect(document.querySelector('.loading-overlay')).toBeInTheDocument();
  });

  it('Must render the spinner when isLoading is true', () => {
    render(<LoadingOverlay isLoading={true} />);
    expect(document.querySelector('.loading-spinner')).toBeInTheDocument();
  });
});
