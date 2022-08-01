import { setupServer } from 'msw/node';

import {
  ERR_INCORRECT_LOGIN,
  ERR_LOGIN_FAILED,
  MSG_LOGIN_OK,
  PLACEHOLDER_PASSWORD,
  PLACEHOLDER_PRINCIPAL,
} from '@auth/core-login';
import { emptySession } from '@auth/core-session';
import { useSessionContext } from '@auth/data-session';
import { fakeLoginPayload, mockLoginResponse } from '@auth/util-test-login';
import { fakeSession, mockSessionResponse } from '@auth/util-test-session';
import { ERR_NETWORK } from '@shared/core-common';
import { render, screen, user, waitFor } from '@shared/feature-testutils';

import { LoginModal } from './login-modal';

// Setup msw server
const mswServer = setupServer();
beforeAll(() => mswServer.listen());
afterAll(() => mswServer.close());
afterEach(() => mswServer.resetHandlers());

// Custom component since we're going to need a trigger
const Component = () => {
  // Modal control
  const { openLoginModal } = useSessionContext();

  // We adjust fake loading for faster test
  const fakeLoadingMs = 50;

  return (
    <>
      <button type="button" onClick={openLoginModal}>
        open login modal
      </button>
      <LoginModal fakeLoadingMs={fakeLoadingMs} />
    </>
  );
};

describe('Login Modal', () => {
  // Mock payload
  const { principal, password } = fakeLoginPayload();

  test('api error', async () => {
    // Mock Responses
    mswServer.use(
      // Mock not logged in
      mockSessionResponse(200, emptySession),
      // Mock loading
      mockLoginResponse(400, {
        session: emptySession,
        message: ERR_INCORRECT_LOGIN,
      }),
    );

    // Render component
    render(<Component />);

    // Open login modal
    await user.click(screen.getByRole('button', { name: 'open login modal' }));

    // Enter details
    const principalInput = screen.getByPlaceholderText(PLACEHOLDER_PRINCIPAL);
    const passwordInput = screen.getByPlaceholderText(PLACEHOLDER_PASSWORD);
    await user.type(principalInput, principal);
    await user.type(passwordInput, password);

    // Submit login
    await user.click(screen.getByRole('button', { name: 'submit login' }));

    // Assert loading indicators
    await screen.findByTestId('login-loading-overlay');

    // Assert api errors
    await screen.findByText(ERR_LOGIN_FAILED);
    await screen.findByText(ERR_INCORRECT_LOGIN);
    await waitFor(() => {
      expect(principalInput).toBeInvalid();
    });
    expect(passwordInput.parentNode).toBeInvalid();
  });

  test('principal validation error ', async () => {
    // Mock Responses
    mswServer.use(
      // Mock not logged in
      mockSessionResponse(200, emptySession),
      // No need to mock login response since validation does not pass through
    );

    // Render component
    render(<Component />);

    // Open login modal
    await user.click(screen.getByRole('button', { name: 'open login modal' }));

    // Enter details
    const principalInput = screen.getByPlaceholderText(PLACEHOLDER_PRINCIPAL);
    const passwordInput = screen.getByPlaceholderText(PLACEHOLDER_PASSWORD);
    await user.type(principalInput, principal + '!');
    await user.type(passwordInput, password);

    // Submit login
    await user.click(screen.getByRole('button', { name: 'submit login' }));

    // Assert loading indicators
    await screen.findByTestId('login-loading-overlay');

    // Assert api errors
    await screen.findByText(ERR_LOGIN_FAILED);
    await screen.findByText(ERR_INCORRECT_LOGIN);
    await waitFor(() => {
      expect(principalInput).toBeInvalid();
    });
    expect(passwordInput.parentNode).toBeInvalid();

    // Typing something should make the red borders disappear
    await user.type(principalInput, '!');
    await waitFor(() => {
      expect(principalInput).not.toBeInvalid();
    });
    expect(passwordInput.parentNode).not.toBeInvalid();
  });

  test('password validation error ', async () => {
    // Mock Responses
    mswServer.use(
      // Mock not logged in
      mockSessionResponse(200, emptySession),
      // No need to mock login response since validation does not pass through
    );

    // Render component
    render(<Component />);

    // Open login modal
    await user.click(screen.getByRole('button', { name: 'open login modal' }));

    // Enter details
    const principalInput = screen.getByPlaceholderText(PLACEHOLDER_PRINCIPAL);
    const passwordInput = screen.getByPlaceholderText(PLACEHOLDER_PASSWORD);
    await user.type(principalInput, principal);
    await user.type(passwordInput, '12345');

    // Submit login
    await user.click(screen.getByRole('button', { name: 'submit login' }));

    // Assert loading indicators
    await screen.findByTestId('login-loading-overlay');

    // Assert api errors
    await screen.findByText(ERR_LOGIN_FAILED);
    await screen.findByText(ERR_INCORRECT_LOGIN);
    await waitFor(() => {
      expect(principalInput).toBeInvalid();
    });
    expect(passwordInput.parentNode).toBeInvalid();

    // Typing something should make the red borders disappear
    await user.type(passwordInput, '6');
    await waitFor(() => {
      expect(passwordInput.parentNode).not.toBeInvalid();
    });
    expect(principalInput).not.toBeInvalid();
  });

  test('network error', async () => {
    // Mock Responses
    mswServer.use(
      // Mock not logged in
      mockSessionResponse(200, emptySession),
      // Mock loading
      mockLoginResponse(400, undefined, true),
    );

    // Render component
    render(<Component />);

    // Open login modal
    await user.click(screen.getByRole('button', { name: 'open login modal' }));

    // Enter details
    const principalInput = screen.getByPlaceholderText(PLACEHOLDER_PRINCIPAL);
    const passwordInput = screen.getByPlaceholderText(PLACEHOLDER_PASSWORD);
    await user.type(principalInput, principal);
    await user.type(passwordInput, password);

    // Submit login
    await user.click(screen.getByRole('button', { name: 'submit login' }));

    // Assert loading indicators
    await screen.findByTestId('login-loading-overlay');

    // Assert api errors
    await screen.findByText(ERR_LOGIN_FAILED);
    await screen.findByText(ERR_NETWORK);

    // Network error should not show red borders
    expect(principalInput).not.toBeInvalid();
    expect(passwordInput.parentNode).not.toBeInvalid();
  });

  test('success', async () => {
    // Mock returned session
    const session = fakeSession();
    const message = `Welcome ${session.firstName}`;

    // Mock Responses
    mswServer.use(
      // Mock not logged in
      mockSessionResponse(200, emptySession),
      // Mock loading
      mockLoginResponse(200, { session, message }),
    );

    // Render component
    render(<Component />);

    // Open login modal
    await user.click(screen.getByRole('button', { name: 'open login modal' }));

    // Enter details
    const principalInput = screen.getByPlaceholderText(PLACEHOLDER_PRINCIPAL);
    const passwordInput = screen.getByPlaceholderText(PLACEHOLDER_PASSWORD);
    await user.type(principalInput, principal);
    await user.type(passwordInput, password);

    // Submit login
    await user.click(screen.getByRole('button', { name: 'submit login' }));

    // Assert loading indicators
    await screen.findByTestId('login-loading-overlay');

    // Assert api errors
    await screen.findByText(MSG_LOGIN_OK);
    await screen.findByText(message);
    expect(principalInput).toHaveAttribute('aria-invalid', 'false');
    expect(passwordInput.parentNode).toHaveAttribute('aria-invalid', 'false');
  });
});
