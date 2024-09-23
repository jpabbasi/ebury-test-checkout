import { processPayment } from './apiService';

interface apiPaymentResponse {
  status: number;
  message: string;
}

export const handleFormSubmit = async (formData: any): Promise<apiPaymentResponse> => {
  try {
    const paymentResponse = await processPayment(formData);

    return {
      status: paymentResponse.status,
      message: paymentResponse.message,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 400,
        message: error.message,
      };
    } else {
      return {
        status: 400,
        message: 'An unexpected error occurred',
      };
    }
  }
};
