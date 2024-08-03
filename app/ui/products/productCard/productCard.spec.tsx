import { render, screen } from '@testing-library/react';
import { CURRENCY_SYMBOL_MAP } from 'app/lib/constants';
import { productsMock } from 'app/lib/mock';
import React from 'react';
import { it, expect, describe } from 'vitest';

import ProductCard from './productCard';

const product = productsMock[0];

describe('<ProductCard/>', () => {
  it('renders correctly', () => {
    render(<ProductCard product={product} />);

    const name = screen.getByRole('heading', { level: 2, name: product.name });
    const description = screen.getByText(product.description);
    const price = screen.getByText(`${product.price.value} ${CURRENCY_SYMBOL_MAP[product.price.currency]}`);
    const image = screen.getByAltText(product.name);

    expect(name).toBeDefined();
    expect(description).toBeDefined();
    expect(price).toBeDefined();
    expect(image).toBeDefined();
  });
});
