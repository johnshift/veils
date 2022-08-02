import { ERR_INCORRECT_LOGIN } from '@auth/core-login';
import { ApiError, ERR_INTERNAL } from '@shared/core-common';
import { anonClient } from '@shared/supabase';

export const login = async (email: string, password: string) => {
  // Login using email
  const { session, error } = await anonClient.auth.signIn({
    email,
    password,
  });

  if (error) {
    // Internal error
    if (error.status >= 500) {
      console.error(
        'signIn api error:',
        `\n\tstatus=${error.status}`,
        `\n\tmsg=${error.message}`,
      );
      throw new ApiError(500, ERR_INTERNAL);
    }

    // Incorrect login by default
    throw new ApiError(401, ERR_INCORRECT_LOGIN);
  }

  if (!session) {
    console.error('No session returned after signIn');
    throw new ApiError(500, ERR_INTERNAL);
  }

  // Return access token
  return session.access_token;
};
