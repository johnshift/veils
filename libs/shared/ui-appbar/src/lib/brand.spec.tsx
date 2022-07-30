import { render, screen } from '@shared/ui-testutils';

import { Brand } from './brand';

describe('Brand', () => {
  test('render ok', () => {
    // Render component
    render(<Brand />);

    // Brand component
    const brand = screen.getByText('veils');

    // Assert brand is visible
    expect(brand).toBeVisible();

    // Assert brand has link to home page
    expect(brand.closest('a')).toHaveAttribute('href', '/');
  });
});
