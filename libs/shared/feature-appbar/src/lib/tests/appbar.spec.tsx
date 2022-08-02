import { setupServer } from 'msw/node';

import { emptySession } from '@auth/core-session';
import { mockSessionResponse } from '@auth/util-test-session';
import { render, screen, user, waitFor } from '@shared/feature-testutils';

import { Appbar } from '../appbar';

// Setup msw server
const mswServer = setupServer();
beforeAll(() => mswServer.listen());
afterAll(() => mswServer.close());
afterEach(() => mswServer.resetHandlers());

describe('Appbar', () => {
  test('defaults', async () => {
    // Mock not logged in
    mswServer.use(mockSessionResponse(200, emptySession));

    // Render component
    render(<Appbar />);

    // Assert brand defaults
    const brand = screen.getByText('veils');
    expect(brand).toBeVisible();
    expect(brand.closest('a')).toHaveAttribute('href', '/');

    // Toggle theme defaults
    const toggleTheme = screen.getByRole('button', {
      name: 'toggle dark theme',
    });
    expect(toggleTheme.firstChild).toHaveClass('icon-tabler-moon-stars');

    // Menu defaults
    await screen.findByRole('button', { name: 'open appbar menu' });
  });

  test('can toggle menu', async () => {
    // Mock not logged in
    mswServer.use(mockSessionResponse(200, emptySession));

    // Render component
    render(<Appbar />);

    // Assert can open menu
    await user.click(screen.getByRole('button', { name: 'open appbar menu' }));

    // Assert can close menu
    await user.click(screen.getByRole('button', { name: 'close appbar menu' }));

    // Assert can toggle
    await screen.findByRole('button', { name: 'open appbar menu' });
  });

  test('can toggle login form', async () => {
    // Mock not logged in
    mswServer.use(mockSessionResponse(200, emptySession));

    // Render component
    render(<Appbar />);

    // Open menu
    await user.click(screen.getByRole('button', { name: 'open appbar menu' }));

    // Open login form
    await user.click(await screen.findByRole('menuitem', { name: 'Login' }));

    // Assert form
    await screen.findByTestId('login-paper');

    // Close login form
    await user.keyboard('{Escape}');
    await user.keyboard('{Escape}');

    // Assert form closed
    await waitFor(() => {
      expect(screen.getByTestId('login-paper')).not.toBeVisible();
    });
  });

  test('can toggle theme', async () => {
    // Mock not logged in
    mswServer.use(mockSessionResponse(200, emptySession));

    // Render component
    render(<Appbar />);

    // Open menu
    await user.click(screen.getByRole('button', { name: 'open appbar menu' }));

    // Assert default light mode
    const lightActive = screen.getByRole('button', {
      name: 'toggle dark theme',
    });
    expect(lightActive.firstChild).toHaveClass('icon-tabler-moon-stars');

    // Assert can switch to dark theme
    await user.click(lightActive);
    const darkActive = screen.getByRole('button', {
      name: 'toggle light theme',
    });
    expect(darkActive.firstChild).toHaveClass('icon-tabler-sun');

    // Assert can switch back to light theme
    await user.click(darkActive);
    expect(lightActive.firstChild).toHaveClass('icon-tabler-moon-stars');
  });
});
