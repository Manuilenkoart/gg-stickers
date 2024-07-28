import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';

import Page from './page.tsx';

test('Page', () => {
  render(<Page />);
  expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeDefined();
});
