import { Product } from '../definitions';

const size: Product['size'] = [
  {
    id: 'size-id-3-x-3',
    name: '3 x 3',
    price: {
      currency: 'usd',
      value: 1,
    },
  },
  {
    id: 'size-id-4-x-4',
    name: '4 x 4',
    price: {
      currency: 'usd',
      value: 2,
    },
  },
];

export const productsMock: Product[] = [
  {
    description: 'product-description-1',
    id: 'product-id-1',
    name: 'Cheers',
    price: {
      currency: 'usd',
      value: 1,
    },
    size,
    src: '/assets/cheers.png',
  },
  {
    description: 'product-description-2',
    id: 'product-id-2',
    name: 'Holy',
    price: {
      currency: 'usd',
      value: 1,
    },
    size,
    src: '/assets/holy.png',
  },
  {
    description: 'product-description-3',
    id: 'product-id-3',
    name: 'BBC',
    price: {
      currency: 'usd',
      value: 1,
    },
    size,
    src: '/assets/bbc.png',
  },
  {
    description: 'product-description-4',
    id: 'product-id-4',
    name: 'Drink?',
    price: {
      currency: 'usd',
      value: 1,
    },
    size,
    src: '/assets/5_floor.png',
  },
  {
    description: 'product-description-5',
    id: 'product-id-5',
    name: 'Developer',
    price: {
      currency: 'usd',
      value: 1,
    },
    size,
    src: '/assets/dev.png',
  },
  {
    description: 'product-description-7',
    id: 'product-id-7',
    name: 'Party time',
    price: {
      currency: 'usd',
      value: 1,
    },
    size,
    src: '/assets/party.png',
  },
  {
    description: 'product-description-8',
    id: 'product-id-8',
    name: 'F** r***',
    price: {
      currency: 'usd',
      value: 1,
    },
    size,
    src: '/assets/poster.png',
  },
];
