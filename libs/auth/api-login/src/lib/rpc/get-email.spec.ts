import { waitFor } from '@testing-library/react';

import { ERR_INCORRECT_LOGIN } from '@auth/core-login';
import { fakeLoginPayload } from '@auth/util-test-login';
import { ERR_INTERNAL } from '@shared/core-common';
import * as supabase from '@shared/supabase';

import { getEmail } from './get-email';

describe('getEmail', () => {
  // Mock valid login payload (using email)
  const { principal: email } = fakeLoginPayload();

  // Mock valid login payload (using username)
  const { principal: username } = fakeLoginPayload(false);

  test('email passthrough', async () => {
    expect(getEmail(email)).resolves.toBe(email.toLowerCase());
  });

  test('internal error', async () => {
    // Spy console.log
    const consoleSpy = jest.spyOn(console, 'error');

    // Mock error
    const message = 'postgres-error-message';
    const details = 'postgres-error-details';
    const hint = 'postgres-error-hint';
    const code = 'postgres-error-code';

    // Mock rpc returns error
    jest.spyOn(supabase.adminClient, 'rpc').mockResolvedValue({
      data: null,
      body: null,
      count: null,
      error: {
        message,
        details,
        hint,
        code,
      },
      status: -1,
      statusText: 'test-status-text',
    });

    // Assert error
    expect(getEmail(username)).rejects.toThrow(ERR_INTERNAL);

    // Assert console log
    await waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith(
        'getEmailByUsername postgres error:',
        `\n\tcode=${code}`,
        `\n\tmsg=${message}`,
        `\n\thint=${hint}`,
        `\n\tdetails=${details}`,
      ),
    );
  });

  test('no email match', async () => {
    // Mock supabase rpc no error but no email matched ( data = [])
    jest.spyOn(supabase.adminClient, 'rpc').mockResolvedValue({
      data: [],
      body: [],
      count: null,
      error: null,
      status: -1,
      statusText: 'test-status-text',
    });

    expect(getEmail(username)).rejects.toThrow(ERR_INCORRECT_LOGIN);
  });

  test('success (array data)', async () => {
    // Mock supabase rpc success
    jest.spyOn(supabase.adminClient, 'rpc').mockResolvedValue({
      data: [email],
      body: [],
      count: null,
      error: null,
      status: -1,
      statusText: 'test-status-text',
    });
    expect(getEmail(username)).resolves.toBe(email.toLowerCase());
  });

  test('success (string data)', async () => {
    // Mock supabase rpc success
    jest.spyOn(supabase.adminClient, 'rpc').mockResolvedValue({
      data: email as never,
      body: [],
      count: null,
      error: null,
      status: -1,
      statusText: 'test-status-text',
    });
    expect(getEmail(username)).resolves.toBe(email.toLowerCase());
  });
});
