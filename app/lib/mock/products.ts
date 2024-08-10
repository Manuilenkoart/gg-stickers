import { Product } from '../definitions';

const size: Product['size'] = [
  {
    id: 'size-id-3-x-3',
    name: '3 x 3',
    price: {
      value: 1,
      currency: 'usd',
    },
  },
  {
    id: 'size-id-4-x-4',
    name: '4 x 4',
    price: {
      value: 2,
      currency: 'usd',
    },
  },
];

export const productsMock: Product[] = [
  {
    id: 'product-id-1',
    name: 'Cheers',
    description: 'product-description-1',
    price: {
      value: 1,
      currency: 'usd',
    },
    src: '/assets/cheers.png',
    size,
  },
  {
    id: 'product-id-2',
    name: 'Holy',
    description: 'product-description-2',
    price: {
      value: 1,
      currency: 'usd',
    },
    src: '/assets/holy.png',
    size,
  },
  {
    id: 'product-id-3',
    name: 'BBC',
    description: 'product-description-3',
    price: {
      value: 1,
      currency: 'usd',
    },
    src: '/assets/bbc.png',
    size,
  },
  {
    id: 'product-id-4',
    name: 'Drink?',
    description: 'product-description-4',
    price: {
      value: 1,
      currency: 'usd',
    },
    src: '/assets/5_floor.png',
    size,
  },
  {
    id: 'product-id-5',
    name: 'Developer',
    description: 'product-description-5',
    price: {
      value: 1,
      currency: 'usd',
    },
    src: '/assets/dev.png',
    size,
  },
  {
    id: 'product-id-7',
    name: 'Party time',
    description: 'product-description-7',
    price: {
      value: 1,
      currency: 'usd',
    },
    src: '/assets/party.png',
    size,
  },
  {
    id: 'product-id-8',
    name: 'F** r***',
    description: 'product-description-8',
    price: {
      value: 1,
      currency: 'usd',
    },
    src: '/assets/poster.png',
    size,
  },
];
