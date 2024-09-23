export const getCardBrand = (cardNumber: string): string => {
  const cleanedNumber = cardNumber.replace(/\s+/g, '');

  if (/^4/.test(cleanedNumber)) {
    return 'visa';
  } else if (/^5[1-5]/.test(cleanedNumber)) {
    return 'mastercard';
  } else if (/^3[47]/.test(cleanedNumber)) {
    return 'amex';
  } else if (/^6(?:011|5)/.test(cleanedNumber)) {
    return 'discover';
  } else if (/^3(?:0[0-5]|[68])/.test(cleanedNumber)) {
    return 'dinersclub';
  } else if (/^35/.test(cleanedNumber)) {
    return 'jcb';
  } else if (/^50|^60|^62|^64|^65/.test(cleanedNumber)) {
    return 'elo';
  } else if (/^606282/.test(cleanedNumber)) {
    return 'hipercard';
  }

  return 'unknown';
};

export const getCardBrandFullName = (brand: string): string => {
  switch (brand) {
    case 'visa':
      return 'Visa';
    case 'mastercard':
      return 'MasterCard';
    case 'amex':
      return 'American Express';
    case 'discover':
      return 'Discover';
    case 'dinersclub':
      return 'Diners Club';
    case 'jcb':
      return 'JCB';
    case 'elo':
      return 'Elo';
    case 'hipercard':
      return 'Hipercard';
    default:
      return 'Desconhecido';
  }
};

export const isValidCardNumber = (cardNumber: string): boolean => {
  const sanitizedNumber = cardNumber.replace(/\D/g, '');
  let sum = 0;
  let shouldDouble = false;

  for (let i = sanitizedNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitizedNumber[i]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};
