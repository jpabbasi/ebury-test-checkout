import React from 'react';
import { render, screen } from '@testing-library/react';
import StepsHeader from '../StepsHeader';

describe('StepsHeader Component', () => {
  it('deve renderizar corretamente com currentStep = 1', () => {
    render(<StepsHeader currentStep={1} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    expect(screen.getByText('Carrinho')).toBeInTheDocument();
    expect(screen.getByText('Pagamento')).toBeInTheDocument();
    expect(screen.getByText('Confirmação')).toBeInTheDocument();
  });

  it('deve exibir o ícone de check para os passos completados (currentStep = 2)', () => {
    render(<StepsHeader currentStep={2} />);

    const checkIcons = document.querySelectorAll('.step.completed svg');
    expect(checkIcons.length).toBe(1);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('deve exibir o ícone de check para todos os passos até o currentStep (currentStep = 3)', () => {
    render(<StepsHeader currentStep={3} />);

    const checkIcons = document.querySelectorAll('.step.completed svg');
    expect(checkIcons.length).toBe(2);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('deve lidar corretamente com currentStep maior que o número de etapas', () => {
    render(<StepsHeader currentStep={4} />);

    const checkIcons = document.querySelectorAll('.step.completed svg');
    expect(checkIcons.length).toBe(3);

    expect(screen.getByText('Etapa 3 de 3')).toBeInTheDocument();
  });
});
