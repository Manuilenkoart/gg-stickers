export type Options<L, V> = {
  label: L;
  value: V;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: Price;
  src: Record<'default' | '600' | '350' | '300', string>;
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
  sizes: {
    [key: ProductSize['id']]: ProductSize & {
      quantity: number;
    };
  };
};

export type LocalStorageCart = Record<Product['id'], ProductCart>;

export type CartSizeMap = Map<ProductSize['id'], ProductSize & { quantity: number }>;

export type CartMap = Map<Product['id'], Pick<Product, 'id' | 'name' | 'src'> & { sizes: CartSizeMap }>;
