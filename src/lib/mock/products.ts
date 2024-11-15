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
    src: {
      '300': '/assets/cheers/cheers-300.webp',
      '350': '/assets/cheers/cheers-350.webp',
      '600': '/assets/cheers/cheers-600.webp',
      default: '/assets/cheers/cheers-600.webp',
    },
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
    src: {
      '300': '/assets/cheers/cheers-600.webp',
      '350': '/assets/holy.webp',
      '600': '/assets/holy.webp',
      default: '/assets/holy.png',
    },
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
    src: {
      '300': '/assets/bbc.png',
      '350': '/assets/bbc.png',
      '600': '/assets/bbc.png',
      default: '/assets/bbc.png',
    },
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
    src: {
      '300': '/assets/5_floor.png',
      '350': '/assets/5_floor.png',
      '600': '/assets/5_floor.png',
      default: '/assets/5_floor.png',
    },
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
    src: {
      '300': '/assets/dev.png',
      '350': '/assets/dev.png',
      '600': '/assets/dev.png',
      default: '/assets/dev.png',
    },
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
    src: {
      '300': '/assets/party.png',
      '350': '/assets/party.png',
      '600': '/assets/party.png',
      default: '/assets/party.png',
    },
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
    src: {
      '300': '/assets/poster.png',
      '350': '/assets/poster.png',
      '600': '/assets/poster.png',
      default: '/assets/poster.png',
    },
  },
];
