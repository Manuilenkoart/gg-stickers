import { Product, ProductCart } from '../definitions';
import { productsMock } from './products';

const product = productsMock[0];
export const cartMock: Record<Product['id'], ProductCart> = {
  [product.id]: {
    id: product.id,
    name: product.name,
    sizes: {
      ['size-id-1']: {
        id: 'size-id-1',
        name: '3x3',
        price: {
          currency: 'usd',
          value: 1,
        },
        quantity: 1,
      },
    },
    src: product.src,
  },
};
