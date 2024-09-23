export const formatInputValue = (name: string, value: string) => {
  const sanitizedValue = value.replace(/\D/g, '');
  switch (name) {
    case 'cardNumber':
      return sanitizedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    case 'expiration':
      return sanitizedValue.length >= 3
        ? sanitizedValue.slice(0, 2) + '/' + sanitizedValue.slice(2, 4)
        : sanitizedValue;
    case 'cvv':
      return sanitizedValue.slice(0, 4);
    default:
      return value;
  }
};
