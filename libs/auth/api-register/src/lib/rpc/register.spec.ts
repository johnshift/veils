/* eslint-disable camelcase */
import { waitFor } from '@testing-library/react';

import { RegisterError } from '@auth/core-register';
import type { RegisterPayload } from '@auth/core-register';
import { fakeRegisterPayload } from '@auth/util-test-register';
import { ERR_INTERNAL } from '@shared/core-common';
import * as supabase from '@shared/supabase';

import { register } from './register';

describe('register', () => {
  // Arrange payload
  const payload: RegisterPayload = fakeRegisterPayload();

  test('error', async () => {
    // Mock error
    const testError = 'test-error';

    // Mock db return value
    jest.spyOn(supabase.adminClient.auth, 'signUp').mockResolvedValue({
      session: null,
      user: null,
      error: {
        status: 500,
        message: testError,
      },
    });

    // Assert results
    await register(payload).catch((error: RegisterError) => {
      expect(error.message).toBe(testError);
      expect(error.field).toBe(undefined);
    });
  });

  test('no error, no user', async () => {
    // Mock log
    const consoleSpy = jest.spyOn(console, 'error');

    // Mock db return value
    jest.spyOn(supabase.adminClient.auth, 'signUp').mockResolvedValue({
      session: null,
      user: null,
      error: null,
    });

    // Assert results
    await register(payload).catch((error: RegisterError) => {
      expect(error.message).toBe(ERR_INTERNAL);
      expect(error.field).toBe(undefined);
    });

    // Assert log
    await waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith(
        'register 500: No session returned after signup',
      ),
    );
  });

  test('ok', async () => {
    // Arrange id
    const testId = 'test-user-id';

    // Mock db return value
    const testAccessToken = 'test-access-token';
    jest.spyOn(supabase.adminClient.auth, 'signUp').mockResolvedValue({
      session: {
        access_token: testAccessToken,
        token_type: 'test-token-type',
        user: {
          id: testId,
          app_metadata: {
            provider: 'test-provider',
          },
          user_metadata: {},
          aud: 'test-aud',
          created_at: 'test-created-at',
        },
      },
      user: {
        id: testId,
        app_metadata: {
          provider: 'test-provider',
        },
        user_metadata: {},
        aud: 'test-aud',
        created_at: 'test-created-at',
      },
      error: null,
    });

    // Assert results
    expect(await register(payload)).toStrictEqual({
      session: {
        id: testId,
        username: payload.username,
        veil: payload.veil,
        firstName: payload.firstName,
        lastName: payload.lastName,
        avatar: '',
        veilAvatar: '',
      },
      accessToken: testAccessToken,
    });
  });
});
