import { waitFor } from '@testing-library/react';

import {
  ERR_EMAIL_TAKEN,
  ERR_USERNAME_TAKEN,
  ERR_VEIL_TAKEN,
  RegisterError,
  RegisterFieldError,
} from '@auth/core-register';
import { fakeRegisterPayload } from '@auth/util-test-register';
import { ERR_INTERNAL } from '@shared/core-common';
import * as sharedSupabase from '@shared/supabase';

import { registerPreflight } from './register-preflight';

describe('registerPreflight', () => {
  // Arrange payload
  const payload = fakeRegisterPayload();

  test('error', async () => {
    // Mock log
    const consoleSpy = jest.spyOn(console, 'error');

    // Mock supabase rpc return error
    const data = null;
    const error = {
      message: 'postgres-error-message',
      details: 'postgres-error-details',
      hint: 'postgres-error-hint',
      code: 'postgres-error-code',
    };
    jest.spyOn(sharedSupabase.adminClient, 'rpc').mockResolvedValue({
      data,
      body: null,
      count: null,
      error,
      status: -1,
      statusText: 'test-status-text',
    });

    // Assert results
    registerPreflight(payload).catch((error: RegisterError) => {
      expect(error.message).toBe(ERR_INTERNAL);
      expect(error.field).toBe(undefined);
    });

    // Assert log
    await waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith(
        'registerPreflight 500: error =',
        error,
        'data =',
        data,
      ),
    );
  });

  test('no error, no data', async () => {
    // Mock log
    const consoleSpy = jest.spyOn(console, 'error');

    // Mock supabase rpc return error
    const data: unknown[] = [];
    const error = null;
    jest.spyOn(sharedSupabase.adminClient, 'rpc').mockResolvedValue({
      data,
      body: [],
      count: null,
      error,
      status: -1,
      statusText: 'test-status-text',
    });

    // Assert results
    registerPreflight(payload).catch((error: RegisterError) => {
      expect(error.message).toBe(ERR_INTERNAL);
      expect(error.field).toBe(undefined);
    });

    // Assert log
    await waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith(
        'registerPreflight 500: error =',
        error,
        'data =',
        data,
      ),
    );
  });

  test('username taken', async () => {
    // Mock supabase rpc return error
    jest.spyOn(sharedSupabase.adminClient, 'rpc').mockResolvedValue({
      data: [
        {
          usernameTaken: true,
          emailTaken: false,
          veilTaken: false,
        },
      ],
      body: [],
      count: null,
      error: null,
      status: -1,
      statusText: 'test-status-text',
    });

    // Assert results
    registerPreflight(payload).catch((error: RegisterError) => {
      expect(error.message).toBe(ERR_USERNAME_TAKEN);
      expect(error.field).toBe(RegisterFieldError.Username);
    });
  });

  test('email taken', async () => {
    // Mock supabase rpc return error
    jest.spyOn(sharedSupabase.adminClient, 'rpc').mockResolvedValue({
      data: [
        {
          usernameTaken: false,
          emailTaken: true,
          veilTaken: false,
        },
      ],
      body: [],
      count: null,
      error: null,
      status: -1,
      statusText: 'test-status-text',
    });

    // Assert results
    registerPreflight(payload).catch((error: RegisterError) => {
      expect(error.message).toBe(ERR_EMAIL_TAKEN);
      expect(error.field).toBe(RegisterFieldError.Email);
    });
  });

  test('veil taken', async () => {
    // Mock supabase rpc return error
    jest.spyOn(sharedSupabase.adminClient, 'rpc').mockResolvedValue({
      data: [
        {
          usernameTaken: false,
          emailTaken: false,
          veilTaken: true,
        },
      ],
      body: [],
      count: null,
      error: null,
      status: -1,
      statusText: 'test-status-text',
    });

    // Assert results
    registerPreflight(payload).catch((error: RegisterError) => {
      expect(error.message).toBe(ERR_VEIL_TAKEN);
      expect(error.field).toBe(RegisterFieldError.Veil);
    });
  });

  test('ok', async () => {
    // Mock supabase rpc return ok
    jest.spyOn(sharedSupabase.adminClient, 'rpc').mockResolvedValue({
      data: [
        {
          usernameTaken: false,
          emailTaken: false,
          veilTaken: false,
        },
      ],
      body: [],
      count: null,
      error: null,
      status: -1,
      statusText: 'test-status-text',
    });

    // Assert no error thrown
    expect(registerPreflight(payload)).resolves.toBe(undefined);
  });
});
