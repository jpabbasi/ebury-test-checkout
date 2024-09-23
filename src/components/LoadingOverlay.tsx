import React from 'react';
import '../styles/LoadingOverlay.css';

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div
      className="loading-overlay"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="loading-spinner" />
    </div>
  );
};

export default LoadingOverlay;
