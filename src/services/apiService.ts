import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onPost('/pagar').reply((config) => {
  const formData = JSON.parse(config.data);

  if (formData.cardNumber.endsWith('5')) {
    return [200, { status: 200, message: 'Payment Approved' }];
  } else {
    return [400, { status: 400, message: 'Payment Failed' }];
  }
});

export const processPayment = async (formData: any) => {
  try {
    const response = await axios.post('/pagar', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error('An unexpected error occurred');
      }
      throw new Error(error.response?.data?.message || 'Payment failed');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
