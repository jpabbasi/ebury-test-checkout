export const getInstallmentOptions = (purchaseAmount: number) =>
  Array.from({ length: 12 }, (_, i) => {
    const numberOfInstallments = i + 1;
    const installmentValue = (
      purchaseAmount / numberOfInstallments
    ).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return {
      value: numberOfInstallments.toString(),
      label: `${numberOfInstallments}x de R$ ${installmentValue} sem juros`,
    };
  });
