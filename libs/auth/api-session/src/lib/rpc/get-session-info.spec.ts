import { waitFor } from '@testing-library/react';

import { fakeLoginPayload } from '@auth/util-test-login';
import { fakeSession } from '@auth/util-test-session';
import { ERR_INTERNAL } from '@shared/core-common';
import * as supabase from '@shared/supabase';

import { getSessionInfo } from './get-session-info';

describe('getSessionInfo', () => {
  // Mock email
  const { principal: email } = fakeLoginPayload();

  test('internal error', async () => {
    // Spy console.log
    const consoleSpy = jest.spyOn(console, 'error');

    // Mock error
    const message = 'postgres-error-message';
    const details = 'postgres-error-details';
    const hint = 'postgres-error-hint';
    const code = 'postgres-error-code';

    // Mock supabase rpc return error
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
    expect(getSessionInfo(email)).rejects.toThrow(ERR_INTERNAL);

    // Assert console log
    await waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith(
        'getSessionInfo postgres error:',
        `\n\tcode=${code}`,
        `\n\tmsg=${message}`,
        `\n\thint=${hint}`,
        `\n\tdetails=${details}`,
      ),
    );
  });

  test('no session returned', async () => {
    // Spy console.log
    const consoleSpy = jest.spyOn(console, 'error');

    // Mock supabase rpc no error but no email matched ( data = [])
    jest.spyOn(supabase.adminClient, 'rpc').mockResolvedValue({
      data: [],
      body: [],
      count: null,
      error: null,
      status: 200,
      statusText: 'test-status-text',
    });

    // Assert error
    expect(getSessionInfo(email)).rejects.toThrow(ERR_INTERNAL);

    // Assert console log
    await waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith(
        'getSessionInfo did not return any data',
      ),
    );
  });

  test('success', async () => {
    // Mock session returned
    const session = fakeSession();

    // Mock supabase rpc success
    jest.spyOn(supabase.adminClient, 'rpc').mockResolvedValue({
      data: [session],
      body: [],
      count: null,
      error: null,
      status: -1,
      statusText: 'test-status-text',
    });

    // Assert result
    expect(getSessionInfo(email)).resolves.toStrictEqual(session);
  });
});
