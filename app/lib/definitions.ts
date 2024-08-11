export type Options<L, V> = {
  label: L;
  value: V;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: Price;
  src: string;
  size: ProductSize[];
};

export type ProductSize = {
  name: string;
  id: string;
  price: Price;
};

type Price = {
  value: number;
  currency: 'usd';
};

export type ProductCart = Pick<Product, 'id' | 'name' | 'src'> & {
  size: {
    [key: ProductSize['id']]: ProductSize & {
      quantity: number;
    };
  };
};

export type LocalStorageCart = Record<Product['id'], ProductCart>;
