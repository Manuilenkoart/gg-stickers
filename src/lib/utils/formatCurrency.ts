const formatCurrency = (amount: number) =>
  (amount / 100).toLocaleString('en-US', {
    currency: 'USD',
    style: 'currency',
  });

export default formatCurrency;
