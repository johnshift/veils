import { setupServer } from 'msw/node';

import {
  ERR_LOGOUT_FAILED,
  MSG_LOGOUT_DONE,
  MSG_LOGOUT_LOADING,
  MSG_LOGOUT_OK,
} from '@auth/core-logout';
import { mockLogoutResponse } from '@auth/util-test-logout';
import { fakeSession, mockSessionResponse } from '@auth/util-test-session';
import { ERR_INTERNAL, ERR_NETWORK, MSG_LOADING } from '@shared/core-common';
import { render, screen, user } from '@shared/feature-testutils';

import { Appbar } from '../appbar';

// Setup msw server
const mswServer = setupServer();
beforeAll(() => mswServer.listen());
afterAll(() => mswServer.close());
afterEach(() => mswServer.resetHandlers());

// Submit logout util fn
const submitLogout = async () => {
  // Open menu
  await user.click(screen.getByRole('button', { name: 'open appbar menu' }));

  // // Open logout form (using `find` to wait)
  await user.click(await screen.findByRole('menuitem', { name: 'Logout' }));
};

describe('Appbar', () => {
  test('network error', async () => {
    // Mock response
    mswServer.use(
      // Mock session response
      mockSessionResponse(200, fakeSession()),
      // Mock logout response
      mockLogoutResponse(400, undefined, true),
    );

    // Render component
    render(<Appbar />);

    // Submit logout
    await submitLogout();

    // Assert errors
    await screen.findByText(ERR_LOGOUT_FAILED);
    await screen.findByText(ERR_NETWORK);
  });

  test('internal error', async () => {
    // Mock response
    mswServer.use(
      // Mock session response
      mockSessionResponse(200, fakeSession()),
      // Mock logout response
      mockLogoutResponse(
        500,
        {
          message: ERR_INTERNAL,
        },
        false,
        100, // Small delay to display spinner
      ),
    );

    // Render component
    render(<Appbar />);

    // Submit logout
    await submitLogout();

    // Assert loading
    await screen.findByText(MSG_LOADING);
    await screen.findByText(MSG_LOGOUT_LOADING);

    // Assert errors
    await screen.findByText(ERR_LOGOUT_FAILED);
    await screen.findByText(ERR_INTERNAL);
  });

  test('logout ok', async () => {
    // Mock response
    mswServer.use(
      // Mock session response
      mockSessionResponse(200, fakeSession()),
      // Mock logout response
      mockLogoutResponse(
        200,
        { message: MSG_LOGOUT_DONE },
        false,
        100, // Small delay to display spinner),
      ),
    );

    // Render component
    render(<Appbar />);

    // Submit logout
    await submitLogout();

    // Assert loading
    await screen.findByText(MSG_LOADING);
    await screen.findByText(MSG_LOGOUT_LOADING);

    // Assert no errors
    await screen.findByText(MSG_LOGOUT_OK);
    await screen.findByText(MSG_LOGOUT_DONE);

    // Assert can logout
    await user.click(screen.getByRole('button', { name: 'open appbar menu' }));
    await screen.findByRole('menuitem', { name: 'Login' });
  });
});
