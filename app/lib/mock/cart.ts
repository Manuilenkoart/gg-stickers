import { Product, ProductCart } from '../definitions';
import { productsMock } from './products';

const product = productsMock[0];
export const cartMock: Record<Product['id'], ProductCart> = {
  [product.id]: {
    id: product.id,
    name: product.name,
    src: product.src,
    sizes: {
      ['size-id-1']: {
        id: 'size-id-1',
        name: '3x3',
        price: {
          value: 1,
          currency: 'usd',
        },
        quantity: 1,
      },
    },
  },
};
