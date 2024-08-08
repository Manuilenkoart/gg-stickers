import { render, screen } from '@testing-library/react';
import { CURRENCY_SYMBOL_MAP } from 'app/lib/constants';
import { productsMock } from 'app/lib/mock';
import React from 'react';
import { it, expect, describe } from 'vitest';

import ProductListCard from './productListCard';

const product = productsMock[0];

describe('<ProductListCard/>', () => {
  it('renders correctly', () => {
    render(<ProductListCard product={product} />);

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
