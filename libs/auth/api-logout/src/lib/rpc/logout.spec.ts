import { waitFor } from '@testing-library/react';

import { ERR_INTERNAL } from '@shared/core-common';
import * as supabase from '@shared/supabase';

import { logout } from './logout';

describe('logout', () => {
  test('error', async () => {
    // Spy console.log
    const consoleSpy = jest.spyOn(console, 'error');

    // Mock db return value
    const status = 500;
    const message = ERR_INTERNAL;
    jest.spyOn(supabase.anonClient.auth.api, 'signOut').mockResolvedValue({
      error: {
        status,
        message,
      },
    });

    // Assert promise call `logout` rejects an error
    expect(logout('test-access-token')).rejects.toThrow(ERR_INTERNAL);

    // Assert console log
    await waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith(
        'supabase logout error:',
        `\n\tstatus=${status}`,
        `\n\tmsg=${message}`,
      ),
    );
  });

  test('success', async () => {
    // Mock db return value
    jest.spyOn(supabase.anonClient.auth.api, 'signOut').mockResolvedValue({
      error: null,
    });

    // Assert promise call `logout` resolves without error
    // (need to await since we expect a result)
    expect(await logout('test-access-token')).toBeUndefined();
  });
});
