import React, { useState } from 'react';
import '../styles/CardForm.css';
import { useFormValidation } from '../hooks/useFormValidation';
import { formatInputValue } from '../utils/Formatters';
import InputField from './InputField';
import Button from './Button';
import CardPreview from './CardPreview';
import ReturnButton from './ReturnButton';
import StepsHeader from './StepsHeader';
import { CiCreditCard1 } from 'react-icons/ci';
import { getInstallmentOptions } from '../utils/Installments';
import { getCardBrand } from '../utils/CardUtils';
import LoadingOverlay from './LoadingOverlay';
import Notification from './Notification';

interface CardData {
  cardNumber: string;
  cardHolder: string;
  expiration: string;
  cvv: string;
  installments: string;
}

interface apiPaymentResponse {
  status: number;
  message: string;
}

interface Props {
  onSubmit: (data: CardData) => Promise<apiPaymentResponse>;
}

const CardForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<CardData>({
    cardNumber: '',
    cardHolder: '',
    expiration: '',
    cvv: '',
    installments: '',
  });

  const { errors, validate } = useFormValidation();
  const [cardBrand, setCardBrand] = useState('unknown');
  const [currentStep, setCurrentStep] = useState(2);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    status: 0,
    isVisible: false,
  });
  const [isDone, setIsDone] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const formattedValue = formatInputValue(name, value);

    setFormData((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }));
    validate(name, formattedValue);

    if (name === 'cardNumber') {
      setCardBrand(getCardBrand(formattedValue));
    }
  };

  const cardDataFields: Array<keyof CardData> = [
    'cardNumber',
    'cardHolder',
    'expiration',
    'cvv',
    'installments',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasErrors = cardDataFields.map((field) =>
      validate(field, formData[field]),
    );

    if (hasErrors.includes(true) || Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);

    if (currentStep < 3) {
      await proceedToNextStep();
    } else {
      await submitPayment();
    }

    setLoading(false);
  };

  const proceedToNextStep = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsConfirmed(true);
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const submitPayment = async () => {
    try {
      const formattedFormData = formatCardData(formData);
      const [apiResponse] = await Promise.all([
        onSubmit(formattedFormData),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);

      handleApiResponse(apiResponse);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formatCardData = (data: CardData): CardData => ({
    ...data,
    cardNumber: data.cardNumber.replace(/\s+/g, ''),
  });

  const handleApiResponse = (apiResponse: apiPaymentResponse) => {
    const { status } = apiResponse;
    setNotification({ status, isVisible: true });

    if (status === 400) {
      resetToPaymentStep();
    } else if (status === 200) {
      completePayment();
    }
  };

  const resetToPaymentStep = () => {
    setCurrentStep(2);
    setIsConfirmed(false);
  };

  const completePayment = () => {
    setCurrentStep(4);
    setIsDone(true);
  };

  const getButtonText = (): string => {
    const steps = ['CONTINUAR', 'CONFIRMAR PAGAMENTO', 'PAGAMENTO CONFIRMADO'];
    return steps[currentStep - 2] || 'CONTINUAR';
  };

  const mockedPrice = 1000;

  return (
    <main className="container">
      <ReturnButton />
      <section className="side-green">
        <header className="card-preview-header">
          <CiCreditCard1 />
          <h2>Adicione um novo cartão de crédito</h2>
        </header>
        <CardPreview
          cardBrand={cardBrand}
          cardNumber={formData.cardNumber}
          cardHolder={formData.cardHolder}
          expiration={formData.expiration}
        />
      </section>

      <section className="side-white">
        <StepsHeader currentStep={currentStep} />
        <form onSubmit={handleSubmit}>
          <InputField
            name="cardNumber"
            label="Número do cartão"
            value={formData.cardNumber}
            onChange={handleChange}
            maxLength={19}
            disabled={isConfirmed}
            error={errors.cardNumber}
          />
          <InputField
            name="cardHolder"
            label="Nome (igual ao cartão)"
            value={formData.cardHolder}
            onChange={handleChange}
            disabled={isConfirmed}
            error={errors.cardHolder}
          />
          <div className="shorter-inputs">
            <InputField
              name="expiration"
              label="Validade"
              value={formData.expiration}
              onChange={handleChange}
              disabled={isConfirmed}
              error={errors.expiration}
            />
            <InputField
              name="cvv"
              label="CVV"
              value={formData.cvv}
              onChange={handleChange}
              maxLength={4}
              disabled={isConfirmed}
              error={errors.cvv}
              info="Código de 3 ou 4 dígitos no verso do cartão. Para American Express, está na frente."
            />
          </div>
          <InputField
            name="installments"
            label="Número de parcelas"
            value={formData.installments}
            onChange={handleChange}
            options={getInstallmentOptions(mockedPrice)}
            disabled={isDone}
            error={errors.installments}
          />
          <div className="next-page-button">
            <Button onClick={handleSubmit} currentStep={currentStep}>
              {getButtonText()}
            </Button>
          </div>
        </form>
      </section>
      <Notification
        status={notification.status}
        isVisible={notification.isVisible}
        onClose={() => setNotification({ ...notification, isVisible: false })}
      />
      <LoadingOverlay isLoading={loading} />
    </main>
  );
};

export default CardForm;
