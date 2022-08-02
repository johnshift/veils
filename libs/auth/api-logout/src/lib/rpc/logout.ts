import { ApiError, ERR_INTERNAL } from '@shared/core-common';
import { anonClient } from '@shared/supabase';

export const logout = async (accessToken: string) => {
  // Supabase signout
  const { error } = await anonClient.auth.api.signOut(accessToken);

  if (error) {
    // Internal error
    console.error(
      'supabase logout error:',
      `\n\tstatus=${error.status}`,
      `\n\tmsg=${error.message}`,
    );

    throw new ApiError(500, ERR_INTERNAL);
  }
};
