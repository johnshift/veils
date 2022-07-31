import { render, screen, user } from '@shared/ui-testutils';

import { Menu } from './menu';

describe('Menu', () => {
  test('opened', async () => {
    // Arrange props
    const isOpen = true;
    const setIsOpen = jest.fn();
    const isLoading = false;
    const isLoggedIn = false;
    const authFn = jest.fn();

    // Render component
    render(
      <Menu
        isOpen={isOpen}
        isLoading={isLoading}
        isLoggedIn={isLoggedIn}
        setIsOpen={setIsOpen}
        authFn={authFn}
      />,
    );

    // Assert opened
    const button = await screen.findByRole('button', {
      name: 'close appbar menu',
    });

    // Assert toggle
    await user.click(button);
    expect(setIsOpen).toHaveBeenCalledTimes(1);
  });

  test('closed', async () => {
    // Arrange props
    const isOpen = false;
    const setIsOpen = jest.fn();
    const isLoading = false;
    const isLoggedIn = false;
    const authFn = jest.fn();

    // Render component
    render(
      <Menu
        isOpen={isOpen}
        isLoading={isLoading}
        isLoggedIn={isLoggedIn}
        setIsOpen={setIsOpen}
        authFn={authFn}
      />,
    );

    // Assert opened
    const button = await screen.findByRole('button', {
      name: 'open appbar menu',
    });

    // Assert toggle
    await user.click(button);
    expect(setIsOpen).toHaveBeenCalledTimes(1);
  });

  test('loading', async () => {
    // Arrange props
    const isOpen = true;
    const setIsOpen = jest.fn();
    const isLoading = true;
    const isLoggedIn = false;
    const authFn = jest.fn();

    // Render component
    render(
      <Menu
        isOpen={isOpen}
        isLoading={isLoading}
        isLoggedIn={isLoggedIn}
        setIsOpen={setIsOpen}
        authFn={authFn}
      />,
    );

    // Assert isLoading
    await screen.findByTestId('auth-loader');
    expect(screen.getByRole('menuitem', { name: 'Loading' })).toBeDisabled();
  });

  test('loggedin', async () => {
    // Arrange props
    const isOpen = true;
    const setIsOpen = jest.fn();
    const isLoading = false;
    const isLoggedIn = true;
    const authFn = jest.fn();

    // Render component
    render(
      <Menu
        isOpen={isOpen}
        isLoading={isLoading}
        isLoggedIn={isLoggedIn}
        setIsOpen={setIsOpen}
        authFn={authFn}
      />,
    );

    // Assert loggedin
    await user.click(await screen.findByText('Logout'));
    expect(authFn).toHaveBeenCalledTimes(1);
  });

  test('not loggedin', async () => {
    // Arrange props
    const isOpen = true;
    const setIsOpen = jest.fn();
    const isLoading = false;
    const isLoggedIn = false;
    const authFn = jest.fn();

    // Render component
    render(
      <Menu
        isOpen={isOpen}
        isLoading={isLoading}
        isLoggedIn={isLoggedIn}
        setIsOpen={setIsOpen}
        authFn={authFn}
      />,
    );

    // Assert loggedin
    await user.click(await screen.findByText('Login'));
    expect(authFn).toHaveBeenCalledTimes(1);
  });
});
