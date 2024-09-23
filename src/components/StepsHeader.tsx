import React from 'react';
import '../styles/StepsHeader.css';
import { FaArrowRight } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';

interface StepsProps {
  currentStep: number;
}

const StepsHeader: React.FC<StepsProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Carrinho' },
    { id: 2, label: 'Pagamento' },
    { id: 3, label: 'Confirmação' },
  ];

  return (
    <nav className="steps-header" aria-label="Progress">
      <ul className="steps-wrapper">
        {steps.map((step, index) => (
          <li className="step-container" key={step.id}>
            <div
              className={`step ${step.id < currentStep ? 'completed' : 'incomplete'}`}
            >
              {step.id < currentStep ? (
                <FaCheck aria-label="Completed" />
              ) : (
                step.id
              )}
            </div>
            <span className="step-label">{step.label}</span>
            {index < steps.length - 1 && (
              <FaArrowRight className="arrow-icon" aria-hidden="true" />
            )}
          </li>
        ))}
      </ul>
      <div className="steps-mobile">
        {`Etapa ${currentStep > 3 ? 3 : currentStep} de ${steps.length}`}
      </div>
    </nav>
  );
};

export default StepsHeader;
