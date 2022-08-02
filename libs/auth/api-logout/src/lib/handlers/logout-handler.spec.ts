import { createMocks } from 'node-mocks-http';
import { v4 } from 'uuid';

import { waitFor } from '@testing-library/react';

import { MSG_LOGOUT_OK } from '@auth/core-logout';
import { fakeSession } from '@auth/util-test-session';
import { encryptSessionCookie } from '@shared/api-utils';
import * as apiUtils from '@shared/api-utils';
import {
  COOKEY_CSRF,
  COOKEY_SESSION,
  ERR_INTERNAL,
  ERR_METHOD_NOT_ALLOWED,
  ERR_UNAUTHORIZED,
} from '@shared/core-common';
import type { MockApiRequest, MockApiResponse } from '@shared/core-common';
import * as supabase from '@shared/supabase';

import { logoutHandler } from './logout-handler';

// Mock mantine notification with actual for spy
jest.mock('@shared/api-utils', () => ({
  __esModule: true,
  ...jest.requireActual('@shared/api-utils'),
}));

describe('logoutHandler', () => {
  test('checkMethod error', async () => {
    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'GET',
    });

    // Handler
    await logoutHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toStrictEqual({
      message: ERR_METHOD_NOT_ALLOWED,
    });
  });

  test('decryptSessionCookie unauthorized error', async () => {
    // Spy console.log
    const logSpy = jest.spyOn(console, 'warn');

    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'POST',
      // Note empty token
    });

    // Handler
    await logoutHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(403);
    expect(JSON.parse(res._getData())).toStrictEqual({
      message: ERR_UNAUTHORIZED,
    });

    // Assert console log
    await waitFor(() =>
      expect(logSpy).toHaveBeenCalledWith(
        'decryptSessionCookie: No encryptedToken provied',
      ),
    );
  });

  test('logout error', async () => {
    // Mock login user
    const accessToken = v4();
    const session = fakeSession();
    const [sessionToken, csrfToken] = await encryptSessionCookie(
      accessToken,
      session,
    );

    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'POST',
      cookies: {
        [COOKEY_SESSION]: sessionToken,
        [COOKEY_CSRF]: csrfToken,
      },
    });

    // Mock db signOut value
    jest.spyOn(supabase.anonClient.auth.api, 'signOut').mockResolvedValue({
      error: {
        status: 500,
        message: ERR_INTERNAL,
      },
    });

    // Handler
    await logoutHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toStrictEqual({
      message: ERR_INTERNAL,
    });
  });

  test('default to internal-error on non-ApiError throws', async () => {
    // Mock login user
    const accessToken = v4();
    const session = fakeSession();
    const [sessionToken, csrfToken] = await encryptSessionCookie(
      accessToken,
      session,
    );

    // Mock decrypt-session-cookie to throw non-ApiError
    jest.spyOn(apiUtils, 'decryptSessionCookie').mockImplementationOnce(() => {
      throw new Error('test-error');
    });

    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'POST',
      cookies: {
        [COOKEY_SESSION]: sessionToken,
        [COOKEY_CSRF]: csrfToken,
      },
    });

    // Handler
    await logoutHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toStrictEqual({
      message: ERR_INTERNAL,
    });
  });

  test('success', async () => {
    // Mock login user
    const accessToken = v4();
    const session = fakeSession();
    const [sessionToken, csrfToken] = await encryptSessionCookie(
      accessToken,
      session,
    );

    // Mock request
    const { req, res } = createMocks<MockApiRequest, MockApiResponse>({
      method: 'POST',
      cookies: {
        [COOKEY_SESSION]: sessionToken,
        [COOKEY_CSRF]: csrfToken,
      },
    });

    // Mock db signOut value
    jest.spyOn(supabase.anonClient.auth.api, 'signOut').mockResolvedValue({
      error: null,
    });

    // Handler
    await logoutHandler(req, res);

    // Assert error
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toStrictEqual({
      message: MSG_LOGOUT_OK,
    });
  });
});
