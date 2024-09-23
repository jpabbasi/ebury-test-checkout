import { useState } from 'react';
import { isValidCardNumber } from '../utils/CardUtils';

export const useFormValidation = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (field: string, value: string): boolean => {
    let error = '';

    if (!value || value.trim() === '') {
      error = 'Este campo é obrigatório';
    } else {
      switch (field) {
        case 'cardNumber':
          const sanitizedNumber = value.replace(/\s+/g, '');
          if (!/^\d{15,16}$/.test(sanitizedNumber)) {
            error = 'Número de caracteres no cartão inválido';
          } else if (!isValidCardNumber(sanitizedNumber)) {
            error = 'Número de cartão inválido';
          }
          break;

        case 'cvv':
          if (!/^\d{3,4}$/.test(value)) {
            error = 'CVV inválido';
          }
          break;

        case 'expiration':
          if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value)) {
            error = 'Data de validade inválida';
          } else {
            const [month, year] = value.split('/');
            const currentYear = new Date().getFullYear().toString().slice(-2);
            const currentMonth = new Date().getMonth() + 1;
            const expirationYear = parseInt(year, 10);
            const expirationMonth = parseInt(month, 10);
            if (
              expirationYear < parseInt(currentYear, 10) ||
              (expirationYear === parseInt(currentYear, 10) &&
                expirationMonth < currentMonth)
            ) {
              error = 'Data de validade expirada';
            }
          }
          break;

        case 'cardHolder':
          const nameParts = value.trim().split(' ');
          if (
            nameParts.length < 2 ||
            nameParts.some(
              (part) =>
                part.length < 2 || /\d/.test(part) || /[^a-zA-Z]/.test(part),
            )
          ) {
            error = 'Por favor, insira o nome completo (nome e sobrenome)';
          }
          break;

        case 'installments':
          if (!value || value.trim() === '') {
            error = 'Selecione o número de parcelas';
          }
          break;

        default:
          break;
      }
    }

    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }));
      return true;
    } else {
      const { [field]: removed, ...rest } = errors;
      setErrors(rest);
      return false;
    }
  };

  return { errors, validate };
};
