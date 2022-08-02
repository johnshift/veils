import { setupServer } from 'msw/node';

import {
  ERR_INCORRECT_LOGIN,
  ERR_LOGIN_FAILED,
  MSG_LOGIN_OK,
  PLACEHOLDER_PASSWORD,
  PLACEHOLDER_PRINCIPAL,
} from '@auth/core-login';
import { emptySession } from '@auth/core-session';
import { mockLoginResponse } from '@auth/util-test-login';
import { fakeSession, mockSessionResponse } from '@auth/util-test-session';
import { ERR_INTERNAL, ERR_NETWORK } from '@shared/core-common';
import { render, screen, user, waitFor } from '@shared/feature-testutils';

import { Appbar } from '../appbar';

// Setup msw server
const mswServer = setupServer();
beforeAll(() => mswServer.listen());
afterAll(() => mswServer.close());
afterEach(() => mswServer.resetHandlers());

// Submit login util fn
const submitLogin = async (principal?: string, password?: string) => {
  // Open menu
  await user.click(screen.getByRole('button', { name: 'open appbar menu' }));

  // // Open login form (using `find` to wait)
  await user.click(await screen.findByRole('menuitem', { name: 'Login' }));

  // Fill in details
  const principalInput = await screen.findByPlaceholderText(
    PLACEHOLDER_PRINCIPAL,
  );
  const passwordInput = await screen.findByPlaceholderText(
    PLACEHOLDER_PASSWORD,
  );
  await user.type(principalInput, principal || 'test');
  await user.type(passwordInput, password || '123456');
  await user.keyboard('{Enter}');

  return { principalInput, passwordInput };
};

describe('Appbar', () => {
  test('validation error', async () => {
    // Mock response
    mswServer.use(
      // Mock session response
      mockSessionResponse(200, emptySession),
      // No need to mock login response for validation error
    );

    // Render component
    render(<Appbar />);

    // Submit login
    const { principalInput, passwordInput } = await submitLogin('demo!');

    // Assert loading
    await screen.findByTestId('login-loading-overlay');

    // Assert errors
    await screen.findByText(ERR_LOGIN_FAILED);
    await screen.findByText(ERR_INCORRECT_LOGIN);
    expect(principalInput).toBeInvalid();
    expect(passwordInput.parentNode).toBeInvalid();
  });

  test('api error', async () => {
    // Mock response
    mswServer.use(
      // Mock session response
      mockSessionResponse(200, emptySession),
      // Mock login response
      mockLoginResponse(400, {
        session: emptySession,
        message: ERR_INCORRECT_LOGIN,
      }),
    );

    // Render component
    render(<Appbar />);

    // Submit login
    const { principalInput, passwordInput } = await submitLogin();

    // Assert loading
    await screen.findByTestId('login-loading-overlay');

    // Assert errors
    await screen.findByText(ERR_LOGIN_FAILED);
    await screen.findByText(ERR_INCORRECT_LOGIN);
    await waitFor(() => {
      expect(principalInput).toBeInvalid();
    });
    expect(passwordInput.parentNode).toBeInvalid();
  });

  test('network error', async () => {
    // Mock response
    mswServer.use(
      // Mock session response
      mockSessionResponse(200, emptySession),
      // Mock login response
      mockLoginResponse(400, undefined, true),
    );

    // Render component
    render(<Appbar />);

    // Submit login
    const { principalInput, passwordInput } = await submitLogin();

    // Assert errors
    await screen.findByText(ERR_LOGIN_FAILED);
    await screen.findByText(ERR_NETWORK);
    expect(principalInput).not.toBeInvalid();
    expect(passwordInput.parentNode).not.toBeInvalid();
  });

  test('internal error', async () => {
    // Mock response
    mswServer.use(
      // Mock session response
      mockSessionResponse(200, emptySession),
      // Mock login response
      mockLoginResponse(500, {
        session: emptySession,
        message: ERR_INTERNAL,
      }),
    );

    // Render component
    render(<Appbar />);

    // Submit login
    const { principalInput, passwordInput } = await submitLogin();

    // Assert loading
    await screen.findByTestId('login-loading-overlay');

    // Assert errors
    await screen.findByText(ERR_LOGIN_FAILED);
    await screen.findByText(ERR_INTERNAL);
    expect(principalInput).not.toBeInvalid();
    expect(passwordInput.parentNode).not.toBeInvalid();
  });

  test('login ok', async () => {
    // Mocked session
    const session = fakeSession();
    const message = `Welcome ${session.firstName}`;

    // Mock response
    mswServer.use(
      // Mock session response
      mockSessionResponse(200, emptySession),
      // Mock login response
      mockLoginResponse(200, { session, message }),
    );

    // Render component
    render(<Appbar />);

    // Submit login
    const { principalInput, passwordInput } = await submitLogin();

    // Assert loading
    await screen.findByTestId('login-loading-overlay');

    // Assert no errors
    await screen.findByText(MSG_LOGIN_OK);
    await screen.findByText(message);
    expect(principalInput).toHaveAttribute('aria-invalid', 'false');
    expect(passwordInput.parentNode).toHaveAttribute('aria-invalid', 'false');

    // Assert can logout
    await user.click(screen.getByRole('button', { name: 'open appbar menu' }));
    await screen.findByRole('menuitem', { name: 'Logout' });
  });
});
