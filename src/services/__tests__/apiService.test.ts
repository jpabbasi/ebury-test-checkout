/**
 * @jest-environment node
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { processPayment } from '../apiService';

describe('processPayment API tests', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('deve aprovar o pagamento quando o cardNumber termina com 5', async () => {
    const formData = { cardNumber: '12345', cardHolder: 'Pedro Abbasi' };

    mock.onPost('/pagar').reply(200, {
      status: 200,
      message: 'Payment Approved',
    });

    const response = await processPayment(formData);

    expect(response).toEqual({
      status: 200,
      message: 'Payment Approved',
    });
  });

  it('deve falhar o pagamento quando o cardNumber não termina com 5', async () => {
    const formData = { cardNumber: '12344', cardHolder: 'Pedro Abbasi' };

    mock.onPost('/pagar').reply(400, {
      status: 400,
      message: 'Payment Failed',
    });

    try {
      await processPayment(formData);
    } catch (error: any) {
      expect(error.message).toBe('Payment Failed');
    }
  });

  it('deve cubrir erros de network', async () => {
    const formData = { cardNumber: '12345', cardHolder: 'Pedro Abbasi' };

    mock.onPost('/pagar').networkError();

    try {
      await processPayment(formData);
    } catch (error: any) {
      expect(error.message).toBe('An unexpected error occurred');
    }
  });
});
