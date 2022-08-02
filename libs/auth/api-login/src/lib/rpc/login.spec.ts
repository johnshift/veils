/* eslint-disable camelcase */
import { waitFor } from '@testing-library/react';

import { ERR_INCORRECT_LOGIN } from '@auth/core-login';
import { fakeLoginPayload } from '@auth/util-test-login';
import { ERR_INTERNAL } from '@shared/core-common';
import * as supabase from '@shared/supabase';

import { login } from './login';

describe('login', () => {
  // Mock login payload
  const { principal, password } = fakeLoginPayload();

  test('error', async () => {
    // Spy console.log
    const consoleSpy = jest.spyOn(console, 'error');

    // Mock error
    const status = 500;
    const message = ERR_INTERNAL;

    // Mock db return value
    jest.spyOn(supabase.anonClient.auth, 'signIn').mockResolvedValue({
      session: null,
      user: null,
      error: {
        status,
        message,
      },
    });

    // Assert error
    expect(login(principal, password)).rejects.toThrow(ERR_INTERNAL);

    // Assert console log
    await waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith(
        'signIn api error:',
        `\n\tstatus=${status}`,
        `\n\tmsg=${message}`,
      ),
    );
  });

  test('incorrect login', async () => {
    // Mock db return value
    jest.spyOn(supabase.anonClient.auth, 'signIn').mockResolvedValue({
      session: null,
      user: null,
      error: {
        status: 400,
        message: ERR_INCORRECT_LOGIN,
      },
    });

    // Assert error
    expect(login(principal, password)).rejects.toThrow(ERR_INCORRECT_LOGIN);
  });

  test('no session returned', async () => {
    // Spy console.log
    const consoleSpy = jest.spyOn(console, 'error');

    // Mock db return value
    jest.spyOn(supabase.anonClient.auth, 'signIn').mockResolvedValue({
      session: null,
      user: null,
      error: null,
    });

    // Assert error
    expect(login(principal, password)).rejects.toThrow(ERR_INTERNAL);

    // Assert console log
    await waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith(
        'No session returned after signIn',
      ),
    );
  });

  test('success', async () => {
    // Mock db return value
    const testAccessToken = 'test-access-token';
    jest.spyOn(supabase.anonClient.auth, 'signIn').mockResolvedValue({
      session: {
        access_token: testAccessToken,
        token_type: 'test-token-type',
        user: null,
      },
      user: null,
      error: null,
    });

    // Assert return access token
    expect(login(principal, password)).resolves.toBe(testAccessToken);
  });
});
