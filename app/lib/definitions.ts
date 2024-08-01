export type Product = {
  id: string;
  name: string;
  description: string;
  price: {
    value: number;
    currency: 'usd';
  };
  src: string;
};
